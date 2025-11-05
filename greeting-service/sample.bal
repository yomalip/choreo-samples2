import ballerina/http;
import ballerina/io;

// ============================================
// LEVEL 2 - NESTED OBJECTS (RequiredLevel: 2)
// ============================================

// Database configuration with multiple nested fields
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

// Cache configuration with various types
type CacheConfig record {
    string cacheType;
    int ttl;
    boolean enabled;
    float memoryLimit;
    string[] evictionPolicies;
};

// Level 2 nested structure combining multiple configs
type Level2Nested record {
    DatabaseConfig database;
    CacheConfig cache;
    string appName;
    int appVersion;
};

// Flexible configuration with union types
type FlexibleConfig record {
    string|int flexibleValue;
    string|null nullableString?;
    int|float numericValue;
    boolean|string mixedValue;
};

// Enum for logging levels
enum LogLevel {
    DEBUG,
    INFO,
    WARN,
    ERROR
}

// Logging configuration using enum
type LoggingConfig record {
    LogLevel level;
    string format;
    int maxFiles;
};

// Arrays of different types configuration
type ArrayConfig record {
    string[] stringArray;
    int[] intArray;
    float[] floatArray;
    boolean[] booleanArray;
    DatabaseConfig[] objectArray;
    map<string>[] mapArray;
    string[][] nestedStringArray;
    int[][] nestedIntArray;
};

// ============================================
// LEVEL 2 CONFIGURABLE VARIABLES
// ============================================

// Main Level 2 nested configuration
configurable Level2Nested level2Config = ?;

// Flexible configuration with union types
configurable FlexibleConfig flexibleConfig = {
    flexibleValue: "",
    numericValue: 0,
    mixedValue: ""
};

// Logging configuration with enum
configurable LoggingConfig loggingConfig = {
    level: DEBUG,
    format: "",
    maxFiles: 0
};

// Array configuration
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

// ============================================
// SERVICE
// ============================================
service / on new http:Listener(8091) {
    resource function get level2(string name) returns json {
        io:println("=== Level 2 Configurations ===");
        io:println("Nested Objects:");
        io:println("  - Database Config: ", level2Config.database);
        io:println("  - Cache Config: ", level2Config.cache);
        io:println("  - App Name: ", level2Config.appName);
        io:println("  - App Version: ", level2Config.appVersion);
        io:println("\nFlexible Config:");
        io:println("  - ", flexibleConfig);
        io:println("\nLogging Config:");
        io:println("  - Level: ", loggingConfig.level);
        io:println("  - Format: ", loggingConfig.'format);
        
        // Return Level 2 configurables as JSON
        json response = {
            "level": 2,
            "description": "Nested objects with one level of nesting",
            "configurations": {
                "level2Config": level2Config.toJson(),
                "flexibleConfig": flexibleConfig.toJson(),
                "loggingConfig": loggingConfig.toJson(),
                "arrayConfig": arrayConfig.toJson()
            },
            "requestName": name
        };
        
        return response;
    }
}
