import express from 'express';
import type { Express } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth';
import categoryRoutes from './routes/category';
import myWordRoutes from './routes/myWord';

dotenv.config();
const app: Express = express();
const PORT = 3001;

// Middleware to parse JSON
app.use(express.json());

// Secret Key
const secretKey = 'vihori3ljvk09nlkc2wwgr1z';

// Parse cookies object
app.use(cookieParser(secretKey));

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: [
      'set-cookie',
      'Content-Type',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
    ],
  })
);

// load routing to handle all requests
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/my-words', myWordRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
