import express from 'express';
import { router as counterRouter } from './routes/counter-router.js';


const app = express();
const PORT = process.env.PORT || 3002;


app.use(express.json());
app.use('/counter', counterRouter);

app.listen(PORT);
