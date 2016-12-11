export {default} from './Prefab'
export {action} from './actions'

import { handleActions } from 'redux-actions';

// Reducer
export const reducer = handleActions({
  CONTROLS_ENABLE: state => ({...state, enabled: true}),
  CONTROLS_DISABLE: state => ({...state, enabled: false}),
  CONTROLS_MOVE: (state, action) => ({...state, move: action.payload}),
  CONTROLS_RESET: state => ({...state, move: null})
}, { enabled: false, move: null });

/*
// Selectors
const getCurrentCounter = state => state.counter
export const select = {
  current: createSelector([getCurrentCounter], ({count}) => count)
};
*/
