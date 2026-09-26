import { clampTime, phaseIndexAt } from "./timeline.js";

export function initialPlayback(scenarioKey) {
  return {
    scenarioKey,
    timeMs: 0,
    playing: false,
    speed: 1,
    selectedPlayer: null,
    viewMode: "focus",
    zoom: 1,
    panX: 0,
    panY: 0,
    jumpFrom: null,
    stopAtMs: null,
  };
}

export function playbackReducer(state, action) {
  switch (action.type) {
    case "SCENARIO":
      return { ...state, scenarioKey: action.key, timeMs: 0, playing: false, selectedPlayer: null, zoom: 1, panX: 0, panY: 0, jumpFrom: null, stopAtMs: null };
    case "SEEK": {
      const timeMs = clampTime(action.scenario, action.timeMs);
      const phase = action.scenario.phases[phaseIndexAt(action.scenario, timeMs)];
      return { ...state, timeMs, playing: false, jumpFrom: null, stopAtMs: null, selectedPlayer: phase.players.some(player => player.id === state.selectedPlayer) ? state.selectedPlayer : null };
    }
    case "PHASE": {
      const phase = action.scenario.phases[action.index];
      if (!phase) return state;
      return {
        ...state,
        timeMs: phase.startMs,
        playing: true,
        stopAtMs: phase.startMs + phase.durationMs - 1,
        selectedPlayer: phase.players.some(player => player.id === state.selectedPlayer) ? state.selectedPlayer : null,
        jumpFrom: action.sample && action.index !== action.sample.index ? {
          phaseIndex: action.index,
          players: action.sample.players.filter(player => !player.leaving),
          defense: action.sample.defense.filter(defender => !defender.leaving),
          gl: action.sample.gainLine,
        } : null,
      };
    }
    case "PLAY":
      return { ...state, timeMs: state.timeMs >= action.scenario.totalDuration ? 0 : state.timeMs, playing: true, stopAtMs: state.timeMs >= action.scenario.totalDuration ? null : state.stopAtMs };
    case "PAUSE":
      return { ...state, playing: false };
    case "RESET":
      return { ...state, timeMs: 0, playing: false, selectedPlayer: null, jumpFrom: null, stopAtMs: null };
    case "TICK": {
      if (!state.playing || action.key !== state.scenarioKey) return state;
      const advanced = clampTime(action.scenario, state.timeMs + Math.max(0, action.deltaMs) * state.speed);
      const next = state.stopAtMs == null ? advanced : Math.min(advanced, state.stopAtMs);
      const jumpEnd = state.jumpFrom && action.scenario.phases[state.jumpFrom.phaseIndex];
      const phase = action.scenario.phases[phaseIndexAt(action.scenario, next)];
      return {
        ...state,
        timeMs: next,
        playing: next < action.scenario.totalDuration && (state.stopAtMs == null || next < state.stopAtMs),
        jumpFrom: jumpEnd && next >= jumpEnd.startMs + jumpEnd.durationMs ? null : state.jumpFrom,
        stopAtMs: state.stopAtMs != null && next >= state.stopAtMs ? null : state.stopAtMs,
        selectedPlayer: phase.players.some(player => player.id === state.selectedPlayer) ? state.selectedPlayer : null,
      };
    }
    case "SPEED":
      return { ...state, speed: action.speed };
    case "SELECT_PLAYER":
      return { ...state, selectedPlayer: action.id === state.selectedPlayer ? null : action.id };
    case "VIEW":
      return { ...state, viewMode: action.mode, zoom: 1, panX: 0, panY: 0 };
    case "ZOOM":
      return { ...state, zoom: Math.max(1, Math.min(3, state.zoom * action.factor)) };
    case "PAN":
      return { ...state, panX: state.panX + action.dx, panY: state.panY + action.dy };
    case "RESET_VIEW":
      return { ...state, zoom: 1, panX: 0, panY: 0 };
    default:
      return state;
  }
}
