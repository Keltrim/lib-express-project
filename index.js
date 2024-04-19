import express from 'express';
import { router as bookRouter } from './routes/book-router.js';
import { router as userRouter } from './routes/user-router.js';
import { router as indexRouter } from './routes/index.js';
import errorMiddleware from './middleware/error.js';

const app = express();
app.set('view engine', 'ejs');
app.use('/', indexRouter);
app.use('/books', bookRouter);
app.use(userRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000
app.listen(PORT) 