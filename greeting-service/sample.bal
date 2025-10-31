import ballerina/http;
import ballerina/io;

// ============================================
// PRIMITIVE TYPES - Level 1 (RequiredLevel: 1)
// ============================================
type NewGreeting record {
    string newfrom;
    string newto;
    string newmessage?;
};

type Greeting record {
    string 'from;
    string to;
    string message;
    int age;
    float weight;
    decimal price;
    boolean isActive;
    string[] tags;
    int[] scores;
    float[] measurements;
    NewGreeting[] newGreeting;
    map<NewGreeting> greetingStrMap?;
    map<string> stringMap;
    map<int> intMap;
    map<float> floatMap;
    map<boolean> booleanMap;
};

// ============================================
// NESTED OBJECTS - Level 2 (RequiredLevel: 2)
// ============================================
type DatabaseConfig record {
    string host;
    int port;
    string username;
    string password?;
    boolean sslEnabled;
    float connectionTimeout;
    decimal maxPoolSize;
    string[] allowedHosts;
    int[] ports;
};

type CacheConfig record {
    string cacheType;
    int ttl;
    boolean enabled;
    float memoryLimit;
    string[] evictionPolicies;
};

type Level2Nested record {
    DatabaseConfig database;
    CacheConfig cache;
    string appName;
    int appVersion;
};

// ============================================
// DEEPLY NESTED OBJECTS - Level 3+ (RequiredLevel: 3)
// ============================================
type AuthProvider record {
    string name;
    string clientId;
    string clientSecret;
    int tokenExpiry;
    boolean enabled;
    string[] scopes;
};

type SecurityConfig record {
    AuthProvider oauth;
    AuthProvider saml?;
    boolean requireHttps;
    int sessionTimeout;
};

type ServiceConfig record {
    SecurityConfig security;
    string serviceName;
    int maxRetries;
    float timeout;
};

type Level3Nested record {
    ServiceConfig serviceConfig;
    string environment;
    int replicaCount;
};

// ============================================
// UNION/ANYOF TYPES
// ============================================
type ConnectionString string|int;

type FlexibleConfig record {
    string|int flexibleValue;
    string|null nullableString?;
    int|float numericValue;
    boolean|string mixedValue;
};

// ============================================
// ENUM TYPES
// ============================================
enum LogLevel {
    DEBUG,
    INFO,
    WARN,
    ERROR
}

type LoggingConfig record {
    LogLevel level;
    string format;
    int maxFiles;
};

// ============================================
// COMPLEX NESTED STRUCTURES WITH MAPS
// ============================================
type MapValueType record {
    string key;
    int value;
    boolean active;
};

type ComplexMapConfig record {
    map<string> simpleStringMap;
    map<int> simpleIntMap;
    map<MapValueType> complexMap;
    map<string[]> arrayMap;
    map<NewGreeting> objectMap;
};

// ============================================
// ARRAYS OF DIFFERENT TYPES
// ============================================
type ArrayConfig record {
    string[] stringArray;
    int[] intArray;
    float[] floatArray;
    boolean[] booleanArray;
    NewGreeting[] objectArray;
    map<string>[] mapArray;
    string[][] nestedStringArray;
    int[][] nestedIntArray;
};

// ============================================
// MIXED COMPLEX STRUCTURES
// ============================================
type AdvancedConfig record {
    // Level 1 primitives
    string apiKey;
    int maxConnections;
    float rateLimit;
    decimal precision;
    boolean debugMode;
    
    // Level 2 nested
    Level2Nested nested;
    
    // Level 3+ nested
    Level3Nested deepNested?;
    
    // Arrays
    string[] endpoints;
    int[] ports;
    NewGreeting[] greetings;
    
    // Maps
    map<string> envVars;
    map<int> thresholds;
    map<NewGreeting> configMap;
    
    // Union types
    FlexibleConfig flexible?;
    
    // Enum
    LoggingConfig logging;
    
    // Complex arrays
    ArrayConfig arrays;
    
    // Complex maps
    ComplexMapConfig maps;
};

// ============================================
// CONFIGURABLE VARIABLES
// ============================================

// Level 1 - Simple primitives (RequiredLevel: 1)
configurable string? nullString = "abc";
configurable boolean isEnabled = ?;
configurable int maxRetries = 3;
configurable float timeout = 30.5;
configurable decimal price = 99.99;

// Level 1 - Simple object (RequiredLevel: 1)
configurable Greeting nestedGreeting = ?;

// Level 2 - Nested object (RequiredLevel: 2)
configurable Level2Nested level2Config = ?;

// Level 3 - Deeply nested object (RequiredLevel: 3)
configurable Level3Nested level3Config = {
    serviceConfig: {
        security: {
            oauth: {
                name: "",
                clientId: "",
                clientSecret: "",
                tokenExpiry: 0,
                enabled: false,
                scopes: []
            },
            requireHttps: false,
            sessionTimeout: 0
        },
        serviceName: "",
        maxRetries: 0,
        timeout: 0.0
    },
    environment: "",
    replicaCount: 0
};

// Arrays
configurable string[] tags = ["default"];
configurable int[] numbers = [1, 2, 3];
configurable NewGreeting[] greetingArray = [];

// Maps
configurable map<string> stringMap = {"key1": "value1"};
configurable map<int> intMap = {"key1": 100};
configurable map<NewGreeting> objectMap = {};

// Union types
configurable FlexibleConfig flexibleConfig = {
    flexibleValue: "",
    numericValue: 0,
    mixedValue: ""
};

// Enum
configurable LoggingConfig loggingConfig = {
    level: DEBUG,
    format: "",
    maxFiles: 0
};

// Complex structures
configurable ArrayConfig arrayConfig = {
    stringArray: [],
    intArray: [],
    floatArray: [],
    booleanArray: [],
    objectArray: [],
    mapArray: [],
    nestedStringArray: [],
    nestedIntArray: []
};

configurable ComplexMapConfig mapConfig = {
    simpleStringMap: {},
    simpleIntMap: {},
    complexMap: {},
    arrayMap: {},
    objectMap: {}
};

configurable AdvancedConfig advancedConfig = {
    apiKey: "",
    maxConnections: 0,
    rateLimit: 0.0,
    precision: 0.0,
    debugMode: false,
    nested: {
        database: {
            host: "",
            port: 0,
            username: "",
            sslEnabled: false,
            connectionTimeout: 0.0,
            maxPoolSize: 0.0,
            allowedHosts: [],
            ports: []
        },
        cache: {
            cacheType: "",
            ttl: 0,
            enabled: false,
            memoryLimit: 0.0,
            evictionPolicies: []
        },
        appName: "",
        appVersion: 0
    },
    deepNested: {
        serviceConfig: {
            security: {
                oauth: {
                    name: "",
                    clientId: "",
                    clientSecret: "",
                    tokenExpiry: 0,
                    enabled: false,
                    scopes: []
                },
                requireHttps: false,
                sessionTimeout: 0
            },
            serviceName: "",
            maxRetries: 0,
            timeout: 0.0
        },
        environment: "",
        replicaCount: 0
    },
    endpoints: [],
    ports: [],
    greetings: [],
    envVars: {},
    thresholds: {},
    configMap: {},
    flexible: {
        flexibleValue: "",
        numericValue: 0,
        mixedValue: ""
    },
    logging: {
        level: DEBUG,
        format: "",
        maxFiles: 0
    },
    arrays: {
        stringArray: [],
        intArray: [],
        floatArray: [],
        booleanArray: [],
        objectArray: [],
        mapArray: [],
        nestedStringArray: [],
        nestedIntArray: []
    },
    maps: {
        simpleStringMap: {},
        simpleIntMap: {},
        complexMap: {},
        arrayMap: {},
        objectMap: {}
    }
};

// ============================================
// SERVICE
// ============================================
service / on new http:Listener(8090) {
    resource function get .(string name) returns json {
        io:println("Level 1 Config:", nestedGreeting);
        io:println("Level 2 Config:", level2Config);
        io:println("Level 3 Config:", level3Config);
        io:println("Is Enabled: ", isEnabled);
        io:println("Tags: ", tags);
        io:println("String Map: ", stringMap);
        
        // Return all configurables as JSON with explicit conversion
        json response = {
            "nestedGreeting": nestedGreeting.toJson(),
            "level2Config": level2Config.toJson(),
            "level3Config": level3Config.toJson(),
            "nullString": nullString,
            "isEnabled": isEnabled,
            "maxRetries": maxRetries,
            "timeout": timeout,
            "price": price,
            "tags": tags,
            "numbers": numbers,
            "greetingArray": greetingArray.toJson(),
            "stringMap": stringMap,
            "intMap": intMap,
            "objectMap": objectMap.toJson(),
            "flexibleConfig": flexibleConfig.toJson(),
            "loggingConfig": loggingConfig.toJson(),
            "arrayConfig": arrayConfig.toJson(),
            "mapConfig": mapConfig.toJson(),
            "advancedConfig": advancedConfig.toJson(),
            "requestName": name
        };
        
        return response;
    }
}

