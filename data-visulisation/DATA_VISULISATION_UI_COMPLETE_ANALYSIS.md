# GemaMat Data Visualisation UI — Complete Technical Analysis

**Project folder:** `data-visulisation/` (note: British spelling with typo — "visulisation" not "visualisation")  
**Application name:** **GemaMat**  
**Purpose:** Interactive web dashboard for visualizing ALD/CVD (Atomic Layer Deposition / Chemical Vapor Deposition) thin-film deposition data extracted from research papers, combined with an agentic RAG chat assistant.  
**Parent project:** ALD-LLaMat (MSE496 Undergraduate Project, UGP-1)  
**Document generated for:** Research paper UI section / ChatGPT context upload

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure & File Inventory](#3-project-structure--file-inventory)
4. [Architecture & Data Flow](#4-architecture--data-flow)
5. [Routing & Pages](#5-routing--pages)
6. [Component Hierarchy](#6-component-hierarchy)
7. [State Management](#7-state-management)
8. [Domain Data Model (PaperData Schema)](#8-domain-data-model-paperdata-schema)
9. [Data Layer — MongoDB & data-fetcher.ts](#9-data-layer--mongodb--data-fetcherts)
10. [API Routes](#10-api-routes)
11. [UI Navigation Tiers (Dashboard)](#11-ui-navigation-tiers-dashboard)
12. [Visualizations & Charts (Complete Inventory)](#12-visualizations--charts-complete-inventory)
13. [Design System — Colors, Typography, CSS](#13-design-system--colors-typography-css)
14. [Chat Assistant (RAG Integration)](#14-chat-assistant-rag-integration)
15. [Utility Scripts (seed.js, upload-pdfs.js)](#15-utility-scripts-seedjs-upload-pdfsjs)
16. [Configuration Files](#16-configuration-files)
17. [Environment Variables](#17-environment-variables)
18. [Dependencies (package.json)](#18-dependencies-packagejson)
19. [Responsive Layout & Split-Pane Design](#19-responsive-layout--split-pane-design)
20. [Accessibility & UX Patterns](#20-accessibility--ux-patterns)
21. [Known Limitations, Dead Code & Inconsistencies](#21-known-limitations-dead-code--inconsistencies)
22. [Setup & Run Instructions](#22-setup--run-instructions)
23. [Research Paper Talking Points (UI Section)](#23-research-paper-talking-points-ui-section)

---

## 1. Executive Summary

GemaMat is a **single-page Next.js 16 application** that presents extracted ALD/CVD research paper data through a **three-tier navigation model**:

1. **Materials Library** — browse materials grouped by chemical formula
2. **Material Archive** — aggregate analytics + paper list for one material
3. **Paper Detail** — full structured view of one paper with charts and evidence

The UI uses a **split-pane layout**:
- **Left pane:** GemaMat RAG chat assistant (400–450px on desktop, 45vh on mobile)
- **Right pane:** Dashboard visualizations (flex-1, scrollable)

Data is stored in **MongoDB** (`ALD_Data.Papers`), seeded from JSON files in `../qwen_extracted_info/`. The initial catalog is **server-rendered**; full paper evidence is **lazy-loaded** via REST when a user opens a paper.

The chat connects to an external **FastAPI agentic RAG pipeline** on port 8000, displaying answers, retrieval sources, planner/executor/validation agent traces, and diagnostics.

**Branding:** "GemaMat" / "ALD-LLaMat Data Visualization" in footer  
**Tagline in chat:** "Atomic Layer Deposition (ALD) Intelligence"

---

## 2. Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 16.2.2 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 (via `@tailwindcss/postcss`) |
| Custom CSS | globals.css | Glassmorphism, animations, design tokens |
| Charts | Recharts | 3.8.1 |
| Custom SVG | ChemistrySankey component | Sankey-style flow diagram |
| Database | MongoDB Node driver | 7.1.1 |
| Blob storage | @vercel/blob | 2.3.3 (PDF upload script) |
| Chat backend | External FastAPI RAG | Default `http://127.0.0.1:8000` |
| Linting | ESLint + eslint-config-next | 9 / 16.2.2 |
| Fonts | Google Fonts | Inter (300–900), JetBrains Mono (400–600) |

**Declared but unused in source code:**
- `react-markdown` (^10.1.0)
- `remark-gfm` (^4.0.1)

Chat uses a custom `FormattedAnswer` component instead of react-markdown.

---

## 3. Project Structure & File Inventory

### 3.1 Source files (excluding node_modules, .next)

| # | Path | Lines | Role |
|---|------|-------|------|
| 1 | `app/layout.tsx` | 24 | Root HTML layout, metadata |
| 2 | `app/page.tsx` | 9 | Home page — SSR catalog fetch |
| 3 | `app/globals.css` | 411 | Global styles, design tokens, Tailwind import |
| 4 | `app/components/ClientShell.tsx` | 76 | Client orchestrator, split-pane, lazy loading |
| 5 | `app/components/Dashboard.tsx` | 1772 | Main visualization UI (largest file) |
| 6 | `app/components/ChatAssistant.tsx` | 719 | RAG chat sidebar |
| 7 | `app/lib/data-fetcher.ts` | 496 | MongoDB access, types, normalization |
| 8 | `app/lib/data.ts` | 177 | **Legacy/unused** static sample data |
| 9 | `app/api/papers/[id]/route.ts` | 25 | GET full paper JSON |
| 10 | `app/api/pdf/[id]/route.ts` | 21 | GET redirect to PDF URL |
| 11 | `seed.js` | 321 | MongoDB seed from extracted JSON |
| 12 | `upload-pdfs.js` | 55 | Upload PDFs to Vercel Blob |
| 13 | `package.json` | 32 | NPM manifest |
| 14 | `tsconfig.json` | 34 | TypeScript config |
| 15 | `next.config.ts` | 7 | Next.js config (empty/default) |
| 16 | `postcss.config.mjs` | — | PostCSS + Tailwind v4 |
| 17 | `eslint.config.mjs` | 21 | ESLint flat config |
| 18 | `.gitignore` | — | Ignores node_modules, .next, .env* |
| 19 | `README.md` | 37 | Generic create-next-app README |
| 20 | `AGENTS.md` | 6 | Agent rules for Next.js 16 |
| 21 | `CLAUDE.md` | 1 | Points to AGENTS.md |
| 22 | `public/file.svg` | — | Default Next.js icon (unused) |
| 23 | `public/globe.svg` | — | Default Next.js icon (unused) |
| 24 | `public/next.svg` | — | Next.js logo (unused) |
| 25 | `public/vercel.svg` | — | Vercel logo (unused) |
| 26 | `public/window.svg` | — | Default Next.js icon (unused) |

**Total core UI source:** ~4,027 lines across components, lib, CSS, and scripts.

### 3.2 No additional routes

There are **no**:
- Dynamic page routes (`/materials/[id]`, etc.)
- Loading or error boundary files
- Middleware
- Custom favicon in `public/` (may be build-generated)

All navigation is **client-side state** inside `Dashboard`.

---

## 4. Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         BROWSER (Client)                                 │
│  ┌──────────────────────┐    ┌──────────────────────────────────────┐  │
│  │   ChatAssistant      │    │           Dashboard                   │  │
│  │   POST /api/chat     │    │   Materials → Archive → Paper Detail  │  │
│  │   (external RAG)     │    │   Recharts + custom SVG Sankey        │  │
│  └──────────┬───────────┘    └──────────────────┬───────────────────┘  │
│             │                                    │                        │
│             │         ClientShell (orchestrator) │                        │
│             │         - papers state             │                        │
│             │         - selectedPaperIndex       │                        │
│             │         - lazy detail fetch        │                        │
└─────────────┼────────────────────────────────────┼────────────────────────┘
              │                                    │
              ▼                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      NEXT.JS SERVER                                      │
│  page.tsx ──► getCatalogPapers() ──► MongoDB (catalog projection)       │
│  GET /api/papers/[id] ──► getPaperById() ──► MongoDB (full + evidence)  │
│  GET /api/pdf/[id] ──► redirect to paper.pdf_url                        │
└─────────────────────────────────────────────────────────────────────────┘
              │                                    │
              ▼                                    ▼
┌──────────────────────────┐    ┌─────────────────────────────────────────┐
│ MongoDB Atlas            │    │ External: FastAPI RAG (port 8000)        │
│ DB: ALD_Data             │    │ POST /api/chat                           │
│ Collection: Papers       │    │ Vercel Blob (PDF URLs via upload-pdfs.js)│
└──────────────────────────┘    └─────────────────────────────────────────┘
              ▲
              │ seed.js reads ../qwen_extracted_info/{paperId}/*.json
```

### 4.1 Initial page load (SSR)

1. User visits `/`
2. `app/page.tsx` (async Server Component) calls `getCatalogPapers()`
3. MongoDB returns all papers with **catalog projection** (evidence stripped, summary truncated to 700 chars)
4. `ClientShell` receives `initialPapers` as props
5. React hydrates client components

### 4.2 Lazy paper detail load

1. User selects a paper → `selectedPaperIndex` changes in `ClientShell`
2. `useEffect` checks if paper ID is in `loadedPaperIds` Set
3. If not loaded: `fetch(/api/papers/{id})` with `AbortController`
4. Response merges into `papers` array; evidence fields populated (truncated to 6000 chars)
5. Paper ID added to `loadedPaperIds`

### 4.3 Chat flow

1. User sends message → `POST {RAG_API_URL}/api/chat`
2. Body: `{ query, conversation (last 8 messages), scope_paper_id }`
3. If a paper is selected in dashboard, `scope_paper_id` scopes RAG retrieval
4. Response includes: answer, sources, diagnostics, plan, execution, validation

### 4.4 Data pipeline (upstream)

```
Research PDFs (Web Scrapper/ald_papers_naming/)
    ↓
Information extraction (qwen_extracted_info/{paperId}/)
    ↓ 8 JSON files per paper
seed.js → MongoDB ALD_Data.Papers
    ↓
upload-pdfs.js → Vercel Blob + pdf_url in MongoDB
    ↓
data-fetcher.ts → Next.js UI
```

---

## 5. Routing & Pages

| Route | Type | Handler | Purpose |
|-------|------|---------|---------|
| `/` | Page (SSR) | `app/page.tsx` | Main application entry |
| `/api/papers/[id]` | API GET | `app/api/papers/[id]/route.ts` | Full paper JSON with evidence |
| `/api/pdf/[id]` | API GET | `app/api/pdf/[id]/route.ts` | 302 redirect to `pdf_url` |

**Metadata** (`app/layout.tsx`):
- `title`: "GemaMat"
- `description`: "Interactive visualization of ALD and CVD thin film deposition data extracted from research papers"

---

## 6. Component Hierarchy

```
RootLayout (app/layout.tsx)
├── <html lang="en" className="h-full antialiased">
└── <body className="min-h-full flex flex-col">
    └── Home (app/page.tsx) — Server Component
        └── ClientShell — "use client"
            ├── ChatAssistant — left/bottom pane
            │   ├── GeminiSparkle (avatar SVG)
            │   ├── FormattedAnswer
            │   ├── SourceCard
            │   ├── PlannerCard
            │   ├── ExecutionTimeline
            │   └── ValidationCard
            └── Dashboard — right/top pane
                ├── Evidence
                ├── DataField
                ├── Section
                ├── SearchField
                ├── CountBarChart
                ├── TemperaturePhaseChart
                ├── ChemistrySankey (custom SVG)
                ├── InfoHint
                ├── MaterialInsights
                └── EmptyInsight
```

### 6.1 ClientShell.tsx (76 lines)

**Role:** Top-level client wrapper; owns shared paper state and lazy loading.

**Props:**
- `initialPapers: PaperData[]`

**State:**
| State | Type | Purpose |
|-------|------|---------|
| `papers` | `PaperData[]` | Full catalog, merged with lazy-loaded details |
| `selectedPaperIndex` | `number \| null` | Currently viewed paper index in `papers` array |
| `loadedPaperIds` | `Set<string>` | Tracks which papers have full detail fetched |

**Layout classes:**
- `main`: `flex flex-col md:flex-row h-[100dvh] overflow-hidden bg-black`
- Chat pane: `w-full md:w-[400px] xl:w-[450px] h-[45vh] md:h-full border-t md:border-t-0 md:border-r border-white/5 flex-shrink-0 bg-white/[0.02] backdrop-blur-[40px] order-last md:order-first`
- Dashboard pane: `flex-1 h-[55vh] md:h-full overflow-y-auto custom-scrollbar order-first md:order-last`

**Mobile behavior:** Dashboard on top (55vh), chat on bottom (45vh). Desktop: chat left, dashboard right.

---

## 7. State Management

**No global state library** (no Redux, Zustand, Context API). All state is local React `useState` / `useEffect`.

### 7.1 ClientShell state
- Paper list and selection
- Lazy load tracking

### 7.2 Dashboard state
| State | Type | Purpose |
|-------|------|---------|
| `pdfOpenPaperIndex` | `number \| null` | PDF iframe toggle (button commented out — inactive) |
| `selectedMaterial` | `string \| null` | Current material formula filter |
| `materialSearch` | `string` | Search query for materials library |

### 7.3 ChatAssistant state
| State | Type | Purpose |
|-------|------|---------|
| `messages` | `Message[]` | Chat history |
| `inputValue` | `string` | Input field text |
| `isTyping` | `boolean` | Loading indicator during API call |
| `messagesEndRef` | `useRef` | Auto-scroll anchor |

---

## 8. Domain Data Model (PaperData Schema)

Each paper document represents structured extraction from one research paper.

```typescript
PaperData {
  id: string                    // Directory name / paper identifier
  label: string                 // e.g. "PAPER1 — TiO2 via ALD"
  pdf_url?: string              // Vercel Blob URL (optional)

  summary: {
    target_material: string
    process_type: string        // e.g. "ALD", "LPCVD"
    main_precursors: string[]
    temperature_range: string
    summary: string             // Narrative summary
    evidence: string            // Source text excerpt
  }

  target_material: {
    target_material: {
      chemical_formula: string  // e.g. "TiO2", "NiO"
      material_name: string
      material_class: string    // e.g. "Oxide"
    }
    evidence: string
  }

  substrate_info: {
    substrate_material: string
    substrate_orientation: string
    pretreatment: string
    surface_functionalization: string
    evidence: string
  }

  deposition_conditions: {
    deposition_temperature_C: number | null
    pressure: string | null
    precursor_pulse_time_s: number | null
    coreactant_pulse_time_s: number | null
    purge_time_s: number | null
    number_of_cycles: number | null
    reactor_type: string | null
    evidence: string
  }

  precursor_coreactant: {
    precursors: Chemical[]      // { abbreviation, full_name }
    coreactants: Chemical[]
    purge_gas: Chemical[]
    carrier_gas: Chemical[]
    evidence: string
  }

  reaction_conditions: {
    reaction_equations: string[]
    surface_mechanism_description: string
    intermediate_species: string[]
    evidence: string
  }

  film_properties: {
    film_thickness_nm: number | null
    density_g_cm3: number | null
    refractive_index: number | null
    surface_roughness_nm: number | null
    crystal_phase: string | null
    evidence: string
  }

  characterization: {
    characterization_methods: string[]
    evidence: string
  }
}

Chemical {
  abbreviation: string
  full_name: string
}
```

### 8.1 Extraction JSON files (per paper, used by seed.js)

Each paper folder in `../qwen_extracted_info/{paperId}/` contains:
1. `summary.json`
2. `target_material.json`
3. `substrate_info.json`
4. `deposition_conditions.json`
5. `precursor_coreactant.json`
6. `reaction_conditions.json`
7. `film_properties.json`
8. `characterization.json`

---

## 9. Data Layer — MongoDB & data-fetcher.ts

### 9.1 Connection

- **URI:** `process.env.MONGODB_URI`
- **Database:** `ALD_Data`
- **Collection:** `Papers`
- **Connection caching:** Module-level `cachedClient` and `cachedDb` (singleton pattern)
- **Sort:** `{ id: 1 }` with `{ locale: "en", numericOrdering: true }` collation

### 9.2 Catalog vs Detail modes

| Mode | Function | Evidence | Summary |
|------|----------|----------|---------|
| Catalog | `getCatalogPapers()` | Stripped (empty string) | Truncated to 700 chars |
| Detail | `getPaperById(id)` | Truncated to 6000 chars per section | Full |

### 9.3 Catalog projection fields

MongoDB projection explicitly includes only needed fields (excludes `_id`, excludes all `evidence` fields from DB read for catalog — then zeroed in `toCatalogPaper`).

### 9.4 Normalization helpers

- `asString`, `asStringArray`, `asRecord`, `asNullableString`, `asNullableNumber`
- `normalizeChemicalList` — handles string or object chemical entries
- `normalizePaper` — full document normalization with `DEFAULT_PAPER` fallbacks
- `truncateText` — appends `...` when exceeding max length

### 9.3 Error handling

- Missing `MONGODB_URI`: logs error, returns `[]` or `null`
- DB errors: logged to console, graceful empty return

---

## 10. API Routes

### 10.1 GET `/api/papers/[id]`

**File:** `app/api/papers/[id]/route.ts`

- Uses Next.js 16 async params: `context.params` is a `Promise`
- Validates `id` is non-empty string → 400 if invalid
- Calls `getPaperById(id)` → 404 if not found
- Returns JSON with header: `Cache-Control: private, max-age=300` (5 min client cache)

### 10.2 GET `/api/pdf/[id]`

**File:** `app/api/pdf/[id]/route.ts`

- Looks up paper by ID
- If `pdf_url` exists → `NextResponse.redirect(paper.pdf_url)`
- Else → 404 plain text: `PDF not found: {id}.pdf`

**Note:** PDF view button in Dashboard is **commented out**. Iframe path exists (`showPdf` state) but is unreachable in normal UI because the toggle button is disabled.

---

## 11. UI Navigation Tiers (Dashboard)

### Tier 0: Empty state
- Shown when `papers.length === 0`
- Glass card: "No Data Found" / "Could not find any paper data in the extracted_data directory."

### Tier 1: Materials Library (`selectedPaperIndex === null`, `selectedMaterial === null`)

**Header:**
- Title: "Materials **Library**" (Library in teal)
- Subtitle: "Select a material system to browse its processed knowledge."

**Search:**
- `SearchField` component
- Placeholder: "Search by formula, material name, class, or process type"
- Filters by: formula, name, class, process types
- Results label: "{filtered} of {total} materials"

**Material grouping logic:**
- Groups papers by `getMaterialFormula(paper)` → `target_material.target_material.chemical_formula` or "Others"
- Aggregates: formula, name, class, paper count, unique process types
- Sorted by paper count descending

**Material cards:**
- Glass card, clickable
- Shows: paper count badge, chemical formula (large), material name (italic), material class
- Hover: translate-y -4px, border teal, formula → cyan
- Staggered `animate-in` with 100ms delay per card

### Tier 2: Material Archive (`selectedMaterial` set, `selectedPaperIndex === null`)

**Header:**
- Back button → "Back to Materials"
- Title: `{formula} Archive`
- Badge: "Found {N} contributions"

**MaterialInsights panel** — see Section 12 (aggregate charts)

**Paper cards grid:**
- Filtered to papers matching selected material formula
- Shows: paper ID badge, method count, title (from label after " — "), summary excerpt (2 lines), process type badge, temperature badge
- Click → opens Tier 3 (paper detail)

### Tier 3: Paper Detail (`selectedPaperIndex !== null`)

**Top strip:**
- Back button → "Back to {material}" or "Back to Catalog"
- Summary metric cards (2×2 or 4-col grid): Target Material, Process Type, Temperature Range, Characterization Methods count
- Filters out N/A/null values

**Content sections** (each wrapped in `Section` glass card with staggered animation delays):

| Section | Delay (ms) | Content |
|---------|------------|---------|
| Paper Summary | 100 | Narrative, main precursor badges, evidence toggle |
| Target Material | 200 | Large gradient formula, name/class badges, evidence |
| Substrate Information | 300 | stat-grid: material, orientation, pretreatment, functionalization |
| Deposition Conditions | 400 | stat-grid + Process Overview Radar chart + evidence |
| Precursors & Coreactants | 500 | Grid of precursor/coreactant/purge/carrier gas badges |
| Reaction Conditions | 600 | Mechanism, equations (monospace code blocks), intermediate species |
| Film Properties | 700 | stat-grid + Data Completeness pie chart |
| Characterization Methods | 800 | Method badges + Methods Inventory bar chart |

**Footer:**
- "ALD-LLaMat Data Visualization • {N} characterization methods tracked across {M} papers"

---

## 12. Visualizations & Charts (Complete Inventory)

### 12.1 Chart color palette (`chartColors` constant)

```
#5eead4 (teal)
#c4b5fd (purple)
#67e8f9 (cyan)
#fbcfe8 (pink)
#fde68a (amber)
#6ee7b7 (emerald)
#fda4af (rose)
#818cf8 (indigo)
#38bdf8 (sky)
#c084fc (violet)
```

### 12.2 Material-level charts (MaterialInsights)

| Chart Name | Library | Type | Data Source | Color |
|------------|---------|------|-------------|-------|
| ALD Chemistry Flow | Custom SVG | Sankey-style | Precursor → Coreactant → Crystal Phase edges | Teal (#5eead4), Rose (#fda4af), Purple (#c4b5fd) |
| Temperature Distribution | Recharts | Vertical BarChart | 50°C bins from deposition_temperature_C | Amber (#fde68a) |
| Common Characterization | Recharts | Horizontal BarChart (CountBarChart) | Method counts (abbreviation from parentheses) | Cyan (#67e8f9) |
| Temperature vs Crystal Phase | Recharts | Stacked BarChart | Temp bins × phase segments | chartColors rotation |
| Precursor Count Per Paper | Recharts | Horizontal BarChart | Distribution of precursor counts | Teal (#5eead4) |
| Coreactant Count Per Paper | Recharts | Horizontal BarChart | Distribution of coreactant counts | Purple (#c4b5fd) |
| Crystal Phases | Recharts | Donut PieChart | Phase frequency (innerRadius 48, outerRadius 86) | chartColors |
| Common Precursors | Recharts | Horizontal BarChart | Top 8 normalized precursors | Emerald (#6ee7b7) |
| Common Coreactants | Recharts | Horizontal BarChart | Top 8 normalized coreactants | Rose (#fda4af) |

**MaterialInsights stat strip:**
- Papers count, Avg. temperature, Reported temps, Methods, Precursors, Coreactants

### 12.3 Paper-level charts

| Chart Name | Library | Type | Data |
|------------|---------|------|------|
| Process Overview Radar | Recharts | RadarChart | Temp (0–500), Precursors (count×30), Coreactants (count×30), Char. Methods (count×10), Gases (count×30) |
| Data Completeness | Recharts | Donut PieChart | Reported vs Not Reported film properties (5 fields) |
| Methods Inventory | Recharts | Horizontal BarChart | One bar per characterization method |

### 12.4 ChemistrySankey (custom SVG) — detailed implementation

**Purpose:** Visualize flow from precursors through coreactants to crystal phases across all papers for a material.

**Algorithm (`buildChemistrySankey`):**
1. For each paper: extract unique precursors, coreactants, phase (via `getChemicalLabel`, `getPhaseLabel`)
2. Skip papers missing precursors or coreactants
3. Build edge counts: precursor→coreactant, coreactant→phase
4. Take top 6 nodes per column
5. Filter edges to visible nodes

**SVG layout:**
- Width: 900px, min-width 820px (horizontal scroll on small screens)
- Height: dynamic, `max(300, maxRows * 54 + 72)`
- Three columns: Precursor (x=24), Coreactant (x=384), Crystal Phase (x=744)
- Node: 132×34px rounded rects with count labels
- Edges: cubic Bézier curves, stroke width proportional to count (3–18px), 28% opacity
- Colors: precursor teal, coreactant rose, phase purple

**Chemical normalization (`CHEMICAL_ALIASES`):**
Maps variants to canonical labels for H2O, O3, O2, O2 plasma, H2O2, NH3, N2, Ar, TMA, TDMAT, TiCl4, TTIP, DEZ, ZnO.

**Phase normalization (`getPhaseLabel`):**
Maps to: Amorphous, Anatase, Rutile, Brookite, Gamma, Alpha, Crystalline, or raw normalized string.

### 12.5 Recharts shared styling

- Tooltip: dark background `#0a0a0a`, border `rgba(255,255,255,0.15)`, radius 8px
- Axis ticks: `#94a3b8`, fontSize 11–12
- Grid/axis lines hidden or low opacity
- Empty states: `EmptyInsight` with dashed border, "No reported data" messages

### 12.6 Evidence UI

- Collapsible toggle button with chevron rotation
- Hidden when evidence is empty, "N/A", "No evidence found", or "null"
- Max-height animation (0 → 500px) with opacity transition
- Loaded only on paper detail fetch (lazy)

---

## 13. Design System — Colors, Typography, CSS

### 13.1 CSS custom properties (`:root` in globals.css)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#000000` | Page background |
| `--bg-secondary` | `#0a0a0a` | Secondary surfaces |
| `--bg-card` | `rgba(10,10,10,0.6)` | Glass cards |
| `--bg-card-hover` | `rgba(18,18,18,0.8)` | Card hover |
| `--glass-border` | `rgba(255,255,255,0.06)` | Borders |
| `--glass-shadow` | `rgba(0,0,0,0.7)` | Shadows |
| `--text-primary` | `#f0f0f0` | Body text |
| `--text-secondary` | `#a3a3a3` | Secondary text |
| `--text-muted` | `#737373` | Labels, hints |
| `--accent-teal` | `#5eead4` | Primary accent |
| `--accent-teal-dim` | `rgba(94,234,212,0.10)` | Teal backgrounds |
| `--accent-cyan` | `#67e8f9` | Charts, badges |
| `--accent-purple` | `#c4b5fd` | Secondary accent |
| `--accent-purple-dim` | `rgba(196,181,253,0.10)` | Purple backgrounds |
| `--accent-pink` | `#fbcfe8` | Chart palette |
| `--accent-amber` | `#fde68a` | Temperature metrics |
| `--accent-emerald` | `#6ee7b7` | Stats |
| `--accent-rose` | `#fda4af` | Coreactants, Sankey |
| `--gradient-hero` | radial gradient | Hero backgrounds |
| `--gradient-card` | linear gradient 135deg | Card overlays |
| `--gradient-accent` | `#5eead4` → `#c4b5fd` | Buttons, formulas, user chat bubbles |
| `--ios-blur` | `blur(40px)` | Backdrop filter |
| `--ios-radius` | `24px` | Card border radius |

### 13.2 Typography

- **Primary font:** Inter (Google Fonts, weights 300–900)
- **Monospace:** JetBrains Mono (formulas, data values, reaction equations)
- **Body letter-spacing:** `-0.01em`
- **Uppercase labels:** `0.05em–0.2em` tracking
- **Formula class (`.formula`):** 2rem (1.5rem mobile), gradient text, drop-shadow

**Note:** `@theme inline` references `--font-geist-sans` and `--font-geist-mono` but Geist is **not** loaded in `layout.tsx`. README still mentions Geist from create-next-app template.

### 13.3 Key CSS classes

| Class | Purpose |
|-------|---------|
| `.glass-card` | Glassmorphism card with blur, border, hover lift |
| `.hero-bg` | Radial gradient background with pseudo-element glow |
| `.formula` | Gradient chemical formula text |
| `.badge`, `.badge-teal`, `.badge-purple` | Pill badges |
| `.section-title` | Section headers with gradient accent bar |
| `.evidence-toggle`, `.evidence-text` | Collapsible evidence |
| `.data-value`, `.data-label`, `.data-null` | Stat display |
| `.stat-grid`, `.stat-card` | Responsive metric grids |
| `.chart-container`, `.chart-empty` | Chart wrappers |
| `.chemistry-sankey` | Horizontal scroll for Sankey SVG |
| `.info-hint-*` | "i" button popover for chart help |
| `.animate-in` | fadeInUp entrance animation |
| `.shimmer-line` | Decorative gradient divider |
| `.custom-scrollbar` | 4px thin scrollbar |

### 13.4 Animations

| Name | Effect |
|------|--------|
| `float` | Particle float + rotate |
| `pulse-glow` | Teal box-shadow pulse |
| `fadeInUp` | Opacity 0→1, translateY 20px→0 |
| `shimmer` | Horizontal gradient sweep |

### 13.5 Responsive breakpoint

- `@media (max-width: 768px)`: smaller formula, 2-column stat grid

### 13.6 CSS inconsistency

Dashboard uses `badge-amber`, `badge-cyan`, `badge-rose` classes but **only** `.badge-teal` and `.badge-purple` are defined in CSS. Amber/cyan/rose badges fall back to base `.badge` styling only (no color-specific background).

---

## 14. Chat Assistant (RAG Integration)

### 14.1 Branding & header

- Title: **GemaMat**
- Subtitle: "Atomic Layer Deposition (ALD) Intelligence" (teal, uppercase, tracked)
- Target Context indicator: green pulsing dot when paper scoped, shows paper ID or "Global Catalog Scope"
- Reset button clears paper selection

### 14.2 Quick actions (shown when only welcome message exists)

1. "What are some common methods to deposit NiO?"
2. "Mention the deposition conditions for MoSe2"
3. "Describe the common characterization techniques used"
4. "What are the precursors and coreactants used in deposition of NiO?"

### 14.3 API contract

**Endpoint:** `POST ${NEXT_PUBLIC_RAG_API_URL}/api/chat`  
**Default URL:** `http://127.0.0.1:8000`

**Request body:**
```json
{
  "query": "user question",
  "conversation": [{"role": "user"|"assistant", "content": "..."}],  // last 8 messages
  "scope_paper_id": "paper_id or null"
}
```

**Response (`ChatApiResponse`):**
- `answer: string`
- `sources: SourceChunk[]`
- `diagnostics: RetrievalDiagnostics`
- `plan?: AgentPlan | null`
- `execution?: ExecutionArtifact[]`
- `validation?: ValidationReport | null`

### 14.4 Source chunk fields

- `source_id`, `source_type` ("rag" | "wikipedia")
- `title`, `url`, `paper_id`, `target_material`, `process_type`
- `excerpt`, `retrieval_score`, `rerank_score`

### 14.5 Diagnostics pills displayed

- HyDE Active / Direct Query
- Planner LLM / Fallback Plan
- Scope: {scope string}
- {reranked}/{retrieved} kept
- Validation {pass|warning|fail}

### 14.6 Agent execution UI

**PlannerCard (Strategic Agent):**
- planner_summary, analysis, steps with step_id, step_type (analysis|tool), title, objective, tool_name

**ExecutionTimeline (Executor):**
- ReWOO-style trace
- step status: completed | failed | skipped

**ValidationCard:**
- factual_grounding, logical_consistency, cross_verification
- issues list, verdict, summary

### 14.7 Message styling

- **User messages:** Gradient bubble (`var(--gradient-accent)`), right-aligned, rounded-br-lg
- **Assistant messages:** Plain text with GeminiSparkle avatar, left-aligned
- **Error messages:** Rose border/background with setup instructions for uvicorn

### 14.8 FormattedAnswer (custom markdown-lite)

Parses line-by-line:
- `- ` or `* ` → bullet list
- Lines ending with `:` and length < 40 → uppercase heading
- Otherwise → paragraph

Does **not** use react-markdown despite it being in package.json.

### 14.9 Typing indicator

Three bouncing dots (teal, violet, cyan) with 0/150/300ms animation delays.

---

## 15. Utility Scripts (seed.js, upload-pdfs.js)

### 15.1 seed.js (321 lines)

**Purpose:** Migrate extracted JSON → MongoDB

**Steps:**
1. Connect to MongoDB via `MONGODB_URI` from `.env.local`
2. `deleteMany({})` on `ALD_Data.Papers` (full collection clear)
3. Scan `../qwen_extracted_info/` for directories containing any of 8 required JSON files
4. Normalize each paper's 8 sections
5. Build document: `{ id, label, summary, target_material, ... }`
6. Label format: `{ID uppercase} — {formula} via {processType}`
7. Insert in batches of 500

**Normalization:** Same schema defaults as data-fetcher.ts

### 15.2 upload-pdfs.js (55 lines)

**Purpose:** Link PDFs to MongoDB records via Vercel Blob

**Steps:**
1. Load all papers from MongoDB
2. For each paper, look for `../Web Scrapper/ald_papers_naming/{paper.id}.pdf`
3. Upload via `@vercel/blob` `put()` with public access
4. Update document with `pdf_url: blob.url`

**Requires:** `BLOB_READ_WRITE_TOKEN` in `.env.local`

---

## 16. Configuration Files

### tsconfig.json
- `strict: true`, `jsx: "react-jsx"`, `moduleResolution: "bundler"`
- Path alias: `@/*` → `./*`
- Includes Next.js generated types

### next.config.ts
- Empty config object (no custom options)

### postcss.config.mjs
- Plugin: `@tailwindcss/postcss`

### eslint.config.mjs
- Extends: `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`
- Ignores: `.next/**`, build output, `seed.js`, `upload-pdfs.js`

---

## 17. Environment Variables

| Variable | Required | Used By | Purpose |
|----------|----------|---------|---------|
| `MONGODB_URI` | Yes (for data) | data-fetcher, seed.js, upload-pdfs.js | MongoDB Atlas connection string |
| `BLOB_READ_WRITE_TOKEN` | For PDF upload | upload-pdfs.js | Vercel Blob read/write |
| `NEXT_PUBLIC_RAG_API_URL` | Optional | ChatAssistant.tsx | RAG backend URL (client-side, defaults to localhost:8000) |

---

## 18. Dependencies (package.json)

**Name:** `data-visulisation`  
**Version:** `0.1.0`  
**Private:** true

**Scripts:**
- `dev` → `next dev`
- `build` → `next build`
- `start` → `next start`
- `lint` → `eslint`

**Runtime dependencies:**
- @vercel/blob, dotenv, mongodb, next, react, react-dom, react-markdown, recharts, remark-gfm

**Dev dependencies:**
- @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, eslint, eslint-config-next, tailwindcss, typescript

---

## 19. Responsive Layout & Split-Pane Design

### Desktop (md+)
- Full viewport height: `100dvh`
- Chat: fixed 400px (450px on xl), left side, full height
- Dashboard: remaining width, scrollable

### Mobile
- Vertical stack
- Dashboard: top, 55vh
- Chat: bottom, 45vh
- CSS `order-first` / `order-last` swaps visual order

### Scroll behavior
- Dashboard: `overflow-y-auto` with custom 4px scrollbar
- Chat messages: `flex-1 overflow-y-auto`
- Sankey chart: horizontal scroll when viewport < 820px

---

## 20. Accessibility & UX Patterns

- Evidence toggles: `aria-expanded`
- InfoHint buttons: `aria-label="How to interpret this graph"`, `aria-expanded`
- Search fields: `sr-only` labels
- Sankey SVG: `role="img"`, `aria-label`
- Clear search button: `aria-label="Clear search"`
- Smooth scroll to latest chat message
- AbortController cancels in-flight paper fetch on navigation away
- Empty states with actionable guidance
- Staggered entrance animations for cards (100ms increments)
- Hover feedback on all interactive cards (translate, border color)

---

## 21. Known Limitations, Dead Code & Inconsistencies

1. **Single-page app** — no URL routing for materials/papers (state-only navigation)
2. **PDF viewing disabled** — "View Original PDF" button commented out in Dashboard
3. **Legacy data.ts** — static TiO2 sample paper, not imported anywhere
4. **Unused npm packages** — react-markdown, remark-gfm
5. **Unused public SVGs** — all 5 default create-next-app icons
6. **Missing badge CSS** — badge-amber, badge-cyan, badge-rose referenced but not styled
7. **Geist font referenced but not loaded** — Inter/JetBrains used instead
8. **Generic README** — does not document GemaMat-specific setup
9. **Empty next.config.ts** — no image domains, redirects, or headers configured
10. **No authentication** — open dashboard, no user accounts
11. **No loading skeletons** — paper detail fetch has no explicit loading UI
12. **Catalog error message** references "extracted_data directory" but data comes from MongoDB

---

## 22. Setup & Run Instructions

```bash
# 1. Install dependencies
cd data-visulisation
npm install

# 2. Configure .env.local
# MONGODB_URI="mongodb+srv://..."
# BLOB_READ_WRITE_TOKEN="..."  (optional, for PDF upload)
# NEXT_PUBLIC_RAG_API_URL="http://127.0.0.1:8000"  (optional)

# 3. Seed MongoDB from extracted JSON
node seed.js

# 4. (Optional) Upload PDFs to Vercel Blob
node upload-pdfs.js

# 5. Start RAG backend (from repo root, separate terminal)
uvicorn agentic_rag_pipeline.main:app --reload --port 8000

# 6. Start Next.js dev server
npm run dev
# Open http://localhost:3000
```

---

## 23. Research Paper Talking Points (UI Section)

### 23.1 High-level UI contribution

GemaMat provides a **unified human-facing interface** for the ALD-LLaMat pipeline: it transforms structured LLM-extracted JSON into an explorable materials knowledge base with **multi-scale visualization** (corpus → material → paper) and **conversational access** via agentic RAG.

### 23.2 Information architecture

- **Three-tier drill-down** mirrors how materials scientists browse literature: by target material, then by individual study, then by extraction category (substrate, deposition, precursors, film properties, characterization).
- **Evidence-linked fields** support provenance: each section can expand to show source text from the paper (lazy-loaded to optimize initial payload).

### 23.3 Visualization strategy

- **Aggregate analytics** at material level (temperature distributions, phase prevalence, precursor/coreactant co-occurrence) enable cross-paper comparison without manual tabulation.
- **Custom Sankey-style diagram** encodes ALD-specific causal chain: precursor + coreactant → crystal phase.
- **Per-paper radar and completeness charts** communicate data density and reporting gaps in extracted records.

### 23.4 Dual-pane interaction model

- **Dashboard + chat** co-located: visual exploration and natural-language query share context (`scope_paper_id` when a paper is selected).
- Chat exposes **agent transparency**: planner, executor (ReWOO-style), validation, HyDE retrieval, reranking scores — suitable for discussing trustworthy AI interfaces in research tools.

### 23.5 Technical design choices

- **SSR catalog + client lazy detail** balances SEO/performance with rich evidence on demand.
- **MongoDB projection** minimizes over-fetching; evidence truncation prevents UI/memory issues.
- **Dark glassmorphism aesthetic** with chemistry-aware color coding (teal=precursors, rose=coreactants, purple=phases) supports extended reading sessions.

### 23.6 Integration with broader system

| Upstream | UI consumption |
|----------|----------------|
| qwen_extracted_info/ JSON | seed.js → MongoDB |
| Web Scrapper PDFs | upload-pdfs.js → pdf_url (iframe ready but UI disabled) |
| agentic_rag_pipeline | ChatAssistant POST /api/chat |

---

## Appendix A: Dashboard Internal Components (Complete List)

| Component | Lines (approx) | Role |
|-----------|----------------|------|
| `Evidence` | 23–65 | Collapsible evidence text |
| `DataField` | 67–88 | Single stat card |
| `Section` | 93–113 | Glass card section wrapper |
| `normalizeSearchText` | 115–121 | Search helper |
| `matchesSearch` | 123–131 | Multi-field search filter |
| `isReportedValue` | 133–140 | Null/N/A filter |
| `getMaterialFormula` | 142–144 | Formula extractor |
| `getMethodLabel` | 146–149 | Extract abbreviation from "(XPS)" style |
| `CHEMICAL_ALIASES` | 151–208 | Chemical name normalization table |
| `normalizeChemicalName` | 210–218 | Unicode subscript normalization |
| `getChemicalLabel` | 220–232 | Alias-aware chemical label |
| `incrementCount` | 234–240 | Map counter |
| `toCountData` | 242–247 | Top-N count array |
| `getAverage` | 249–256 | Mean calculator |
| `buildCountDistribution` | 258–262 | Histogram builder |
| `buildTemperatureDistribution` | 264–283 | 50°C bin histogram |
| `uniqueReportedValues` | 285–287 | Dedup reported strings |
| `getPhaseLabel` | 289–320 | Phase name normalizer |
| `buildTemperaturePhaseDistribution` | 322–361 | Stacked temp×phase data |
| `topNames` | 363–368 | Top-N from count map |
| `addPairCount` | 370–373 | Edge counter |
| `parsePairKey` | 375–378 | Edge key parser |
| `truncateLabel` | 380–382 | SVG label truncator |
| `buildChemistrySankey` | 384–442 | Sankey data builder |
| `buildMaterialInsights` | 444–477 | All material-level aggregations |
| `EmptyInsight` | 479–485 | Chart empty state |
| `CountBarChart` | 487–530 | Reusable horizontal bar |
| `TemperaturePhaseChart` | 532–583 | Stacked bar wrapper |
| `ChemistrySankey` | 585–729 | Custom SVG renderer |
| `InfoHint` | 731–752 | Chart help popover |
| `MaterialInsights` | 754–904 | Full material analytics panel |
| `SearchField` | 906–962 | Search input with clear |
| `Dashboard` (default export) | 979–1772 | Main component |

---

## Appendix B: ChatAssistant Internal Components

| Component | Role |
|-----------|------|
| `GeminiSparkle` | Gradient SVG avatar |
| `FormattedAnswer` | Line-based markdown-lite renderer |
| `SourceCard` | Expandable evidence chunk with scores |
| `PlannerCard` | Strategic agent plan display |
| `ExecutionTimeline` | ReWOO execution trace |
| `ValidationCard` | Validation agent verdict |
| `statusPill` | CSS class helper for pass/warning/fail |
| `formatScore` | Score to 3 decimal places |
| `truncateText` | Text truncation helper |

---

## Appendix C: Sample Legacy Data (data.ts — unused)

Contains one hardcoded `paper1` (TiO₂ via LPCVD) with full extraction fields including TNT precursor, anatase phase, 10 characterization methods. Used during early development before MongoDB integration.

---

*End of document. Total source files analyzed: 26. Core UI lines: ~4,027.*
