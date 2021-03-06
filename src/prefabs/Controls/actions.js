import { createAction } from 'redux-actions';

// Actions
export const action = {
  enable: createAction('CONTROLS_ENABLE'),
  disable: createAction('CONTROLS_DISABLE'),
  move: createAction('CONTROLS_MOVE'),
  reset: createAction('CONTROLS_RESET')
};
