# Medical Records Management System (PFE)

A full-stack medical records management application built with **Spring Boot 3** (backend) and **Angular 17** (frontend).

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
  - [Database](#database)
  - [Backend Configuration](#backend-configuration)
- [Running the Application](#running-the-application)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Default Ports](#default-ports)

---

## Prerequisites

Make sure the following tools are installed on your machine:

| Tool | Version |
|------|---------|
| Java | 17+ |
| Maven | 3.8+ |
| Node.js | 18+ |
| npm | 9+ |
| Angular CLI | 17+ |
| MySQL | 8+ |

Install Angular CLI globally (if not already installed):

```bash
npm install -g @angular/cli
```

---

## Project Structure

```
Pfe/
├── backend/    # Spring Boot REST API
└── frontend/   # Angular 17 SPA
```

---

## Environment Setup

### Database

1. Start your MySQL server.

2. Create the database:

```sql
CREATE DATABASE medical_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. Create a user (or use `root`) and grant access:

```sql
-- Example using root with no password (matches the default config)
-- Or create a dedicated user:
CREATE USER 'medical_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON medical_db.* TO 'medical_user'@'localhost';
FLUSH PRIVILEGES;
```

### Backend Configuration

Open `backend/src/main/resources/application.yml` and update the datasource credentials to match your MySQL setup:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/medical_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
    username: root       # change if needed
    password:            # add your password here
```

You can also change the JWT secret for production:

```yaml
jwt:
  secret: mySecretKey123456789012345678901234567890   # use a long random string in production
  expiration: 86400000   # token validity in ms (24 hours)
```

> **Note:** Hibernate is configured with `ddl-auto: update`, so all tables are created/updated automatically on startup — no manual schema migrations needed.

---

## Running the Application

### Backend

```bash
cd backend

# Install dependencies and run
./mvnw spring-boot:run
```

On Windows:

```bat
cd backend
mvnw.cmd spring-boot:run
```

The API will be available at **http://localhost:8080**.

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at **http://localhost:4200**.

---

## Default Ports

| Service  | URL                       |
|----------|---------------------------|
| Backend  | http://localhost:8080     |
| Frontend | http://localhost:4200     |
| MySQL    | localhost:3306            |

---

## Building for Production

**Backend** — creates an executable JAR:

```bash
cd backend
./mvnw clean package -DskipTests
java -jar target/medical-backend-0.0.1-SNAPSHOT.jar
```

**Frontend** — creates an optimized build in `frontend/dist/`:

```bash
cd frontend
npm run build
```