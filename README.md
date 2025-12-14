# Fullstack Mentoring - Microservices Architecture

Proyek fullstack JavaScript dengan arsitektur microservices menggunakan Node.js (Express) dan Golang.

## Architecture

- **Node.js Service**: Mengelola posts, authors, tags, dan comments
- **Golang Service**: Mengelola categories (microservice)
- **MySQL**: Database untuk menyimpan data

## Prerequisites

- Docker
- Docker Compose

## Quick Start

### Menggunakan Docker Compose

1. Clone repository dan masuk ke direktori proyek

2. Jalankan semua services dengan Docker Compose:
```bash
docker-compose up -d
```

3. Tunggu hingga semua container berjalan. Cek status dengan:
```bash
docker-compose ps
```

4. Akses aplikasi:
   - Node.js App: http://localhost:3000
   - Category Service (Golang): http://localhost:8080
   - MySQL: localhost:3306

### Menjalankan Tanpa Docker

1. Install dependencies untuk Node.js:
```bash
npm install
```

2. Setup database MySQL dan jalankan schema.sql dan seed.sql

3. Buat file `.env` dari `.env.example` dan sesuaikan konfigurasi:
```bash
cp .env.example .env
```

4. Jalankan Golang service:
```bash
cd golang
go run main.go
```

5. Jalankan Node.js service (terminal baru):
```bash
npm start
```

## API Endpoints

### Node.js Service (Port 3000)

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `GET /api/posts/slug/:slug` - Get post by slug
- `POST /api/posts` - Create new post (dengan validasi category dari Golang service)
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Golang Category Service (Port 8080)

- `GET /api/categories` - Get all categories
- `GET /health` - Health check

## Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f nodejs-app
docker-compose logs -f category-service

# Rebuild services
docker-compose up -d --build

# Remove all containers and volumes
docker-compose down -v
```

## Microservices Communication

Ketika membuat post baru, Node.js service akan berkomunikasi dengan Golang category service untuk memvalidasi category_id. Ini mendemonstrasikan komunikasi antar microservices.

Example request untuk membuat post:
```json
POST /api/posts
{
  "title": "My Post",
  "slug": "my-post",
  "content": "Content here",
  "author_id": 1,
  "category_id": 1,
  "status": "published"
}
```

Node.js service akan memanggil `http://category-service:8080/api/categories` untuk validasi category_id sebelum menyimpan post.

## Environment Variables

Lihat file `.env.example` untuk konfigurasi yang dibutuhkan.

## Database Schema

Database schema dan seed data akan otomatis dijalankan saat MySQL container pertama kali dibuat.
