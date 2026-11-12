import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoint base para verificar estado
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * GET /api/features
 * Retorna todas las funcionalidades ordenadas por id ascendente.
 */
app.get('/api/features', async (_req: Request, res: Response) => {
  try {
    const features = await prisma.feature.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(features);
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({ success: false, message: 'Error interno al obtener funcionalidades' });
  }
});

/**
 * GET /api/team
 * Retorna todos los miembros del equipo ordenados por id ascendente.
 */
app.get('/api/team', async (_req: Request, res: Response) => {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { id: 'asc' },
    });
    res.json(team);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ success: false, message: 'Error interno al obtener miembros del equipo' });
  }
});

/**
 * POST /api/contacts
 * Guarda una nueva solicitud B2B en la tabla StoreContact y devuelve { success: true, data }
 */
app.post('/api/contacts', async (req: Request, res: Response) => {
  try {
    const { storeName, representative, email, phone, websiteSocial, message } = req.body;

    // Validación básica de campos requeridos
    if (!storeName || !representative || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Los campos storeName, representative, email y message son obligatorios.',
      });
    }

    const newContact = await prisma.storeContact.create({
      data: {
        storeName: String(storeName).trim(),
        representative: String(representative).trim(),
        email: String(email).trim(),
        phone: phone ? String(phone).trim() : null,
        websiteSocial: websiteSocial ? String(websiteSocial).trim() : null,
        message: String(message).trim(),
      },
    });

    return res.status(201).json({
      success: true,
      data: newContact,
    });
  } catch (error) {
    console.error('Error creating store contact:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno al guardar el contacto comercial',
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`📡 Endpoints disponibles:`);
  console.log(`   - GET  http://localhost:${PORT}/api/features`);
  console.log(`   - GET  http://localhost:${PORT}/api/team`);
  console.log(`   - POST http://localhost:${PORT}/api/contacts`);
});

export default app;
