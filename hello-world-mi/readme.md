# Hello World MI

Sample for Hello World service. This API responds with a customizable "Hello" message when called, making it an excellent starting point for beginners and a handy tool for testing API integrations.

## Features

- Returns a JSON response with a greeting message
- Supports customization via optional environment variable `HELLO_MESSAGE`
- Provides information about whether the environment variable was used

## Environment Variables

- **HELLO_MESSAGE** (optional): Custom message to return in the greeting. If not set, defaults to "World".

## Getting started

1. Fork this repository.
2. Deploy as a service in Choreo.
3. Optionally set the `HELLO_MESSAGE` environment variable to customize the response.

## Testing

Use a REST client to send a request to the service. For example, you can use the curl command as follows:

```bash
curl -v <endpoint-url>/HelloWorld
```

### Default Response (without environment variable)
```json
{
    "Hello": "World",
    "source": "Environment variable HELLO_MESSAGE: false"
}
```

### Custom Response (with HELLO_MESSAGE="Choreo")
```json
{
    "Hello": "Choreo",
    "source": "Environment variable HELLO_MESSAGE: true"
}
```

## Setting Environment Variables

When deploying in Choreo, you can set the `HELLO_MESSAGE` environment variable in the deployment configuration to customize the greeting message.
