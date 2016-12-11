import {handleActions} from 'redux-actions';

export const reducer = handleActions({
  GAME_WIN: state => ({...state,
    win: true
  })
}, { win: false });