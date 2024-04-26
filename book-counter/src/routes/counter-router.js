import { Router } from 'express';
import {client} from "../config/redis.js";

const router = Router();

router.post('/:bookId/incr', async (req, res) => {
    const { bookId } = req.params;
    const views = await client.incr(bookId);
    res.status(201).json({views});
});

router.get('/:bookId', async (req, res) => {
    const { bookId } = req.params;
    res.json({views: await client.get(bookId)})
});

export { router };