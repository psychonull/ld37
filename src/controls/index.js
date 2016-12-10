export {default} from './prefab'
export {action} from './actions'

import { handleActions } from 'redux-actions';

// Reducer
export const reducer = handleActions({
  CONTROLS_ENABLE: state => ({...state, enabled: true}),
  CONTROLS_DISABLE: state => ({...state, enabled: false}),
  CONTROLS_MOVE: (state, action) => ({...state, dir: action.payload}),
  CONTROLS_RESET: state => ({...state, dir: { x:0, y:0 }})
}, { enabled: false, dir: { x:0, y:0 } });

/*
// Selectors
const getCurrentCounter = state => state.counter
export const select = {
  current: createSelector([getCurrentCounter], ({count}) => count)
};
*/
