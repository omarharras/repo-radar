# Repo Radar

Repo Radar is a React application for searching GitHub repositories, tracking repositories of interest, and monitoring key repository metrics.

## Features

- Debounced GitHub repository search with incremental pagination
- Track and untrack repositories from search results
- Persist tracked repositories across browser sessions
- View stars, open issues, and latest commit date
- Refresh repositories individually or refresh all at once
- Independent loading and error states per tracked repository
- Preserve previously loaded data when a refresh fails
- Compare stars across tracked repositories with a bar chart
- Light and dark themes

## Tech Stack

- React 19 + TypeScript + Vite
- Redux Toolkit + RTK Query
- MUI + MUI X Charts
- React Router
- npm Workspaces
- GitHub REST API
- Vercel

## Getting Started

### Prerequisites

- Node.js
- npm

### Install and Run

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

The project uses an npm workspaces monorepo:

```text
repo-radar/
├── apps/
│   └── web/          # Main React application
├── packages/
│   ├── ui/           # Reusable UI components
│   └── plots/        # Reusable chart components
├── package.json
└── vercel.json
```

Inside `apps/web`, the application follows a feature-based structure:

```text
src/
├── app/              # App composition, routing, store, layout and theme
├── features/         # Repository search and tracked repositories
├── services/         # External integrations such as the GitHub API
└── shared/           # Cross-feature types and utilities
```

## Architecture and Technical Decisions

### State Ownership

State is separated by ownership:

- Local UI state → React component state
- Shared client-owned state → Redux Toolkit
- Server-owned GitHub data → RTK Query

Tracked repositories are client-owned state and contain only the minimum stable identity:

```ts
type TrackedRepository = {
  id: number;
  fullName: string;
};
```

They are stored using Redux Toolkit's `createEntityAdapter`, while live repository data such as stars, issues, descriptions, and commit information remains in the RTK Query cache.

This keeps client state normalized and avoids creating a second source of truth for server data.

### Persistence

Tracked repository identities are persisted to `localStorage`.

Redux listener middleware handles persistence as a side effect, keeping storage concerns out of reducers and UI components. Persisted values are runtime-validated before they are used to hydrate the Redux state.

Live GitHub data is intentionally not persisted.

### GitHub API and Async State

GitHub API access is centralized under `services/github`, and raw API responses are mapped to application models before reaching feature components.

Repository search uses an RTK Query infinite query with a debounced input. Empty searches are skipped, and pagination is capped at GitHub's 1,000 searchable-result limit.

Each tracked repository owns independent queries for repository details and its latest commit. This gives every repository independent loading, error, and refresh states, so a failure in one repository does not affect the others.

### Refresh Strategy

Refreshing a repository refetches both its repository details and latest commit.

If previously loaded data exists and a refresh fails, the last successful values remain visible while the UI reports the refresh failure.

`Refresh All` triggers the same queries for every tracked repository and waits with `Promise.allSettled`, allowing other refreshes to complete even if an individual request fails.

### Chart and Shared Packages

`packages/plots` exposes a generic bar chart built with MUI X Charts.

The tracked repositories feature derives chart data directly from existing RTK Query cache entries rather than issuing additional requests or storing duplicate chart state.

`packages/ui` is intentionally limited to genuinely reusable UI. Domain-specific repository components remain inside their features instead of being generalized prematurely.

## Assumptions and Limitations

- GitHub's public REST API is used without authentication, so requests are subject to unauthenticated rate limits.
- A complete tracked repository refresh requires separate requests for repository details and latest commit data.
- GitHub repository search exposes at most the first 1,000 matching results.
- Tracked repositories are persisted locally in the browser; there is no backend or cross-device synchronization.
- The application is a client-side rendered SPA.
- Mobile-specific responsive navigation was not a primary focus of the implementation.

## Deployment

The application is deployed on Vercel.

A SPA fallback rewrite allows client-side routes such as `/search` and `/tracked` to work correctly when opened directly or refreshed.

**Live Demo:** _To be added after deployment._
