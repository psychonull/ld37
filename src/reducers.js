import {combineReducers} from 'redux'
import {reducer as config} from './config'
import {reducer as controls} from './controls'

export default combineReducers({
  controls,
  config
})
