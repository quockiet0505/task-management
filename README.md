# Encore TypeScript Starter

A starter template for building backend services with **Encore.dev**, **TypeScript**, **Drizzle ORM**, and **PostgreSQL**.

When you have [installed Encore](https://encore.dev/docs/ts/install), you can create a new Encore application and clone this example with this command.

---

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

## Environment Setup

### 1. Clone repository

```bash
git clone <your-repo-url> && cd task-management-api
```

### 2. Install dependencies
```bash 
bun install 
```

## Database Setup
### Generate migrations
```bash 
bun drizzle-kit generate
```

### Run migrations
```bash 
bun drizzle-kit migrate
```

## Running the Application

### Start Encore in development mode:

```bash 
encore run
```

### Encore will:

### Start the API server

### Spin up required infrastructure


- While `encore run` is running, open <http://localhost:9400/> to view Encore's [local developer dashboard](https://encore.dev/docs/ts/observability/dev-dash).

## API Overview
- Authentication Flow

- User registers or logs in

- A session is created using Better-auth

- Authenticated requests include session context automatically via Encore

Example Endpoints
   - `POST /v1/auth/register` - User registration
   - `POST /v1/auth/login` - User login
   - `POST /v1/tasks` - List tasks (with filters)
   - `GET /v1/tasks/:id` - Get task details
   - `POST /v1/tasks/create` - Create task
   - `PUT /v1/tasks/:id` - Update task
   - `DELETE /v1/tasks/:id` - Delete task
