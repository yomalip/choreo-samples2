import ballerina/http;
import ballerina/io;

configurable float num2 = 23.3;

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
        io:println(num2);
        Greeting greetingMessage = {"from" : "name2", "to" : "name2", "message" : "BLUE"};
        return greetingMessage;
    }
}
