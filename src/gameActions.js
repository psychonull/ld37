import { createAction } from 'redux-actions';

// Actions
export const restart = createAction('GAME_RESTART');
export const changeLevel = createAction('GAME_CHANGE_LEVEL', () => ({}), level => ({level}));
export const win = createAction('GAME_WIN');
