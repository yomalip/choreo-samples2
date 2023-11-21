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

import {
    Application, AuthenticationSequence, AuthenticationSequenceModel, AuthenticationSequenceStepOption,
    IdentityProvider
} from "@pet-management-webapp/business-admin-app/data-access/data-access-common-models-util";
import { commonControllerDecode } from "@pet-management-webapp/shared/data-access/data-access-common-api-util";
import {
    BASIC_AUTHENTICATOR_ID, BASIC_ID, ENTERPRISE_AUTHENTICATOR_ID, ENTERPRISE_ID, GOOGLE_AUTHENTICATOR_ID, GOOGLE_ID
} from "@pet-management-webapp/shared/util/util-common";
import { Session } from "next-auth";
import { controllerCallPatchApplicationAuthSteps } from "./controllerCallPatchApplicationAuthSteps";

/**
 * 
 * @param template - identity provider object template
 * 
 * @returns get authentication sequence
 */
function getAuthenticationSequenceModel(template: Application): AuthenticationSequence {
    const authenticationSequenceModel = template.authenticationSequence;

    delete authenticationSequenceModel.requestPathAuthenticators;
    authenticationSequenceModel.type = "USER_DEFINED";

    return authenticationSequenceModel;
}
/**
 * 
 * @param templateId - GOOGLE_ID, ENTERPRISE_ID, BASIC_ID
 * 
 * @returns get authenticator id for the given template id
 */
function getAuthenticatorId(templateId: string): string | null {
    switch (templateId) {
        case GOOGLE_ID:

            return GOOGLE_AUTHENTICATOR_ID;
        case ENTERPRISE_ID:

            return ENTERPRISE_AUTHENTICATOR_ID;
        case BASIC_ID:

            return BASIC_AUTHENTICATOR_ID;
        default:

            return null;
    }
}

/**
 * 
 * @param idpTempleteId - identity provider template id
 * @param idpName - identity provider name
 * 
 * @returns get authenticator body
 */
function getAuthenticatorBody(idpTempleteId: string, idpName: string): AuthenticationSequenceStepOption {

    return {
        "authenticator": (getAuthenticatorId(idpTempleteId) as string),
        "idp": idpName
    };
}

/**
 * 
 * @param template - identity provider object template
 * @param idpTempleteId - identity provider template id
 * @param idpName - identity provider name
 * @param method - PatchApplicationAuthMethod
 * 
 * @returns add or remove idp from the login sequence
 */
function addRemoveAuthSequence(template: Application, idpTempleteId: string, idpName: string, method: boolean)
    : AuthenticationSequence {

    const authenticationSequenceModel = getAuthenticationSequenceModel(template);

    if (method) {
        const options = authenticationSequenceModel.steps[0].options;
        const idpOptions = getAuthenticatorBody(idpTempleteId, idpName);

        if (idpOptions) {
            options.push(idpOptions);
        }

        return authenticationSequenceModel;
    } else {

        let basicCheck = false;

        for (let j = authenticationSequenceModel.steps.length - 1; j >= 0; j--) {
            const step = authenticationSequenceModel.steps[j];

            for (let i = 0; i < step.options.length; i++) {
                if (step.options[i].idp === idpName) {
                    step.options.splice(i, 1);
                    if (step.options.length === 0) {
                        authenticationSequenceModel.steps.splice(j, 1);
                    }

                    break;
                } else if (step.options[i].authenticator === "BasicAuthenticator") {
                    basicCheck = true;
                }
            }
        }

        if (!basicCheck) {
            try {
                authenticationSequenceModel.steps[0].options.push(getAuthenticatorBody(BASIC_ID, "LOCAL"));
            } catch (e) {
                authenticationSequenceModel.steps.push({
                    "id": 1,
                    "options": [ (getAuthenticatorBody(BASIC_ID, "LOCAL")) ]
                });
            }
        }

        return authenticationSequenceModel;
    }
}

/**
 * 
 * @param session - session object
 * @param template - identity provider object template
 * @param idpDetails - identity provider details
 * @param method -  PatchApplicationAuthMethod
 * 
 * @returns decode patch applicaiton authentication steps API calls.
 */
export async function controllerDecodePatchApplicationAuthSteps(
    session: Session, template: Application, idpDetails: IdentityProvider, method: boolean): Promise<boolean | null> {

    const applicationId = template.id;
    const idpName = idpDetails.name;
    const idpTempleteId = idpDetails.templateId;

    const authenticationSequenceModel: AuthenticationSequenceModel = {
        "authenticationSequence": addRemoveAuthSequence(template, idpTempleteId, idpName, method)
    };

    const res = await commonControllerDecode(
        () => controllerCallPatchApplicationAuthSteps(session, applicationId, authenticationSequenceModel), null);

    if (res) {
        return true;
    }

    return null;
}

export default controllerDecodePatchApplicationAuthSteps;
