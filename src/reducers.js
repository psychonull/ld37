import {combineReducers} from 'redux'
import {reducer as config} from './config'
import {reducer as controls} from './prefabs/Controls'
import {reducer as room} from './prefabs/Room'
import {reducer as target} from './prefabs/Target'
import {reducer as gameStats} from './gameStats';
import {reducer as gameState} from './gameStateReducer.js';

export default combineReducers({
  controls,
  room,
  target,
  config,
  gameStats,
  gameState
})
