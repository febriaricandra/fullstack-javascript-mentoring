# Golang Dockerfile
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.mod ./

# Download dependencies
RUN go mod download

# Copy source code
COPY main.go ./

# Build the application
RUN go build -o category-service main.go

# Final stage
FROM alpine:latest

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/category-service .

# Expose port
EXPOSE 8080

# Run the application
CMD ["./category-service"]
