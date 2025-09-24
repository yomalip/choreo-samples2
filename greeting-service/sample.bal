import ballerina/http;

configurable string name = ?;

type Greeting record {
    string 'from;
    string to;
    string message;
};

service / on new http:Listener(8090) {
    resource function get .(string name) returns Greeting {
        Greeting greetingMessage = {"from" : name, "to" : name, "message" : "Welcome to Choreo!"};
        return greetingMessage;
    }
}
