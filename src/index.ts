import express from 'express';
import { errorHandler } from '#middlewares/errorHandler.js';
import helloworldRouter from '#routes/helloworld.js';

const app = express();

app.use(express.json());

// Routes
app.use('/helloworld', helloworldRouter);

// Error Handler
app.use(errorHandler);

export default app;
