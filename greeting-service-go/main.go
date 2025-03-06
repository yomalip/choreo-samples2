/*
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com/) All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package main

import (
	"context"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"
)

func main() {

	serverMux := http.NewServeMux()
	serverMux.HandleFunc("/greeter/greet", greet)

	serverPort := 9090
	server := http.Server{
		Addr:    fmt.Sprintf(":%d", serverPort),
		Handler: serverMux,
	}
	go func() {
		log.Printf("Starting HTTP Greeter on port %d\n", serverPort)
		if err := server.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("HTTP ListenAndServe error: %v", err)
		}
		log.Println("HTTP server stopped serving new requests.")
	}()

	stopCh := make(chan os.Signal, 1)
	signal.Notify(stopCh, syscall.SIGINT, syscall.SIGTERM)
	<-stopCh // Wait for shutdown signal

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	log.Println("Shutting down the server...")
	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Fatalf("HTTP shutdown error: %v", err)
	}
	log.Println("Shutdown complete.")
}

func greet(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	hostname, err := os.Hostname()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	fmt.Printf("REDIS_URL: %s", os.Getenv("REDIS_URL"))
	fmt.Printf("DB_USER: %s", os.Getenv("DB_USER"))
	fmt.Printf("DB_PASSWORD: %s", os.Getenv("DB_PASSWORD"))
	fmt.Printf("VERSION: %s", os.Getenv("VERSION"))

	dirPath := "/src/resources" // Change this to your target directory

	files, err := ioutil.ReadDir(dirPath)
	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		if !file.IsDir() { // Skip directories
			filePath := filepath.Join(dirPath, file.Name())
			fmt.Printf("Contents of %s:\n", filePath)

			content, err := ioutil.ReadFile(filePath)
			if err != nil {
				log.Printf("Error reading %s: %v\n", filePath, err)
				continue
			}

			fmt.Println(string(content))
			fmt.Println("-----------")
		}
	}

	if name == "" {
		name = "Stranger Test"
	}
	fmt.Fprintf(w, "Image 2, %s! from %s\n", name, hostname)
}
