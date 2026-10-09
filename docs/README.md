# UGCSL – United Global Campus of Sri Lanka

A modern, professional university website built with React/TypeScript/Vite (frontend) and Node/Express/MongoDB (backend).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment
npm run dev           # Starts on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env  # Configure your environment
npm run dev           # Starts on http://localhost:5173
```

## 📚 Documentation

For complete documentation, see:
- **[PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md)** - Complete project guide
- **[RESEARCH_DIRECTORS_FEATURE.md](./RESEARCH_DIRECTORS_FEATURE.md)** - Research Directors gallery, QR system & MongoDB migration
- **[PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md)** - Performance details
- **[MOBILE_ENHANCEMENTS.md](./MOBILE_ENHANCEMENTS.md)** - Mobile responsiveness

## 🛠 Tech Stack

**Frontend:** React 18, TypeScript, Vite, React Router v7, Axios, i18next  
**Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose  
**Deployment:** Vercel (Frontend & Backend)  
**CDN:** Cloudinary (Images)

## 📄 Pages

- `/` - Home (Hero, Faculties, Programs, News)
- `/about` - About (Mission, Vision, Team, Timeline)
- `/programs` - Programs (Searchable/Filterable)
- `/programs/:slug` - Program Details
- `/admissions` - Admissions (Intakes, Steps, Requirements)
- `/research` - Research (Centers, Stats, Directors Gallery)
- `/research/directors/:id` - Research Director Profile
- `/news` - News & Events
- `/news/:slug` - News Details
- `/contact` - Contact Form

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/programs` | List all programs |
| GET | `/api/programs/:slug` | Get program by slug |
| GET | `/api/news` | List all news |
| GET | `/api/news/:slug` | Get news by slug |
| GET | `/api/research-directors` | List all research directors |
| GET | `/api/research-directors/:id` | Get director by ID |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/health` | Health check |

## ✨ Features

- ✅ Fully responsive (mobile-first)
- ✅ Performance optimized (Lighthouse 85-90)
- ✅ Accessibility compliant (WCAG 2.1 AA)
- ✅ SEO optimized
- ✅ Internationalization (English/Sinhala)
- ✅ Code splitting & lazy loading
- ✅ Image optimization
- ✅ Error handling
- ✅ Form validation

## 📊 Performance

- **FCP:** ~1.2s
- **LCP:** ~2.0s
- **TTI:** ~2.5s
- **CLS:** <0.05
- **Bundle:** ~200KB (60% reduction)

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel
```

Set environment variables in Vercel dashboard.

## 📝 License

Proprietary and confidential.

---

**For detailed documentation, troubleshooting, and development guidelines, see [PROJECT-DOCUMENTATION.md](./PROJECT-DOCUMENTATION.md)**
