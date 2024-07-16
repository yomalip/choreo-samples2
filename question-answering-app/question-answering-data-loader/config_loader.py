"""
 Copyright (c) 2023, WSO2 LLC. (http://www.wso2.org) All Rights Reserved.

 WSO2 LLC. licenses this file to you under the Apache License,
 Version 2.0 (the "License"); you may not use this file except
 in compliance with the License.
 You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied. See the License for the
 specific language governing permissions and limitations
 under the License.
"""

import os


def load_configs():
    """
    Load configs from environment variables.
    """
    config_keys = ["OPENAI_API_KEY", "OPENAI_API_BASE", "OPENAI_EMBEDDING_MODEL", "SHEET_ID", "WORKSHEET_NAME",
                   "PINECONE_API_KEY", "PINECONE_INDEX_NAME", "PINECONE_ENVIRONMENT", "DATA_URL"]
    loaded_configs = {}

    for key in config_keys:
        value = os.getenv(key)
        if value is None:
            raise ValueError(f"Missing environment variable: {key}")

        loaded_configs[key] = value

    return loaded_configs
