import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import path from 'path';

import connectDB from './config/db.js';

// routes files //
import productRoutes from './routes/productRotues.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
const app = express();
connectDB();

// Middlewares //
app.use(express.json());
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes //
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// if we are in production set the build folder as static folder and send the index.html  //
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res, next) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res, next) => {
    res.send('API is running...');
  });
}

app.use(notFound);
app.use(errorHandler);

// listen //
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is listening in ${process.env.NODE_ENV} mode on port: ${PORT}`
      .yellow.bold
  );
});
