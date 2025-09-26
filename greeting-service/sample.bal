import ballerina/http;
import ballerina/io;

type Greeting record {
    string 'from;
    string to;
    string message;
};

configurable map<Greeting> greetingMap = ?;
configurable map<string> greetingStrMap = ?;

service / on new http:Listener(8090) {
    resource function get .(string name) returns Greeting {
        io:println(greetingStrMap);
        io:println(greetingMap);
        Greeting greetingMessage = {"from" : "name2", "to" : "name2", "message" : "BLUE"};
        return greetingMessage;
    }
}
