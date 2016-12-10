import {combineReducers} from 'redux'
import {reducer as counter} from './counter'
import {reducer as controls} from './controls'

export default combineReducers({
  counter,
  controls
})
