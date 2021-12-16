import express from 'express';
import { groupRouter } from './routes/group.routes';

export const router = express.Router();

router.use('/api/group', groupRouter);

