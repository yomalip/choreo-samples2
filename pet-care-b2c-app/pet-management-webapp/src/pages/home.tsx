/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { BasicUserInfo, Hooks, useAuthContext } from "@asgardeo/auth-react";
import { Grid } from '@mui/material';
import React, { FunctionComponent, ReactElement, useCallback, useEffect, useState } from "react";
import LOGO_IMAGE from "../images/pet_care_logo.png";
import DOG_IMAGE from "../images/dog_image.png";
import CAT_IMAGE from "../images/cat.png";
import RABBIT_IMAGE from "../images/rabbit.png";
import COVER_IMAGE from "../images/nav-image.png";
import { DefaultLayout } from "../layouts/default";
import { AuthenticationResponse } from "../components";
import { useLocation } from "react-router-dom";
import { LogoutRequestDenied } from "../components/LogoutRequestDenied";
import { USER_DENIED_LOGOUT } from "../constants/errors";
import { Pet, PetInfo } from "../types/pet";
import AddPet from "./Pets/addPets";
import PetOverview from "./Pets/petOverview";
import PetCard from "./Pets/PetCard";
import { getPets } from "../components/getPetList/get-pets";
import MenuListComposition from "../components/UserMenu";
import { getConfig } from "../util/getConfig";

interface DerivedState {
    authenticateResponse: BasicUserInfo,
    idToken: string[],
    decodedIdTokenHeader: string,
    decodedIDTokenPayload: Record<string, string | number | boolean>;
}

/**
 * Home page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const HomePage: FunctionComponent = (): ReactElement => {

    const {
        state,
        signIn,
        signOut,
        getBasicUserInfo,
        getIDToken,
        getDecodedIDToken,
        on
    } = useAuthContext();
    const [petList, setPetList] = useState<Pet[] | null>(null);
    const [derivedAuthenticationState, setDerivedAuthenticationState] = useState<DerivedState>(null);
    const [hasAuthenticationErrors, setHasAuthenticationErrors] = useState<boolean>(false);
    const [hasLogoutFailureError, setHasLogoutFailureError] = useState<boolean>();
    const [user, setUser] = useState<BasicUserInfo | null>(null);
    const [isAddPetOpen, setIsAddPetOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOverviewOpen, setIsOverviewOpen] = useState(false);
    const [isUpdateViewOpen, setIsUpdateViewOpen] = useState(false);
    const [pet, setPet] = useState<Pet | null>(null);
    const [thumbnail, setThumbnail] = useState(null);
    const { getAccessToken } = useAuthContext();

    const search = useLocation().search;
    const stateParam = new URLSearchParams(search).get('state');
    const errorDescParam = new URLSearchParams(search).get('error_description');

    useEffect(() => {

        if (!state?.isAuthenticated) {
            return;
        }

        (async (): Promise<void> => {
            const basicUserInfo = await getBasicUserInfo();
            setUser(basicUserInfo);
            const idToken = await getIDToken();
            const decodedIDToken = await getDecodedIDToken();

            const derivedState: DerivedState = {
                authenticateResponse: basicUserInfo,
                idToken: idToken.split("."),
                decodedIdTokenHeader: JSON.parse(atob(idToken.split(".")[0])),
                decodedIDTokenPayload: decodedIDToken
            };

            setDerivedAuthenticationState(derivedState);
        })();
    }, [state.isAuthenticated, getBasicUserInfo, getIDToken, getDecodedIDToken]);

    useEffect(() => {
        if (stateParam && errorDescParam) {
            if (errorDescParam === "End User denied the logout request") {
                setHasLogoutFailureError(true);
            }
        }
    }, [stateParam, errorDescParam]);


    async function getPetList() {
        setIsLoading(true);
        const accessToken = await getAccessToken();
        getPets(accessToken)
        .then((res) => {
            if(res.data instanceof Array) {
                setPetList(res.data);
            }       
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });    
    }

    useEffect(() => {
        if (!isAddPetOpen) {
            getPetList();
        }
    }, [isAddPetOpen, isOverviewOpen, isUpdateViewOpen]);


    useEffect(() => {
        if(state.isAuthenticated){
            getPetList();
        } 
      }, [state.isAuthenticated]);

    const handleLogin = useCallback(() => {
        setHasLogoutFailureError(false);
        signIn()
            .catch(() => setHasAuthenticationErrors(true));
    }, [signIn]);

    /**
      * handles the error occurs when the logout consent page is enabled
      * and the user clicks 'NO' at the logout consent page
      */
    useEffect(() => {
        on(Hooks.SignOut, () => {
            setHasLogoutFailureError(false);
        });

        on(Hooks.SignOutFailed, () => {
            if (!errorDescParam) {
                handleLogin();
            }
        })
    }, [on, handleLogin, errorDescParam]);

    const handleLogout = () => {
        signOut();
    };

    // If `clientID` is not defined in `config.json`, show a UI warning.
    if (!getConfig().clientID) {

        return (
            <div className="content">
                <h2>You need to update the Client ID to proceed.</h2>
                <p>Please open &quot;src/config.json&quot; file using an editor, and update
                    the <code>clientID</code> value with the registered application&apos;s client ID.</p>
                <p>Visit repo <a
                    href="https://github.com/asgardeo/asgardeo-auth-react-sdk/tree/master/samples/asgardeo-react-app">README</a> for
                    more details.</p>
            </div>
        );
    }

    if (hasLogoutFailureError) {
        return (
            <LogoutRequestDenied
                errorMessage={USER_DENIED_LOGOUT}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
            />
        );
    }

    if (!state.isAuthenticated) {
        return (
            <DefaultLayout
                isLoading={state.isLoading}
                hasErrors={hasAuthenticationErrors}
            >
                {
                    <div className="content">
                        <div className="logo-div">
                            <img
                                style={{ width: "25vw", height: "17vh" }}
                                src={LOGO_IMAGE}
                                alt="pet-care-logo"
                            />
                        </div>
                        <div className="get-started-wording-div">
                            <label className="get-started-wording">
                                Helping you to take good care of your pet
                            </label>
                        </div>
                        <div className="quarter-circle"></div>
                        <div className="dog-img">
                            <img
                                style={{ width: "20vw", height: "20vw", borderRadius: "50%"}}
                                src={DOG_IMAGE}
                                alt="dog-image"
                            />
                        </div>
                        <div className="cat-img">
                            <img
                                style={{ width: "15vw", height: "15vw", borderRadius: "50%"}}
                                src={CAT_IMAGE}
                                alt="cat-image"
                            />
                        </div>
                        <div className="rabbit-img">
                            <img
                                style={{ width: "15vw", height: "15vw", borderRadius: "50%"}}
                                src={RABBIT_IMAGE}
                                alt="cat-image"
                            />
                        </div>
                        <button
                            className="get-started-btn"
                            onClick={() => {
                                handleLogin();
                            }}
                        >
                            Get Started
                        </button>
                    </div>
                }
            </DefaultLayout>
        )
    }

    return (
        <><nav className="header">
            <div>
                {user && (
                    <MenuListComposition user={user} signout={signOut} />
                )}
            </div>
            <div className="app-title-style">
                <img
                    style={{ width: "12vw", height: "8vh" }}
                    src={LOGO_IMAGE}
                    alt="pet-care-logo"
                />
            </div>
        </nav>
            <div className="cover-div">
            </div>
            <div className="cover-img">
                <img
                    style={{ width: "30vh", height: "30vh", borderRadius: "50%" }}
                    src={COVER_IMAGE}
                    alt="cover-image"
                />
            </div>
            <div className="cover-wording">
                <p className="wording-style">Let's take care of your pets!</p>
            </div>
            <div className="my-pets">
                <label className="home-wording">
                    My Pets 
                </label>
                <button className="add-pet-btn" onClick={() => setIsAddPetOpen(true)}>
                    +
                </button>
            </div>
            {petList &&(
                <div className="table-view">
                {/* <Grid container item lg={10} md={10} sm={12} xs={12}> */}
                    <Grid container item spacing={10}>
                        {petList.map((pet) => (
                            <Grid
                                item
                                key={pet.name}
                                xs={10}
                                sm={6}
                                md={6}
                                lg={2}
                                className="grid-item"
                                onClick={() => {
                                    setIsOverviewOpen(true);
                                    setPet(pet);
                                }}
                            >
                                <PetCard
                                    petId={pet.id}
                                    petName={pet.name}
                                    breed={pet.breed}
                                    petThumbnail={thumbnail}
                                    setPetThumbnail={setThumbnail}
                                    isAuthenticated={state.isAuthenticated}
                                    setIsHomeLoading={setIsLoading}
                                    isUpdateViewOpen={isUpdateViewOpen}
                                />
                            </Grid>
                        ))}
                    </Grid>
                {/* </Grid> */}
            </div>
            )}
            <div>
                <AddPet isOpen={isAddPetOpen} setIsOpen={setIsAddPetOpen} />
            </div>
            <div>
                <PetOverview 
                isOpen={isOverviewOpen} 
                setIsOpen={setIsOverviewOpen} 
                isUpdateViewOpen={isUpdateViewOpen} 
                setIsUpdateViewOpen={setIsUpdateViewOpen} 
                pet={pet}
                petThumbnail={thumbnail}
                setPetThumbnail={setThumbnail} />
            </div>
        </>
    );
};