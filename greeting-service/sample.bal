import ballerina/http;
import ballerina/io;

configurable int num = ?;

type Greeting record {
    string 'from;
    string to;
    string message;
};

// configurable Greeting greeting2 = {"from" : "name1", "to" : "name1", "message" : "Welcome to Choreo!"};

service / on new http:Listener(8090) {
    resource function get .(string name) returns Greeting {
        io:println(num);
        Greeting greetingMessage = {"from" : "name2", "to" : "name2", "message" : "Welcome to Choreo!"};
        return greetingMessage;
    }
}
