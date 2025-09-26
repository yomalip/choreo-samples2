import ballerina/http;
// import ballerina/io;

type Greeting record {
    string 'from;
    string to;
    string message;
};

type NewGreeting record {
    string newfrom;
    string newto;
    string newmessage?;
};

// configurable map<Greeting> greetingMap = ?;
configurable Greeting|NewGreeting greetingN = ?;

service / on new http:Listener(8090) {
    resource function get .(string name) returns Greeting {
        // io:println(greetingStrMap);
        // io:println(greetingMap);
        Greeting greetingMessage = {"from" : "name2", "to" : "name2", "message" : "BLUE"};
        return greetingMessage;
    }
}
