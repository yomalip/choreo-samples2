import ballerina/http;
import ballerina/io;

// configurable string name2 = "janaka";

type Greeting record {
    string 'from;
    string to;
    string message;
};

configurable Greeting greeting2 = {"from" : "name1", "to" : "name1", "message" : "Welcome to Choreo!"};

service / on new http:Listener(8090) {
    resource function get .(string name) returns Greeting {
        io:println(greeting2);
        Greeting greetingMessage = {"from" : "name2", "to" : "name2", "message" : "Welcome to Choreo!"};
        return greetingMessage;
    }
}
