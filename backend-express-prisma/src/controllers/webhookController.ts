import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';

const prisma = new PrismaClient();
let io: Server;

export const initializeSocket = (socketIo: Server) => {
  io = socketIo;
};

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const { name, message, userId } = req.body;

    // Store message in database
    const newMessage = await prisma.message.create({
      data: {
        name,
        message,
        userId: parseInt(userId),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    // Emit the new message to all connected clients
    io.emit('new_message', {
      id: newMessage.id,
      name: newMessage.name,
      message: newMessage.message,
      userId: newMessage.userId,
      createdAt: newMessage.createdAt
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    // Get the authenticated user's ID from the request
    const userId = (req as any).userId;

    const messages = await prisma.message.findMany({
      where: {
        userId: parseInt(userId)
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50, // Limit to last 50 messages
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};