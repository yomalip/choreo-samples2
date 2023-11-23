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

import { commonControllerCall } from "@pet-management-webapp/shared/data-access/data-access-common-api-util";
import { Group, SendEditGroupName } from "@pet-management-webapp/shared/data-access/data-access-common-models-util";
import { Session } from "next-auth";

/**
 * call PATCH `roleUri`
 * 
 * @param session - Session object
 * @param roleUri - uri of the role
 * @param patchBody - body of the role that need to be patched
 * 
 * @returns patched role, if the call failed `null`
 */
export async function controllerCallPatchGroupName(session: Session, groupId: string, patchBody: SendEditGroupName)
    : Promise<Group | null> {

    const data = 
    (await commonControllerCall(`/api/settings/group/patchGroupName?groupId=${groupId}`, session, patchBody) as
    Group | null);
        
    return data;
}
