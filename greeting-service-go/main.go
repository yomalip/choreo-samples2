package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Start the first server on port 9077
	go startServer1()

	// Start the second server on port 9098
	go startServer2()

	// Prevent the main goroutine from exiting immediately
	select {}
}

func startServer1() {
	port1 := 9080
	mux1 := http.NewServeMux()
	mux1.HandleFunc("/hz", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to the health service v1, %d", port1)
	})

	fmt.Printf("Listening on port: %v\n", port1)
	if err := http.ListenAndServe(fmt.Sprintf(":%v", port1), mux1); err != nil {
		log.Fatalf("Failed to start server on port %v: %v", port1, err)
	}
}

func startServer2() {
	port2 := 9090
	mux2 := http.NewServeMux()
	mux2.HandleFunc("/greeter/greet", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to the greeting service v1, %d", port2)
	})

	fmt.Printf("Listening on port: %v\n", port2)
	if err := http.ListenAndServe(fmt.Sprintf(":%v", port2), mux2); err != nil {
		log.Fatalf("Failed to start server on port %v: %v", port2, err)
	}
}
