import express from 'express';
import { router as bookRouter } from './routes/book-router.js';
import { router as userRouter } from './routes/user-router.js';

const app = express();
app.use(express.json());
app.use(bookRouter);
app.use(userRouter);

const PORT = process.env.PORT || 3000
app.listen(PORT)