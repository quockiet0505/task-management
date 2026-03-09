
# Task Management API

## Overview

This project is part of **Week 2 of the Backend Intern Training Program – 42Volta Platform**.

The goal of Week 2 is to build a **production-style backend API** using:

- Encore.dev
- TypeScript
- Drizzle ORM
- PostgreSQL

With a focus on:

- Authentication & Authorization
- Multi-tenancy (organization-based data isolation)
- Validation & error handling
- Clean service-layer architecture

> **Note**  
> This is a training project, not part of the Volta production codebase.

---

## Features

- User registration & login  
- Session-based authentication  
- Organization-based multi-tenancy  
- Role-based access control (admin / member)  
- Task management (CRUD)  
- Validation using Zod  
- Clean architecture: **Handler → Service → Repository**

---

## Tech Stack

- Encore.dev  
- TypeScript  
- Bun / Node.js  
- PostgreSQL  
- Drizzle ORM  
- Better-auth  
- Zod  

---

## Requirements

Before starting, make sure you have installed:

- Node.js >= 18  
- Bun  
- PostgreSQL >= 14  
- Encore CLI  

---

# Environment Setup

## 1. Clone repository

```bash
git clone <your-repo-url>
cd task-management-api
```

## 2. Install dependencies

```bash
bun install
```

---

# Database Setup

## Generate migrations

```bash
bun drizzle-kit generate
```

## Run migrations

```bash
bun drizzle-kit migrate
```

---

# Running the Application

Start Encore in development mode:

```bash
encore run
```

Encore will:

- Start the API server  
- Spin up required infrastructure  

While `encore run` is running, open:

```
http://localhost:9400/
```

to view Encore's local developer dashboard.

---

# API Overview

## Authentication Flow

1. User registers or logs in  
2. A session is created using **Better-auth**  
3. Authenticated requests include session context automatically via Encore  

---

# Example Endpoints

```
POST   /v1/auth/register     User registration
POST   /v1/auth/login        User login
GET    /v1/tasks             List tasks (with filters)
GET    /v1/tasks/:id         Get task details
POST   /v1/tasks/create      Create task
PUT    /v1/tasks/:id         Update task
DELETE /v1/tasks/:id         Delete task
```

---

# Cloud Deployment & Testing (Production)

## 1. Database Connection via IAP Tunnel

```bash
gcloud compute ssh task-mgmt-3v4w \
  --zone=asia-southeast1-a \
  --project=voltarocks-42-sandbox \
  --tunnel-through-iap \
  --ssh-flag="-L 5488:127.0.0.1:5432"
```

---

# 2. Testing the API

## Test via Localhost (Testing Traefik Routing)

```bash
curl -i -X POST http://localhost/v1/auth/register \
  -H "Host: duongquockiet.id.vn" \
  -H "Content-Type: application/json" \
  -d '{"email":"last_victory_v2@gmail.com", "password":"password123"}'
```

## Test via Public Domain (HTTPS 200 OK)

```bash
curl -i -L -X POST https://duongquockiet.id.vn/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"super_public_victory@gmail.com", "password":"password123"}'
```

### Structure for frontend
```bash
# 1. Create React + Vite project

bun create vite web --template react-ts
cd web
bun install

# 2. Install core dependencies

bun add react-router-dom lucide-react

# 3. Install TailwindCSS v4

bun add -d tailwindcss postcss autoprefixer @tailwindcss/vite

# 4. Install shadcn/ui

bunx --bun shadcn@latest init

# 5. Install shadcn components

bunx --bun shadcn@latest add \
button \
card \
input \
label \
form \
table \
dialog \
dropdown-menu \
select \
avatar \
sonner
```

docker build -t asia-southeast1-docker.pkg.dev/voltarocks-42-sandbox/cloud-engineer-repo/task-web:v1 .

docker push asia-southeast1-docker.pkg.dev/voltarocks-42-sandbox/cloud-engineer-repo/task-web:v1

### Test create account

```
curl -X POST https://duongquockiet.id.vn/v1/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email":"test1@example.com",
  "password":"123456"
}'

curl -X POST https://duongquockiet.id.vn/v1/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email":"test1@example.com",
  "password":"123456"
}'

curl -X POST https://duongquockiet.id.vn/v1/organizations/create \
-H "Content-Type: application/json" \
-H "Authorization: Bearer TOKEN" \
-d '{
  "name":"DevOps Team"
}'

curl -X POST https://duongquockiet.id.vn/v1/tasks/create \
-H "Content-Type: application/json" \
-H "Authorization: Bearer TOKEN" \
-d '{
  "title":"First task",
  "status":"todo",
  "priority":"high",
  "organizationID":"ORG_ID"
}'

curl -X POST https://duongquockiet.id.vn/v1/tasks/create \
-H "Content-Type: application/json" \
-H "Authorization: Bearer TOKEN" \
-d '{
  "title":"First task",
  "status":"todo",
  "priority":"high",
  "organizationID":"ORG_ID"
}'

