import ballerina/http;

configurable string name2 = "janaka";

type Greeting record {
    string 'from;
    string to;
    string message;
};

service / on new http:Listener(8090) {
    resource function get .(string name) returns Greeting {
        Greeting greetingMessage = {"from" : name2, "to" : name2, "message" : "Welcome to Choreo!"};
        return greetingMessage;
    }
}
