import { Router, Request, Response } from 'express';
import ResearchDirector from '../models/ResearchDirector';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const directors = await ResearchDirector.find().sort({ order: 1 });
    res.json(directors);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:directorId', async (req: Request, res: Response) => {
  try {
    const director = await ResearchDirector.findOne({
      directorId: (req.params.directorId as string).toUpperCase(),
    });
    if (!director) return res.status(404).json({ message: 'Director not found' });
    res.json(director);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
