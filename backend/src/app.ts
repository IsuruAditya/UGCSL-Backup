import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { randomBytes } from 'crypto';
import contactRoutes from './routes/contact';
import programRoutes from './routes/programs';
import newsRoutes from './routes/news';
import researchDirectorRoutes from './routes/researchDirectors';

const IS_PROD = process.env.NODE_ENV === 'production';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',');

const app = express();

app.use(helmet());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
if (IS_PROD && !process.env.COOKIE_SECRET) console.error('WARNING: COOKIE_SECRET env var is not set in production');
app.use(cookieParser(process.env.COOKIE_SECRET || 'ugcsl-dev-secret'));
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    const forwarded = req.headers['x-forwarded-for']?.toString().split(',')[0].trim();
    return forwarded ?? ipKeyGenerator(req.ip ?? '');
  },
});
app.use('/api', limiter);

function csrfHandler(_req: Request, res: Response) {
  const token = randomBytes(32).toString('hex');
  res.cookie('csrf_token', token, { httpOnly: true, sameSite: IS_PROD ? 'none' : 'strict', secure: IS_PROD });
  res.json({ csrfToken: token });
}

app.get('/api/csrf-token', csrfHandler);

app.use('/api/contact', contactRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/research-directors', researchDirectorRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', campus: 'UGCSL' }));
app.get('/', (_req, res) => res.json({ status: 'ok', campus: 'UGCSL', message: 'API is running' }));

app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

export default app;
