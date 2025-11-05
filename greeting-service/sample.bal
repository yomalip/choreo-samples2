import ballerina/http;
import ballerina/io;

// ============================================
// LEVEL 1 - SIMPLE TYPES (RequiredLevel: 1)
// ============================================

// Basic record types for Level 1
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

// Union type for flexible configuration
type ConnectionString string|int;

// ============================================
// LEVEL 1 CONFIGURABLE VARIABLES
// ============================================

// Simple primitive configurables
configurable string? nullString = "abc";
configurable boolean isEnabled = ?;
configurable int maxRetries = 3;
configurable float timeout = 30.5;
configurable decimal price = 99.99;

// Simple object configurable
configurable Greeting nestedGreeting = ?;

// Simple arrays
configurable string[] tags = ["default"];
configurable int[] numbers = [1, 2, 3];
configurable NewGreeting[] greetingArray = [];

// Simple maps
configurable map<string> stringMap = {"key1": "value1"};
configurable map<int> intMap = {"key1": 100};
configurable map<NewGreeting> objectMap = {};

// ============================================
// SERVICE
// ============================================
service / on new http:Listener(8090) {
    resource function get level1(string name) returns json {
        io:println("=== Level 1 Configurations ===");
        io:println("Simple Primitives:");
        io:println("  - Null String: ", nullString);
        io:println("  - Is Enabled: ", isEnabled);
        io:println("  - Max Retries: ", maxRetries);
        io:println("  - Timeout: ", timeout);
        io:println("  - Price: ", price);
        io:println("\nSimple Object:");
        io:println("  - Greeting: ", nestedGreeting);
        io:println("\nArrays:");
        io:println("  - Tags: ", tags);
        io:println("  - Numbers: ", numbers);
        io:println("\nMaps:");
        io:println("  - String Map: ", stringMap);
        
        // Return Level 1 configurables as JSON
        json response = {
            "level": 1,
            "description": "Simple primitives and basic objects",
            "configurations": {
                "primitives": {
                    "nullString": nullString,
                    "isEnabled": isEnabled,
                    "maxRetries": maxRetries,
                    "timeout": timeout,
                    "price": price
                },
                "simpleObject": nestedGreeting.toJson(),
                "arrays": {
                    "tags": tags,
                    "numbers": numbers,
                    "greetingArray": greetingArray.toJson()
                },
                "maps": {
                    "stringMap": stringMap,
                    "intMap": intMap,
                    "objectMap": objectMap.toJson()
                }
            },
            "requestName": name
        };
        
        return response;
    }
}
