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

import { User } from "@pet-management-webapp/shared/data-access/data-access-common-models-util";
import { Profile } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        error: boolean,
        expires: boolean,
        accessToken?: string,
        adminAccessToken?: string,
        idToken?: JWT,
        scope?: string,
        refreshToken?: string,
        userId?: string,
        user?: User | null,
        orgId?: string,
        orgName?: string,
        orginalIdToken?: string,
        group?: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        idToken?: string,
        accessToken?: string,
        scope?: string,
        user?: Profile
    }
}

declare module "next-auth" {
    interface Profile {
        email?: string,
        sub?: string,
        family_name?: string,
        given_name?: string,
        username?: string,
        user_organization?: string,
        org_name?: string,
        org_id: string,
        groups: string[]
    }
}
