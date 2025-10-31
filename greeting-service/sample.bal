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
    NewGreeting[] newGreeting;
    map<NewGreeting> greetingStrMap?;
};

configurable Greeting nestedGreeting = ?;
// configurable Greeting|NewGreeting greetingN = ?;
configurable string? nullString = "abc";
configurable boolean isEnabled = ?;  // Added boolean configurable (required)

service / on new http:Listener(8090) {
    resource function get .(string name) returns string {
        // io:println(greetingStrMap);
        io:println(nestedGreeting);
        io:println("Is Enabled: ", isEnabled);
        // Greeting greetingMessage = {"from" : "name2", "to" : "name2", "message" : "BLUE"};
        return "greetingMessage";
    }
}
