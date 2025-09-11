import ballerina/http;

// Define a configurable string variable
configurable string greetingSuffix = "";
configurable string API_URL = "";
configurable string DATABASE_URL = "";


service /hello on new http:Listener(8090) {
  resource function get greeting() returns string {
    // Access the configurable string and concatenate with "Hello, World!"
    return "Hello, World!" + greetingSuffix + "apiurl = " +API_URL+ "dburl = "  + DATABASE_URL ;
  }
}
