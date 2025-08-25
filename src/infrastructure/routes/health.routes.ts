import { Router } from 'express';
import { AppDataSource } from '../../config/data-source';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true, message: 'API UP' });
});

router.get('/db-check', async (_req, res) => {
  try {
    // simple ping a la DB
    await AppDataSource.query('SELECT 1');
    res.json({ ok: true, db: 'connected' });
  } catch (e) {
    res.status(500).json({ ok: false, error: 'db not connected' });
  }
});

export default router;
