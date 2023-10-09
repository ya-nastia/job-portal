import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from 'swagger-jsdoc';

import connectDB from './config/db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';

dotenv.config();

connectDB();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Portal Application',
            description: 'Node Express.js Job Portal Application',
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ],
    },
    apis: ['./routes/*.js'],
};

const spec = swaggerDoc(options);

const app = express();
 
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoutes);

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(spec));

app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode on port ${PORT}`)
});