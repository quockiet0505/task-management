# Task Management API

## Overview

This project is part of Week 2 of the Backend Intern Training Program (42Volta Platform).

The goal is to build a production-style backend API using:

- Encore.dev
- TypeScript
- Drizzle ORM
- PostgreSQL

With focus on:

- Authentication and authorization
- Multi-tenancy (organization-based isolation)
- Validation and error handling
- Clean service-layer architecture

Note: This is a training project and not part of the production codebase.

---

## Features

- User registration and login
- Session-based authentication
- Organization-based multi-tenancy
- Role-based access control (admin and member)
- Task management (CRUD)
- Validation using Zod
- Clean architecture: Handler -> Service -> Repository

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

Make sure the following are installed:

- Node.js (>= 18)
- Bun
- PostgreSQL (>= 14)
- Encore CLI

---

## Environment Setup

### Clone repository

git clone <your-repo-url>
cd task-management-api

### Install dependencies

bun install

---

## Database Setup

### Generate migrations

bun drizzle-kit generate

### Run migrations

bun drizzle-kit migrate

---

## Running the Application

Start Encore in development mode:

encore run

Encore will:

- Start the API server
- Provision required local infrastructure

Access the dashboard:

http://localhost:9400/

---

## Authentication Flow

1. User registers or logs in
2. A session is created using Better-auth
3. Authenticated requests include session context automatically

---

## API Endpoints

POST   /v1/auth/register     Register user
POST   /v1/auth/login        Login user

GET    /v1/tasks             List tasks
GET    /v1/tasks/:id         Get task details
POST   /v1/tasks/create      Create task
PUT    /v1/tasks/:id         Update task
DELETE /v1/tasks/:id         Delete task

---

## Cloud Deployment and Testing

### Connect to database via IAP tunnel

gcloud compute ssh task-mgmt-3v4w \
  --zone=asia-southeast1-a \
  --project=voltarocks-42-sandbox \
  --tunnel-through-iap \
  --ssh-flag="-L 5488:127.0.0.1:5432"

---

## API Testing

### Localhost (Traefik routing)

curl -i -X POST http://localhost/v1/auth/register \
  -H "Host: duongquockiet.id.vn" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

### Public domain

curl -i -L -X POST https://duongquockiet.id.vn/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

---

## Example API Flow

# Register
curl -X POST https://duongquockiet.id.vn/v1/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test1@example.com","password":"123456"}'

# Login
curl -X POST https://duongquockiet.id.vn/v1/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"test1@example.com","password":"123456"}'

# Create organization
curl -X POST https://duongquockiet.id.vn/v1/organizations/create \
-H "Authorization: Bearer TOKEN" \
-H "Content-Type: application/json" \
-d '{"name":"DevOps Team"}'

# Create task
curl -X POST https://duongquockiet.id.vn/v1/tasks/create \
-H "Authorization: Bearer TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "title":"First task",
  "status":"todo",
  "priority":"high",
  "organizationId":"ORG_ID"
}'

---

## Local PostgreSQL (Development)

docker run -d \
  --name your-postgres-dev \
  -e POSTGRES_USER=youradmin \
  -e POSTGRES_PASSWORD=youradminpassword \
  -e POSTGRES_DB=appdb \
  -p 5432:5432 \
  postgres:16

---

## Project Architecture

Handler -> Service -> Repository

Handler     Handle HTTP requests
Service     Business logic
Repository  Database layer

---

## Notes

- This project is for training purposes
- Not intended for production use
- Some configurations are simplified