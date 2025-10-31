import ballerina/http;
import ballerina/io;

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
    string[] tags;
    NewGreeting[] newGreeting;
    map<NewGreeting> greetingStrMap?;
};

configurable Greeting nestedGreeting = ?;
// configurable Greeting|NewGreeting greetingN = ?;
configurable string? nullString = "abc";
configurable boolean isEnabled = ?;

service / on new http:Listener(8090) {
    resource function get .(string name) returns json {
        io:println(nestedGreeting);
        io:println("Is Enabled: ", isEnabled);
        
        // Return all configurables as JSON
        json response = {
            "nestedGreeting": nestedGreeting,
            "nullString": nullString,
            "isEnabled": isEnabled,
            "requestName": name
        };
        
        return response;
    }
}
