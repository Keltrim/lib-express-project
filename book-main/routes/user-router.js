import { Router } from 'express';

const router = Router();

router.post('/api/user/login', (_, res) => {
    res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

export { router };