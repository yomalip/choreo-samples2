/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
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

import Image from "next/image";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Button } from "rsuite";
import styles from "./indexHomeComponent.module.css";
import { IndexHomeComponentProps } from "../../models/indexHomeComponent/indexHomeComponent";

/**
 * First page component
 * 
 * @param prop - image, tagText, signinOnClick
 */
export function IndexHomeComponent(prop: IndexHomeComponentProps) {

    const { logoComponent, image, tagText, signinOnClick } = prop;
    const [ isLoading, setIsLoading ] = useState(true);

    return (
        <div>
            
            { isLoading && (
                <div className={ styles["main"] }>
                    <div className={ styles["loader"] }>
                        <ThreeDots color="#4e40ed" height={ 200 } width={ 200 } />
                    </div>
                </div> ) }

            <main className={ styles["main"] }>
                
                <div className={ styles["homeImageDiv"] }>
                    <Image
                        src={ image }
                        alt="home image"
                        className={ styles["homeImage"] } 
                        onLoad={ () => setIsLoading(false) }/>
                </div>
                <div className={ styles["signInDiv"] }>
                    { logoComponent }

                    <hr />

                    <p className={ styles["buttonTag"] }>{ tagText }</p>
                    <Button
                        className={ styles["signInDivButton"] }
                        size="lg"
                        appearance="primary"
                        onClick={ signinOnClick }>
                        Sign In
                    </Button>

                </div>

            </main>
            
        </div>
    );
}

export default IndexHomeComponent;
