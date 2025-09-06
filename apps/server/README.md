


# 🚀 Setup and Installation Guide

## Prerequisites

Before setting up the Adminify backend, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** package manager
- **PostgreSQL** database server

## Installation

### 1. Clone and Install Dependencies

First, clone the repository and install all dependencies: [1](#0-0) 

```bash
git clone <repository-url>
cd Adminify
pnpm install
```

### 2. Environment Configuration

Create a `.env` file in the `apps/server/` directory with the following required environment variables:

**Required Variables:**

- `DATABASE_URL` - PostgreSQL connection string used by Prisma Client [2](#0-1) 
- `CORS_ORIGIN` - Frontend URL for CORS configuration and trusted origins [3](#0-2) [4](#0-3) 
- `BETTER_AUTH_SECRET`= Use crypto.randomBytes(16).toString("base64url")
- `BETTER_AUTH_URL`=Your server api (for local test http://localhost:3000)

**Example `.env` file:**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/adminify"
CORS_ORIGIN="" # your frontend (for local test http://localhost:3001)
BETTER_AUTH_SECRET="" # use crypto.randomBytes(16).toString("base64url")
BETTER_AUTH_URL="" # your server api (for local test http://localhost:3000)
```

### 3. Database Setup

The project uses PostgreSQL with Prisma ORM and includes authentication models: [5](#0-4) 

**Step 1:** Ensure your PostgreSQL database is running and accessible with the connection string provided in `DATABASE_URL`.

**Step 2:** Generate the Prisma client and push the schema to your database: [6](#0-5) 

```bash
pnpm db:push
```

**Step 3:** (Optional) Open Prisma Studio to view your database:
```bash
pnpm db:studio
```

### 4. Development Server

Start the development server: [7](#0-6) 

**Option 1 - Start all applications:**
```bash
pnpm dev
```

**Option 2 - Start only the backend server:** [8](#0-7) 
```bash
pnpm dev:server
```

The backend API will be available at `http://localhost:3000` [9](#0-8) 

## Available Database Scripts

The project includes several database management scripts: [10](#0-9) 

- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Prisma Studio for database management
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run database migrations

## Project Structure

The backend is located in the `apps/server/` directory within this monorepo structure: [11](#0-10) 

## Authentication Configuration

The backend uses Better Auth with the following configuration: [12](#0-11) 

- PostgreSQL database adapter through Prisma
- Email and password authentication enabled
- Secure cookie configuration for production
- CORS origin validation from environment variables

## Verification

Once setup is complete, you can verify the installation by:

1. **Health Check:** Visit `http://localhost:3000` - should return `{"message": "OK"}`
2. **Database Connection:** Run `pnpm db:studio` to ensure database connectivity
3. **Authentication:** The auth endpoints should be available at `http://localhost:3000/api/auth/`


# 📡 API Endpoint Documentation**

All backend routes are prefixed with `/api`. Responses are in JSON format.

## **🔑 Authentication**
`POST /api/auth/[...all]`

Handles authentication (login, signup, logout, etc.).
* **Body:** depends on auth flow (email/password, etc.).

## **📅 Booking**

### Create Booking
`POST /api/create-booking`

Create a new booking.

**Body Example:**
```json
{
  "data": {
    "roomId": "string",
    "checkIn": "string", 
    "checkOut": "string",
    "guests": "number"
  },
  "user": {
    "id": "string",
    "email": "string",
    "emailVerified": "boolean",
    "name": "string",
    "createdAt": "Date",
    "updatedAt": "Date",
    "image": "string | null | undefined",
    "banned": "boolean | null | undefined", 
    "role": "string | null | undefined",
    "banReason": "string | null | undefined",
    "banExpires": "Date | null | undefined"
  }
}
```

### Get Pending Bookings
`GET /api/get-pending-books`

Retrieve all pending bookings.

### Approve/Reject Booking
`PATCH /api/get-pending-books/[bookingId]`

Approve or reject a specific pending booking.

**Body Example:**
```json
{
  "status": true,
  "user": {
    "id": "string",
    "email": "string",
    "emailVerified": "boolean",
    "name": "string",
    "createdAt": "Date", 
    "updatedAt": "Date",
    "image": "string | null | undefined",
    "banned": "boolean | null | undefined",
    "role": "string | null | undefined",
    "banReason": "string | null | undefined", 
    "banExpires": "Date | null | undefined"
  }
}
```

## **🏠 Guest Houses**

### Get All Guest Houses
`GET /api/get-guest-houses`

Retrieve all guest houses.

### Get Single Guest House  
`GET /api/get-guest-house/[guestHouseId]`

Retrieve details of a specific guest house.

## **🚪 Rooms**

### Get All Rooms
`GET /api/get-rooms`

Retrieve all rooms.

### Get Single Room
`GET /api/get-room/[roomId]`

Retrieve details of a specific room.

## **👤 Guests**

### Get All Guests
`GET /api/get-guests`

Retrieve all guests.

## **👥 Staffs**

### Get All Staff Members
`GET /api/get-staffs`

Retrieve all staff members.

## **📝 Notes**

* The project uses Turborepo for optimized monorepo builds
* Environment variables are loaded automatically via dotenv configuration  
* The backend runs on **port 3000**, while the frontend runs on **port 3001**
* All database operations use Prisma ORM
* CORS is configured to allow credentials and supports `GET`, `POST`, `PATCH`, and `OPTIONS` methods
* All endpoints expect proper authentication where applicable
* Date fields should be in ISO 8601 format
* UUIDs are used for resource identification