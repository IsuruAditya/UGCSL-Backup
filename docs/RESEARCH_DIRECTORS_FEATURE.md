# Research Directors Feature — Implementation Documentation

**Feature**: Research Directors Gallery + Profile Pages + MongoDB Migration  
**Status**: ✅ Production Ready  
**Commits**: 2 (Gallery Build → DB Migration)  
**Pages affected**: `/research`, `/research/directors/:id`

---

## Table of Contents

1. [What Was Built](#what-was-built)
2. [Commit 1 — Gallery & QR Code System](#commit-1--gallery--qr-code-system)
3. [Commit 2 — MongoDB Migration](#commit-2--mongodb-migration)
4. [System Architecture — Before vs After](#system-architecture--before-vs-after)
5. [Data Flow Diagrams](#data-flow-diagrams)
6. [File Change Map](#file-change-map)
7. [API Reference](#api-reference)
8. [Database Schema](#database-schema)
9. [QR Code Flow](#qr-code-flow)
10. [How to Manage Director Data](#how-to-manage-director-data)

---

## What Was Built

The Research page previously had no director information. Two commits added a complete Research Directors system:

- A **5-column photo gallery** on the `/research` page with director cards
- A **QR code modal** — clicking any card shows a scannable QR linking to their profile
- A **full profile page** at `/research/directors/:id` (e.g. `/research/directors/rd-001`)
- A **MongoDB collection** backing all director data, following the same pattern as Programs and News
- A **SPA routing fix** so QR-scanned URLs resolve correctly on Vercel

---

## Commit 1 — Gallery & QR Code System

### What changed

| Area | Change |
|------|--------|
| `Research.tsx` | Rewritten — added `DirectorCard` grid and `DirectorModal` with QR code |
| `Research.css` | Added `.rd-grid`, `.rd-card`, modal styles, QR section, responsive breakpoints |
| `ResearchDirectorDetail.tsx` | New page — full director profile with verified badge, ID strip, meta grid |
| `ResearchDirectorDetail.css` | New CSS — hero, photo column, verified badge, ID strip, meta grid |
| `App.tsx` | Added lazy import + route `/research/directors/:id` |
| `frontend/public/_redirects` | Added `/* /index.html 200` SPA fallback |
| `types/index.ts` | Added `ResearchDirector` interface |
| `en.json` | Director data was hardcoded here at this stage |

### What it looks like

```
/research page
┌─────────────────────────────────────────────────────────┐
│  Research Directors                                      │
│                                                          │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │ 📷   │ │ 📷   │ │ 📷   │ │ 📷   │ │ 📷   │          │
│  │ Name │ │ Name │ │ Name │ │ Name │ │ Name │          │
│  │ Role │ │ Role │ │ Role │ │ Role │ │ Role │          │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │
│  [click any card]                                        │
└─────────────────────────────────────────────────────────┘

Modal (on card click)
┌──────────────────────────────┐
│  Prof. John Smith            │
│  Director of Research        │
│                              │
│  ┌──────────────────────┐    │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │    │
│  │  ▓▓  QR CODE  ▓▓▓  │    │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │    │
│  └──────────────────────┘    │
│  Scan to view full profile   │
└──────────────────────────────┘

/research/directors/rd-001
┌─────────────────────────────────────────────────────────┐
│  ✅ Verified Research Director          ID: RD-001       │
│  ┌────────┐  Prof. John Smith                            │
│  │  📷    │  Director of Research                        │
│  │        │  Faculty of Law and Human Rights             │
│  └────────┘                                              │
│  Specialization | Faculty | Bio                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │  🏛 United Global Campus of Sri Lanka            │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Bug fixed in this commit

**Problem**: Scanning the QR code returned a blank page.

**Root cause**: Two things were missing:
1. `App.tsx` had no route for `/research/directors/:id`
2. Vercel served `index.html` only for known routes — deep links returned 404

**Fix**:
```
App.tsx          → added lazy(ResearchDirectorDetail) + <Route path="/research/directors/:id">
_redirects       → added /* /index.html 200  (SPA fallback, last line)
```

---

## Commit 2 — MongoDB Migration

### What changed

Director data moved from a static JSON file to a live MongoDB collection.

| Area | Change |
|------|--------|
| `backend/src/models/ResearchDirector.ts` | New Mongoose model |
| `backend/src/routes/researchDirectors.ts` | New routes: `GET /` and `GET /:directorId` |
| `backend/src/app.ts` | Registered `/api/research-directors` |
| `backend/src/seed.ts` | Added 10 directors (RD-001 → RD-010) |
| `frontend/src/pages/Research.tsx` | Switched from `en.json` to `useFetch<ResearchDirector[]>` |
| `frontend/src/pages/ResearchDirectorDetail.tsx` | Switched from locale lookup to `useFetch<ResearchDirector>` |
| `frontend/src/locales/en.json` | Removed hardcoded `directors` array |
| `frontend/src/pages/Research.css` | Added `.rd-fetch-error` state |

### Why this matters

Before migration, adding or editing a director required:
1. Edit `en.json`
2. Rebuild frontend
3. Redeploy frontend

After migration:
1. Edit `seed.ts` → run `npm run seed`  
   OR update directly in MongoDB Atlas

No frontend rebuild or redeploy needed for data changes.

---

## System Architecture — Before vs After

### Before (hardcoded)

```
Browser
  │
  ▼
React App
  │
  ├── en.json ◄── director data lives here (static, bundled)
  │
  └── Research.tsx reads from useTranslation() hook
```

### After (database-driven)

```
Browser
  │
  ▼
React App (frontend — Vercel)
  │
  │  GET /api/research-directors
  ▼
Express API (backend — Vercel serverless)
  │
  │  Mongoose query
  ▼
MongoDB Atlas
  │
  └── researchdirectors collection
        RD-001, RD-002, ... RD-010
```

### How it fits into the full system

```
                    ┌─────────────────────────────────────┐
                    │         MongoDB Atlas                │
                    │                                      │
                    │  programs        (existing)          │
                    │  news            (existing)          │
                    │  contacts        (existing)          │
                    │  researchdirectors  ◄── NEW          │
                    └──────────────┬──────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────┐
                    │      Express API (Vercel)            │
                    │                                      │
                    │  /api/programs      (existing)       │
                    │  /api/news          (existing)       │
                    │  /api/contact       (existing)       │
                    │  /api/research-directors  ◄── NEW    │
                    └──────────────┬──────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────┐
                    │      React Frontend (Vercel)         │
                    │                                      │
                    │  /programs          (existing)       │
                    │  /programs/:slug    (existing)       │
                    │  /news              (existing)       │
                    │  /news/:slug        (existing)       │
                    │  /research          (updated)        │
                    │  /research/directors/:id  ◄── NEW    │
                    └─────────────────────────────────────┘
```

---

## Data Flow Diagrams

### Fetching the directors grid (`/research`)

```
User visits /research
      │
      ▼
Research.tsx mounts
      │
      ▼
useFetch<ResearchDirector[]>('/api/research-directors')
      │
      ├── loading=true  →  shows spinner
      │
      ├── error         →  shows .rd-fetch-error message
      │
      └── data          →  renders .rd-grid
                              └── DirectorCard × N
                                    └── onClick → opens DirectorModal
                                                      └── <QRCodeCanvas>
                                                            value="ugcsl.lk/research/directors/rd-001"
```

### Fetching a single director profile (`/research/directors/rd-001`)

```
User scans QR  (or navigates directly)
      │
      ▼
Vercel receives GET /research/directors/rd-001
      │
      ▼  (SPA fallback via _redirects / vercel.json)
      ▼
index.html served → React Router boots
      │
      ▼
Route matches /research/directors/:id
      │
      ▼
ResearchDirectorDetail.tsx mounts
  id = "rd-001" (from useParams)
      │
      ▼
useFetch<ResearchDirector>('/api/research-directors/rd-001')
      │
      ├── loading  →  spinner
      ├── !data    →  "Director not found" state
      └── data     →  full profile card rendered
```

### Backend route resolution

```
GET /api/research-directors
      │
      ▼
researchDirectors.ts  →  ResearchDirector.find().sort({ order: 1 })
      │
      └── returns array, sorted by `order` field

GET /api/research-directors/rd-001
      │
      ▼
researchDirectors.ts  →  ResearchDirector.findOne({ directorId: "RD-001" })
                          (input uppercased before query)
      │
      ├── found   →  200 { success: true, data: {...} }
      └── not found →  404 { success: false, message: "Director not found" }
```

---

## File Change Map

```
Project-UGCS/
│
├── frontend/
│   ├── public/
│   │   └── _redirects                ← MODIFIED  (added SPA fallback)
│   │
│   └── src/
│       ├── App.tsx                   ← MODIFIED  (new route + lazy import)
│       ├── types/
│       │   └── index.ts              ← MODIFIED  (added ResearchDirector interface)
│       ├── locales/
│       │   └── en.json               ← MODIFIED  (removed hardcoded directors array)
│       └── pages/
│           ├── Research.tsx          ← REWRITTEN (useFetch instead of useTranslation)
│           ├── Research.css          ← MODIFIED  (rd-grid, rd-card, modal, error state)
│           ├── ResearchDirectorDetail.tsx  ← NEW
│           └── ResearchDirectorDetail.css  ← NEW
│
└── backend/
    └── src/
        ├── app.ts                    ← MODIFIED  (registered /api/research-directors)
        ├── seed.ts                   ← MODIFIED  (added 10 directors)
        └── models/
        │   └── ResearchDirector.ts   ← NEW
        └── routes/
            └── researchDirectors.ts  ← NEW
```

---

## API Reference

### GET `/api/research-directors`

Returns all directors sorted by `order` field (ascending).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "directorId": "RD-001",
      "name": "Prof. Anura Perera",
      "role": "Director of Research",
      "faculty": "Faculty of Law and Human Rights",
      "specialization": "International Human Rights Law",
      "bio": "...",
      "photo": "https://res.cloudinary.com/...",
      "order": 1
    },
    ...
  ]
}
```

### GET `/api/research-directors/:directorId`

Returns a single director. The `:directorId` param is case-insensitive (`rd-001` and `RD-001` both work).

**Response (found):**
```json
{
  "success": true,
  "data": { ...director object... }
}
```

**Response (not found):**
```json
{
  "success": false,
  "message": "Director not found"
}
```

---

## Database Schema

**Collection**: `researchdirectors`

```typescript
{
  directorId:     String,   // unique, e.g. "RD-001" — used in URLs
  name:           String,   // full name with title
  role:           String,   // e.g. "Director of Research"
  faculty:        String,   // faculty name
  specialization: String,   // research specialization
  bio:            String,   // paragraph bio
  photo:          String,   // Cloudinary URL
  order:          Number,   // display order in grid (1 = first)
  createdAt:      Date,     // auto (timestamps: true)
  updatedAt:      Date      // auto (timestamps: true)
}
```

**Index**: `directorId` is unique — prevents duplicate IDs.

---

## QR Code Flow

```
DirectorCard rendered
      │
      user clicks card
      │
      ▼
DirectorModal opens
      │
      ▼
<QRCodeCanvas> renders with:
  value = "https://ugcsl.lk/research/directors/rd-001"
      │
      user scans with phone
      │
      ▼
Phone browser → GET https://ugcsl.lk/research/directors/rd-001
      │
      ▼
Vercel CDN → no static file matches
      │
      ▼  (vercel.json rewrite: "/(.*)" → "/index.html")
      ▼
index.html served
      │
      ▼
React boots → React Router matches /research/directors/:id
      │
      ▼
ResearchDirectorDetail renders → fetches /api/research-directors/rd-001
      │
      ▼
Full profile page displayed on phone ✅
```

**Why the SPA fallback is critical**: Without `/* /index.html 200` in `_redirects` (Netlify) or the rewrite rule in `vercel.json`, Vercel returns a 404 for any deep link that isn't a static file. The QR code would scan to a blank/error page.

---

## How to Manage Director Data

### Edit existing directors

1. Open `backend/src/seed.ts`
2. Find the director in `seedResearchDirectors` array
3. Edit the fields
4. Run:
   ```bash
   cd backend
   npm run seed
   ```

> ⚠️ `npm run seed` **wipes and re-seeds** all 3 collections (Programs, News, ResearchDirectors). Do not run it if you have live contact form submissions you want to keep — those are in a separate `contacts` collection and are not touched.

### Add a new director

1. Add a new object to `seedResearchDirectors` in `seed.ts`:
   ```typescript
   {
     directorId: "RD-011",
     name: "Dr. New Person",
     role: "Associate Director",
     faculty: "Faculty of Business",
     specialization: "Corporate Governance",
     bio: "...",
     photo: "https://res.cloudinary.com/...",
     order: 11
   }
   ```
2. Run `npm run seed`

### Add a new field to directors

Four places to update:

| File | What to do |
|------|-----------|
| `backend/src/models/ResearchDirector.ts` | Add field to Mongoose schema |
| `backend/src/seed.ts` | Add field value to each director object |
| `frontend/src/types/index.ts` | Add field to `ResearchDirector` interface |
| `frontend/src/pages/ResearchDirectorDetail.tsx` | Display the new field |

---

## Verification

Both commits were verified before pushing:

```
Backend TypeScript check:
  cd backend && npx tsc --noEmit  →  BACKEND_OK ✅

Frontend TypeScript check:
  cd frontend && npx tsc --noEmit  →  FRONTEND_OK ✅

Production build:
  cd frontend && npm run build
  →  166 modules transformed
  →  0 warnings
  →  BUILD_OK ✅
```

---

**Last Updated**: May 2025  
**Feature Owner**: UGCSL Tech Team
