# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build to dist/
```

No test or lint scripts are configured.

## Architecture

Single-page React app built with Vite. All application logic lives in `src/App.jsx` (~500 lines). There is no routing, state management library, or backend.

### Key components (all in App.jsx)

- **`Field`** — SVG rugby field background with grass stripes, touch lines, and goal lines (880×900px viewBox)
- **`Pl`** (Player) — Renders a player as a numbered circle; supports ghost/transparent state for movement trails
- **`Df`** (Defense) — Row of 9 semi-transparent defender circles across the field width
- **`Arrow`** — Quadratic bezier curve with arrowhead, used to show ball movement paths
- **`FV`** (Field View) — Animation controller: interpolates player positions between phases using `requestAnimationFrame` with ease-in-out easing over 1.2s transitions

### Data structure

All tactical data is in the `S` object (same file). It defines an 8-phase play sequence ("MISCHIA A DESTRA – SEQUENZA COMPLETA"). Each phase contains:
- Player positions (number, x/y coords, color)
- Defense line positions
- Arrow paths with labels
- Pod ellipse markers and text annotations
- Goal line position

### Color scheme

The `C` object defines semantic colors: `pod1` (red), `pod2` (blue), `larghi`, `ruck`, `med`, `backs`, `mischia`, `yellow`, `purple`.

### Interaction

Phase navigation buttons (1–8), Play/Pause autoplay (3.5s interval), and Reset. All text and labels are in Italian.
