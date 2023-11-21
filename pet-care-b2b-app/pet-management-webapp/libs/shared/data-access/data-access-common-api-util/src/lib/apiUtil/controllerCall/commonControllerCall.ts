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
    ControllerCallReturn, OrgSessionControllerCallParam
} from "@pet-management-webapp/shared/data-access/data-access-common-models-util";
import { Session } from "next-auth";
import {
    getControllerCallApiRequestOptions, getControllerCallApiRequestOptionsForSwitchCallWithParam
} from "./controllerCallApiRequestOptions";

/**
 * call POST `getManagementAPIServerBaseUrl()/o/<subOrgId>/scim2/Users` create the user
 * 
 * @param session - session object
 * @param param - data object that need to be sent to server
 * 
 * @returns created user details, if not created returns `null`
 */
export async function commonControllerCall(api: string, session: Session | null, param?: any
    , switchCall = false): Promise<ControllerCallReturn | ControllerCallReturn[] | null> {
    try {

        let header: RequestInit;

        if (switchCall) {
            if (param) {
                const orgSessionControllerCallParam: OrgSessionControllerCallParam
                    = param as OrgSessionControllerCallParam;

                header = getControllerCallApiRequestOptionsForSwitchCallWithParam(
                    orgSessionControllerCallParam.subOrgId, orgSessionControllerCallParam.accessToken);
            } else {
                throw Error;
            }
        } else {

            header = getControllerCallApiRequestOptions(session, param);
        }
        
        const res = await fetch(api, header);
        const data = await res.json();

        return data;
    } catch (err) {

        return null;
    }
}

export default commonControllerCall;
