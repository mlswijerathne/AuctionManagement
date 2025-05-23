# DreamBid - Auction Management System

DreamBid is a full-stack auction management platform built with ASP.NET Core (backend) and React (frontend). It enables users to create, bid on, and manage online auctions with real-time features and secure payment processing.

---

## 🚀 Overview

DreamBid is designed to facilitate seamless online auctions. The platform supports user registration, auction creation, real-time bidding, secure payments via Stripe, and robust admin management. Its modular architecture ensures scalability, maintainability, and a modern user experience.

---

## ✨ Features

**User Features**
- Secure registration and login (JWT authentication)
- Browse and search live auctions
- Create new auctions with image uploads
- Place bids on active auctions
- View personal bid history
- Manage user profile
- Pay for won auctions via Stripe

**Admin Features**
- Analytics dashboard
- User management (view, update roles)
- Auction moderation and oversight
- System configuration

---

## 🔒 Authentication & Authorization

DreamBid uses JWT tokens for secure authentication. Roles include:

- **Admin**: Manage users, auctions, and system settings
- **User**: Create auctions, bid, manage profile

---

## 🖼️ User Interfaces

| Login Page | 
|-----------|
<p align="center">
  <img  src="Login Page.jpeg" alt="Loginpage" width="600" height="400"/>
</p>

|  Auction Page  |
|-----------|
<p align="center">
  <img  src="Auction page.jpeg" alt="Auctionpage" width="600" height="400"/>
</p>

|  Bid place Page  |
|-----------|
<p align="center">
  <img  src="Place Bid page.jpeg" alt="Bidplacepage" width="600" height="400"/>
</p>

|  User Bid History page  |
|-----------|
<p align="center">
  <img  src="user bid history.jpeg" alt="user bid history" width="600" height="400"/>
</p>

---

## 🛠️ Technology Stack

**Backend**
- ASP.NET Core 8.0
- Entity Framework Core (ORM)
- SQL Server
- ASP.NET Identity (JWT authentication)
- Swagger (API docs)
- Local file storage

**Frontend**
- React 18
- React Router
- React Context API (state management)
- Material-UI (MUI)
- Tailwind CSS & Emotion (styling)
- Axios (HTTP client)
- Joi (form validation)
- Stripe (payment integration)
- Chart.js + React-Chartjs-2 (analytics)
- React Slick (carousel)

---

## 📁 Project Structure

**Backend**
```
backend/
├── Controllers/         # API endpoints
├── Data/                # Database context and configurations
├── DTO/                 # Data Transfer Objects
├── Extensions/          # Extension methods
├── Helpers/             # Helper classes
├── Interfaces/          # Service interfaces
├── Mappers/             # Object mappers
├── Middleware/          # Custom middleware
├── Migrations/          # Database migrations
├── Models/              # Domain models
├── Services/            # Business logic implementation
├── Startups/            # Application startup configurations
├── Utils/               # Utility classes
└── Validation/          # Custom validation attributes
```

**Frontend**
```
frontend/
├── public/              # Static files
└── src/
    ├── assets/          # Images and media
    ├── components/      # Reusable UI components
    ├── contexts/        # React contexts
    ├── dto/             # Data Transfer Objects
    ├── features/        # Feature components
    ├── layout/          # Layout components
    ├── mappers/         # Object mappers
    ├── pages/           # Page components
    ├── services/        # API services
    ├── tests/           # Test files
    ├── utils/           # Utility functions
    └── viewModels/      # View models
```

---

## ⚡ Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js (v16+) & npm
- SQL Server

### Backend Setup
```
# Clone the repository
cd AuctionManagement/backend

# Restore dependencies
dotnet restore

# Apply database migrations
dotnet ef database update

# Run the backend server
dotnet run
```

### Frontend Setup
```
# Navigate to frontend directory
cd AuctionManagement/frontend

# Install dependencies
npm install

# Start development server
npm start
```

---

## 🔗 API Endpoints

**Authentication**
- `POST /api/User/register` — Register a new user
- `POST /api/User/login` — User login

**Auctions**
- `GET /api/Auction` — List all auctions
- `GET /api/Auction/{id}` — Get auction details
- `POST /api/Auction` — Create auction
- `PUT /api/Auction/{id}` — Update auction
- `DELETE /api/Auction/{id}` — Delete auction

**Bidding**
- `GET /api/Bid` — List all bids
- `GET /api/Bid/{auctionId}` — Get bids for an auction
- `POST /api/Bid` — Place a bid

**Payment**
- `POST /api/Payment/create-payment-intent` — Create payment intent
- `GET /api/Payment/payment-status/{id}` — Check payment status

**Admin**
- `GET /api/Admin/users` — List users
- `GET /api/Admin/auctions` — List auctions
- `PUT /api/Admin/user/{id}` — Update user role


