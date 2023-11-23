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

import { ApplicationList } from "@pet-management-webapp/business-admin-app/data-access/data-access-common-models-util";
import { commonControllerDecode } from "@pet-management-webapp/shared/data-access/data-access-common-api-util";
import { Session } from "next-auth";
import { controllerCallListCurrentApplication } from "./controllerCallListCurrentApplication";

/**
 * 
 * @param session - session object
 *
 * @returns get the deatils of the current logged in application of the business app, 
 * filtered using the `BusinessAppConfig.ManagementAPIConfig.SharedApplicationName` in the config.json 
 */
export async function controllerDecodeListCurrentApplication(session: Session): Promise<ApplicationList | null> {

    const res = (await commonControllerDecode(() => controllerCallListCurrentApplication(session), null) as
        ApplicationList | null);

    return res;

}

export default controllerDecodeListCurrentApplication;
