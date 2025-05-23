import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/authRoutes';
import webhookRoutes from './routes/webhookRoutes';
import { initializeSocket } from './controllers/webhookController';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const allowedOrigin = process.env.CORS_ORIGIN?.replace(/\/$/, ''); // remove trailing slash if any

app.use(cors({
  origin: allowedOrigin || 'http://localhost:3001', // fallback for dev
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options('*', cors({
  origin: allowedOrigin || 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.IO Configuration
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    credentials: true
  }
});
initializeSocket(io);
// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/webhook', webhookRoutes);

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server only in dev
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
