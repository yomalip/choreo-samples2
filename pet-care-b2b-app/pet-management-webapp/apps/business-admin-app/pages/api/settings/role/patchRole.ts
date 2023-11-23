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

import { requestOptionsWithBody } 
    from "@pet-management-webapp/business-admin-app/data-access/data-access-common-api-util";
import { RequestMethod, dataNotRecievedError, notPostError } from
    "@pet-management-webapp/shared/data-access/data-access-common-api-util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function patchRole(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        notPostError(res);
    }

    const body = JSON.parse(req.body);
    const session = body.session;
    const patchBody = body.param;
    const roleUri = new URL(req.query.roleUri.toString());

    try {
        const fetchData = await fetch(
            roleUri,
            requestOptionsWithBody(session, RequestMethod.PATCH, patchBody)
        );

        const data = await fetchData.json();

        res.status(200).json(data);
    } catch (err) {

        return dataNotRecievedError(res);
    }
}
