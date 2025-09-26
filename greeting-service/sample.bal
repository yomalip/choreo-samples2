import ballerina/http;
import ballerina/io;

configurable string [] str = ?;
configurable Greeting[] greetingArr = ?;
configurable string | int mixId = ?;

enum Color {
    RED,
    GREEN,
    BLUE
}

type Greeting record {
    string 'from;
    string to;
    Color message;
};

// configurable Greeting greeting2 = ?;

service / on new http:Listener(8090) {
    resource function get .(string name) returns Greeting {
        io:println(str);
        io:println(greetingArr);
        io:println(mixId);
        Greeting greetingMessage = {"from" : "name2", "to" : "name2", "message" : "BLUE"};
        return greetingMessage;
    }
}
