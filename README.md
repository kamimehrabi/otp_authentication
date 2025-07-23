# NestJS OTP Authentication Service

A simple authentication microservice built with NestJS, using Redis for OTP management and MySQL for persistent user storage. The service allows users to request a one‑time passcode (OTP) via their mobile number and verify it to receive a JWT token.

---

## 🎯 Features

* **OTP Request & Verification** via phone number
* **Rate Limiting** to prevent excessive OTP requests within a time window
* **JWT Generation** upon successful verification
* **Persistent User Storage** in MySQL (phone number & registration date)
* **Ephemeral Data** (OTPs, rate-limits) stored in Redis for fast TTL‑based operations
* **Containerized** with Docker & Docker Compose
* **Swagger UI** for interactive API documentation

---

* **NestJS API** handles HTTP requests and orchestrates Redis and MySQL operations.
* **Redis** is chosen for OTP storage and rate limiting because of its in‑memory speed, native TTL support, and atomic operations.
* **MySQL** is chosen for persistent user data (phone number, registration date) to ensure ACID compliance and flexible querying.

---

## 📂 Data Model

### User (MySQL)

| Field         | Type     | Description                        |
| ------------- | -------- | ---------------------------------- |
| `id`          | INT (PK) | Auto‑incremented unique identifier |
| `phoneNumber` | VARCHAR  | User's mobile number               |
| `firstName`   | VARCHAR  | (Optional) user's first name       |
| `lastName`    | VARCHAR  | (Optional) user's last name        |
| `username`    | VARCHAR  | (Optional) display/login name      |
| `createdAt`   | DATETIME | Registration timestamp             |
| `updatedAt`   | DATETIME | Last update timestamp              |

### OTP & Rate Limiting (Redis)

* **Key**: `otp:<phoneNumber>` → **Value**: 6‑digit code, TTL (e.g. 60s)
* **Key**: `otp_count:<phoneNumber>` → **Value**: integer count, TTL window (e.g. 1h)

**Rate Limiting Logic**:

1. Increment `otp_count:<phone>` on each request (set TTL on first use).
2. Reject if count exceeds threshold (e.g. 5 per hour).
3. Store OTP under `otp:<phone>` with 60s TTL.

---

## 🔧 Environment Variables

Copy `.env.example` to `.env` and adjust values:

```dotenv
# Application
PORT=3000
JWT_SECRET=your_jwt_secret

# Redis (OTP + rate limiting)
REDIS_URL=redis://redis:6379
REDIS_PASSWORD=

# MySQL (user storage)
DB_HOST=db
DB_PORT=3306
DB_USER=appuser
DB_PASS=apppass
DB_NAME=myapp
```

---

## 🚀 Local Development

1. **Install dependencies**

   ```bash
   yarn install
   ```

2. **Ensure Redis & MySQL are running locally**

   ```bash
   redis-server --port 6379
   # Ensure MySQL is running on port 3306
   ```

3. **Run NestJS**

   ```bash
   yarn start:dev
   ```

4. **Browse API docs**
   Open your browser at [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 🐳 Docker Compose

Bring up the entire stack (Redis, MySQL, API):

```bash
docker-compose up --build -d
```

* **redis**: OTP & rate limiter
* **db**: persistent MySQL user store
* **app**: NestJS server on port 3000

### Logs

Follow application logs (including OTPs):

```bash
docker-compose logs -f app
```

---

## 📦 API Endpoints

| Method | Path                | Description                          |
| ------ | ------------------- | ------------------------------------ |
| POST   | `/auth/otp/request` | Request an OTP (check server logs)   |
| POST   | `/auth/otp/verify`  | Verify OTP & receive JWT + user data |

### Request OTP

```http
POST /auth/otp/request
Content-Type: application/json

{ "phoneNumber": "+989123456789" }
```

### Verify OTP

```http
POST /auth/otp/verify
Content-Type: application/json

{ "phoneNumber": "+989123456789", "otp": "123456" }
```

**Response (200 OK)**

```json
{
  "token": "<jwt_token>"
}
```

---

## 📖 Rationale for Database Choices

* **Redis**

  * In‑memory storage with low latency
  * Native TTL for automatic expiration of OTPs
  * Atomic operations for rate limiting counters

* **MySQL**

  * Persistent, ACID‑compliant storage for user data
  * Well‑supported relational database for future extensions
  * Easy migrations and schema evolution
