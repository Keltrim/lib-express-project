import express from 'express';
import {connect} from "mongoose";
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

async function start(PORT, UrlDB) {
    try {
        await connect(UrlDB);
        app.listen(PORT)
    } catch (e) {
        console.log(e);
    }
}

const PORT = process.env.PORT || 3000;
const UrlDB = process.env.UrlDB || 'mongodb://mongo:27017/db'
start(PORT, UrlDB);