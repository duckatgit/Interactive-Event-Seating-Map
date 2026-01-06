# Event Seating Map

A small React + TypeScript application that renders an interactive seating map for an event venue. Users can view seats, open seat details, and select seats to build a summary.

## Key features

- Interactive seat map with clickable seats
- Seat detail panel with metadata (row, number, price, status)
- Selection summary component showing chosen seats and totals
- Small, focused codebase designed for learning and customization

## Tech stack

- React 19 + TypeScript
- Vite for development and bundling
- ESLint for linting

## Getting started

### Prerequisites

- Node.js 18+ or compatible
- pnpm (recommended) or npm / yarn

### Installation

```bash
pnpm install
```

Or with npm:

```bash
npm install
```

### Run development server

```bash
pnpm run dev
```

### Build for production

```bash
pnpm run build
```

### Preview production build

```bash
pnpm run preview
```

### Linting

```bash
pnpm run lint
```

## Project structure (important files)

- `public/venue.json` — venue layout and seat data used by the app.
- `src/main.tsx` — app entry and bootstrapping.
- `src/App.tsx` — main application shell.
- `src/components/SeatMap.tsx` — renders the grid/map of seats.
- `src/components/Seat.tsx` — individual seat UI.
- `src/components/SeatDetails.tsx` — details panel for a selected seat.
- `src/components/Summary.tsx` — selected seats and totals.
- `src/hooks/useSeats.ts` — data loading and seat state management.
- `src/hooks/useSeatSelection.ts` — selection logic and helpers.
- `src/types/venue.ts` — TypeScript types that describe the venue data shape.

## Venue data format

The app reads `public/venue.json` for seat layout. A minimal example:

```json
{
  "sections": [
    {
      "id": "floor",
      "rows": [
        {
          "label": "A",
          "seats": [
            { "number": 1, "price": 50, "status": "available" },
            { "number": 2, "price": 50, "status": "sold" }
          ]
        }
      ]
    }
  ]
}
```

Consult `src/types/venue.ts` for the exact schema used by the app.

## How it works

- The app loads venue data from `public/venue.json`. The `useSeats` hook maps that into the internal model.
- `SeatMap` lays out seats based on the venue data and renders `Seat` components.
- Clicking a seat opens `SeatDetails` and/or toggles selection; selection state is managed by `useSeatSelection`.
- `Summary` displays chosen seats and a price total.

## Customization tips

- Add seat properties: update `src/types/venue.ts`, then update `useSeats` to map and expose new fields.
- Accessibility: add keyboard navigation and ARIA updates in `src/components/Seat.tsx`.
- Persist selection: use localStorage or a backend API to store selections.

## Testing

No tests are included by default. Recommended setup:

- `vitest` + `@testing-library/react` for unit/component tests.

## Contributing

- Fork the repo, create a branch, and open a PR with a clear description.
- Keep PRs focused and include screenshots for UI changes.

## Troubleshooting

- If the dev server doesn't start, ensure Node version and dependencies are correct, then run `pnpm install` again.
- If seat data doesn't display, verify `public/venue.json` is valid JSON and matches the expected schema.

## License

This project is available under the MIT License. See the `LICENSE` file.

## Acknowledgements

- Built as a small demo / starter app using Vite + React + TypeScript.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # Event Seating Map

    A small React + TypeScript application that renders an interactive seating map for an event venue. Users can view seats, open seat details, and select seats to build a summary.

    Key features

    - Interactive seat map with clickable seats
    - Seat detail panel with metadata (row, number, price, status)
    - Selection summary component showing chosen seats and totals
    - Small, focused codebase designed for learning and customization

    Tech stack

    - React 19 + TypeScript
    - Vite for development and bundling
    - ESLint for linting

    Getting started

    Prerequisites

    - Node.js 18+ or compatible
    - pnpm (recommended) or npm / yarn

    Installation

    ```bash
    pnpm install
    ```

    Run development server

    ```bash
    pnpm run dev
    ```

    Build for production

    ```bash
    pnpm run build
    ```

    Preview production build

    ```bash
    pnpm run preview
    ```

    Linting

    ```bash
    pnpm run lint
    ```

    Project structure (important files)

    - `public/venue.json` — venue layout and seat data used by the app.
    - `src/main.tsx` — app entry and bootstrapping.
    - `src/App.tsx` — main application shell.
    - `src/components/SeatMap.tsx` — renders the grid/map of seats.
    - `src/components/Seat.tsx` — individual seat UI.
    - `src/components/SeatDetails.tsx` — details panel for a selected seat.
    - `src/components/Summary.tsx` — selected seats and totals.
    - `src/hooks/useSeats.ts` — data loading and seat state management.
    - `src/hooks/useSeatSelection.ts` — selection logic and helpers.

    How it works

    - The app loads venue data from `public/venue.json` (static JSON). The `useSeats` hook transforms this into the internal seat model the components consume.
    - `SeatMap` lays out seats based on the venue data and renders `Seat` components.
    - Clicking a seat opens `SeatDetails` (or toggles selection depending on UI) and updates selection state managed by `useSeatSelection`.
    - `Summary` reads the selection state and displays chosen seats and a price total.

    Customizing venue data

    - Open `public/venue.json` and modify rows, sections, or seat attributes. The shape expected by the application is small and documented in `src/types/venue.ts`.

    Development notes

    - Add new seat properties: update `src/types/venue.ts`, then update `useSeats` to map and expose the new fields.
    - Accessibility: seat components include basic ARIA attributes, but you may want to add keyboard navigation and improved screen-reader descriptions.

    Testing

    - There are no automated tests in this repository yet. For component-level testing, add Jest + React Testing Library or Vitest and create tests under a `src/__tests__` folder.

    Contributing

    - Fork the repo, make a branch, then open a pull request with a clear description of changes.
    - Keep PRs focused and include screenshots for UI changes when relevant.

    Troubleshooting

    - If the dev server doesn't start, ensure your Node version is compatible and `pnpm install` completed successfully.
    - If seat data doesn't appear, verify `public/venue.json` is present and correctly formatted.

    License

    This project is provided under the MIT License. See the `LICENSE` file if present or add one if you plan to share publicly.

    Acknowledgements

    - Built as a small demo / starter app using Vite + React + TypeScript.

    Next steps

    - Add automated tests, keyboard navigation, and persist selection state (localStorage).
  }])