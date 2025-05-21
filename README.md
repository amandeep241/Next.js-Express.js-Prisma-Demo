# Real-time Messaging Application

A full-stack application built with Next.js and Express.js that enables real-time messaging with user authentication and webhook integration.

## Features

- 🔐 User Authentication (Login/Signup)
- 💬 Real-time Messaging
- 🔗 Webhook Integration
- 👥 Multi-user Support
- 📱 Responsive Design
- 🔒 Protected Routes

## Tech Stack

### Frontend
- Next.js 15.3 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React Hook Form + Zod for form validation
- Axios for API requests
- React Hot Toast for notifications
- WebSocket for real-time updates

### Backend
- Express.js with TypeScript
- Prisma as ORM
- PostgreSQL database
- Socket.IO for real-time communication
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend-express-prisma
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/demo_nextjs_express?schema=public"
JWT_SECRET="your-secret-key"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

4. Setup database:

Create database in case it doesn't exits 
```bash
sudo -i -u postgres
psql
CREATE DATABSE <YOUR_DB_NAME>;
```

Create Prisma schema and run the migrations.
```bash
npx prisma generate
npx prisma migrate dev
```

5. Start server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

## Project Structure

```
demo-next-express/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/            # Next.js pages
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   └── types/         # TypeScript types
│   
└── backend-express-prisma/   # Express.js backend
    ├── src/
    │   ├── controllers/    # Route controllers
    │   ├── middleware/     # Express middleware
    │   ├── routes/        # API routes
    │   └── app.ts         # Main application
    └── prisma/
        └── schema.prisma  # Database schema
```

## Available Routes

### Frontend
- `/` - Landing page
- `/login` - User login
- `/signup` - User registration
- `/dashboard` - Protected message dashboard

### API Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/webhook` - Send message (protected)
- `GET /api/webhook` - Get messages (protected)

## Development

Run both servers in development mode:

```bash
# Terminal 1 - Backend
cd backend-express-prisma
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api


