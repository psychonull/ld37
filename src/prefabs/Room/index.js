export {default} from './Prefab.js';
export {actions} from './actions';

import {handleActions} from 'redux-actions';

// Reducer
export const reducer = handleActions({
  ROOM_LEVEL_SET: (state, action) => ({...state,
    level: action.payload
  }),
  ROOM_LEVEL_RESTART: state => ({...state,
    restart: true
  }),
  ROOM_ALIENS_RECEIVE: (state, action) => ({...state,
    aliens: action.payload
  }),
  ROOM_ALIEN_SELECTED: (state, action) => ({...state, alienSelected: action.payload}),
  ROOM_ALIEN_SET_POSITION: (state, action) => ({...state,
    aliens: state.aliens.map(alien => {
      const {id, position} = action.payload
      if (alien.id === id) return {...alien, position}
      return alien
    }),
    moves: state.moves + 1
  }),
  ROOM_ALIEN_RELEASED: state => ({...state, alienSelected: null})
}, {
  level: null,
  moves: 0,
  alienSelected: null,
  aliens: []
});
