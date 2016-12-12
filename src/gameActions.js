import { createAction } from 'redux-actions';

// Actions
export const start = createAction('GAME_START');
export const restart = createAction('GAME_RESTART');
export const changeLevel = createAction('GAME_CHANGE_LEVEL', () => ({}), level => ({level}));
export const win = createAction('GAME_WIN');
export const toggleSound = createAction('GAME_TOGGLE_SOUND');
