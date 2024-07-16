# Hello World Go

Sample for Hello World web app.

### Prerequisites
1. Fork the repositoy

## Getting started

Please refer to the Choreo documentation under the [Develop an Application with Buildpacks](https://wso2.com/choreo/develop-components/deploy-an-application-with-buildpacks) to learn how to deploy the application.

1. Select `Web Application` Card from Component Creation Wizard
2. Select `Go` as the buildpack. Fill as follow according to selected Buildpack.

    | **Field**             | **Description**                               |
    |-----------------------|-----------------------------------------------|
    |Name           | Hello World WebApp              |
    |Description    | Hello World WebApp        |
    | **GitHub Account**    | Your account                                  |
    | **GitHub Repository** | choreo-samples |
    | **Branch**            | **`main`**                               |
    | **Buildpack**      | Go|
    | **Select Go Project Directory**       | hello-world-go-webapp |
    | **Language Version**              | 1.x |
    | **Port** | 8080|

3. Click Create. Once the component creation is complete, you will see the component overview page.
4. Deploy the created component

## Execute the Sample Locally

Navigate to the Go application directory

```bash
cd hello-world-go-webapp
```

Run the service

```shell
go run main.go
```