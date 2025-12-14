package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

type Category struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Slug string `json:"slug"`
}

type Response struct {
	Success bool       `json:"success"`
	Data    []Category `json:"data"`
}

var categories = []Category{
	{ID: 1, Name: "Technology", Slug: "technology"},
	{ID: 2, Name: "Programming", Slug: "programming"},
	{ID: 3, Name: "Web Development", Slug: "web-development"},
	{ID: 4, Name: "Mobile Development", Slug: "mobile-development"},
	{ID: 5, Name: "DevOps", Slug: "devops"},
	{ID: 6, Name: "Data Science", Slug: "data-science"},
	{ID: 7, Name: "Artificial Intelligence", Slug: "artificial-intelligence"},
	{ID: 8, Name: "Cybersecurity", Slug: "cybersecurity"},
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func getCategories(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	
	response := Response{
		Success: true,
		Data:    categories,
	}

	json.NewEncoder(w).Encode(response)
}

func healthCheck(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Category service is running",
	})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/api/categories", getCategories)
	http.HandleFunc("/health", healthCheck)

	log.Printf("Category service is running on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
