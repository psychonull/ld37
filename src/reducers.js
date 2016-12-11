import {combineReducers} from 'redux'
import {reducer as config} from './config'
import {reducer as controls} from './prefabs/Controls'
import {reducer as room} from './prefabs/Room'

export default combineReducers({
  controls,
  room,
  config
})
