import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './config/db.js';

// routes files //
import productRoutes from './routes/productRotues.js';

dotenv.config();
const app = express();
connectDB();

// Middlewares //
app.use(express.json());
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Routes //
app.use('/api/products', productRoutes);

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
