export {default} from './Prefab.js';
import {handleActions} from 'redux-actions';

// Reducer
export const reducer = handleActions({
  ROOM_ALIEN_SET_POSITION: (state, {payload}) => ({...state, lastAlienMoved: payload}),
  TARGET_SET_WIN: state => ({...state, win: true})
}, {
  lastAlienMoved: null,
  win: false
});
