import { createClient } from 'redis';

const STORAGE_URL = process.env.STORAGE_URL || 'localhost';

const client = await createClient({
    url: `redis://${STORAGE_URL}`
}).on('error', err => console.log('Redis Client Error', err)).connect();

export {client};