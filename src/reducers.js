import {combineReducers} from 'redux'
import {reducer as config} from './config'
import {reducer as controls} from './prefabs/Controls'
import {reducer as room} from './prefabs/Room'
import {reducer as target} from './prefabs/Target'

export default combineReducers({
  controls,
  room,
  target,
  config
})
