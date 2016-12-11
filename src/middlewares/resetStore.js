import {getDefaultState, getLevelState} from '../baseState'

const reset = next => (reducer, initialState) => next((state, action) => {
  switch(action.type) {
    case 'GAME_RESTART':
      return reducer(getDefaultState(), action)
    case 'GAME_CHANGE_LEVEL':
      return reducer(getLevelState(action.meta.level), action)
  }

  return reducer(state, action);
} , initialState)

export default reset
