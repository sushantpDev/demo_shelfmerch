import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectDB();

const app = express();

const ALLOWED_ORIGINS = [
  process.env.CLIENT_URL,           // e.g. https://tollywoodreels.com
  'https://changebag.org',          // Toast frontend on production
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow no-origin requests (Postman, curl, mobile apps)
    if (!origin) return callback(null, true);

    // Allow all localhost ports in development
    if (
      process.env.NODE_ENV !== 'production' &&
      /^http:\/\/localhost:\d+$/.test(origin)
    ) {
      return callback(null, true);
    }

    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`ShelfMerch Backend running on port ${PORT}`);
});
