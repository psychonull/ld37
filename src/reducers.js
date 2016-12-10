import {combineReducers} from 'redux'
import {reducer as counter} from './counter'
import {reducer as config} from './config'

export default combineReducers({
  counter,
  config
})
