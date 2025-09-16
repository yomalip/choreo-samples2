package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
)

type TokenResponse struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	ExpiresIn   int    `json:"expires_in"`
}

type Config struct {
	ServiceURL     string
	ConsumerKey    string
	ConsumerSecret string
	TokenURL       string
	ConnectionName string
}

func main() {
	config := loadConfig()
	validateConfig(config)

	token, err := getAccessToken(config)
	if err != nil {
		log.Fatalf("Failed to get access token: %v", err)
	}

	response, err := invokeService(config.ServiceURL, token)
	if err != nil {
		log.Fatalf("Failed to invoke service: %v", err)
	}

	fmt.Printf("Service response: %s\n", response)
}

func loadConfig() Config {
	return Config{
		ServiceURL:     os.Getenv("CHOREO_CONNECTION_SERVICEURL"),
		ConsumerKey:    os.Getenv("CHOREO_CONNECTION_CONSUMERKEY"),
		ConsumerSecret: os.Getenv("CHOREO_CONNECTION_CONSUMERSECRET"),
		TokenURL:       os.Getenv("CHOREO_CONNECTION_TOKENURL"),
		ConnectionName: "CONNECTION",
	}
}

func validateConfig(config Config) {
	if config.ServiceURL == "" {
		log.Fatal("CHOREO_CONNECTION_SERVICEURL environment variable is required")
	}
	if config.ConsumerKey == "" {
		log.Fatal("CHOREO_CONNECTION_CONSUMERKEY environment variable is required")
	}
	if config.ConsumerSecret == "" {
		log.Fatal("CHOREO_CONNECTION_CONSUMERSECRET environment variable is required")
	}
	if config.TokenURL == "" {
		log.Fatal("CHOREO_CONNECTION_TOKENURL environment variable is required")
	}
}

func getAccessToken(config Config) (string, error) {
	data := url.Values{}
	data.Set("grant_type", "client_credentials")

	req, err := http.NewRequest("POST", config.TokenURL, strings.NewReader(data.Encode()))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.SetBasicAuth(config.ConsumerKey, config.ConsumerSecret)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to make token request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("token request failed with status %d: %s", resp.StatusCode, string(body))
	}

	var tokenResp TokenResponse
	if err := json.NewDecoder(resp.Body).Decode(&tokenResp); err != nil {
		return "", fmt.Errorf("failed to decode token response: %w", err)
	}

	return tokenResp.AccessToken, nil
}

func invokeService(serviceURL, token string) (string, error) {
	req, err := http.NewRequest("GET", serviceURL, nil)
	if err != nil {
		return "", fmt.Errorf("failed to create service request: %w", err)
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to make service request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response body: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("service request failed with status %d: %s", resp.StatusCode, string(body))
	}

	return string(body), nil
}