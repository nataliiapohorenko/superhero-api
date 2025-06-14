import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import heroRoutes from './routes/heroRoutes';
import { errorHandler } from './middleware/errorHandler';
import { prisma } from './prisma/client';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://superhero-app-liqt.onrender.com',
  credentials: true,
}));
app.options('*', cors());
app.use(express.json());
app.use('/api/heroes', heroRoutes);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export default app;