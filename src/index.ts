import express from 'express';
import { errorHandler } from '#middlewares/errorHandler.js';
import helloworldRouter from '#routes/helloworld.js';
import cookieSession from 'cookie-session';
import authRouter from '#routes/auth.js';
import cookieParser  from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
)

// Routes
app.use('/helloworld', helloworldRouter);
app.use('/auth', authRouter);

// Error Handler
app.use(errorHandler);

export default app;
