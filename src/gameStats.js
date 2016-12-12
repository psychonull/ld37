import {handleActions} from 'redux-actions';

export const reducer = handleActions({
  GAME_WIN: state => ({...state,
    win: true
  }),
  GAME_TOGGLE_SOUND: state => ({...state, //HACK ( does not belong here.. !) 
    sound: !state.sound  
  })
}, { win: false, sound: true });