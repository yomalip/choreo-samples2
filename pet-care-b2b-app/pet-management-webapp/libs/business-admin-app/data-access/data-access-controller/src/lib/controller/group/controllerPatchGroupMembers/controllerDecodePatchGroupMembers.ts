/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import { commonControllerDecode } from "@pet-management-webapp/shared/data-access/data-access-common-api-util";
import { Group, SendEditGroupMembers, sendMemberList } 
    from "@pet-management-webapp/shared/data-access/data-access-common-models-util";
import { PatchMethod } from "@pet-management-webapp/shared/util/util-common";
import { Session } from "next-auth";
import { controllerCallPatchGroupMembers } from "./controllerCallPatchGroupMembers";

export async function controllerDecodePatchGroupMembers(
    session: Session, groupId: string, patchMethod: PatchMethod, value: sendMemberList)
    : Promise<Group | null> {

    const editGroupMembers: SendEditGroupMembers = {
        "Operations": [
            {
                "op": "replace",
                "value": value
            }
        ],
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:PatchOp"
        ]
    };

    const res = (
        await commonControllerDecode(() => 
            controllerCallPatchGroupMembers(session, groupId, editGroupMembers), null) as Group | null);

    return res;
}

export default controllerDecodePatchGroupMembers;
