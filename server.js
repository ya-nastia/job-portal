import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';

import connectDB from './config/db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`)
});