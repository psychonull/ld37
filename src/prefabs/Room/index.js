export {default} from './Prefab.js';
export {actions} from './actions';

import {handleActions} from 'redux-actions';

export const getAliens = state => state.room.aliens
export const getAlien = (state, _id) => getAliens(state).find(({id}) => id === _id)

// Reducer
export const reducer = handleActions({
  ROOM_ALIENS_RECEIVE: (state, action) => ({...state,
    aliens: action.payload
  }),
  ROOM_ALIEN_SELECTED: (state, action) => ({...state, alienSelected: action.payload}),
  ROOM_ALIEN_SET_POSITION: (state, action) => ({...state,
    aliens: state.aliens.map(alien => {
      const {id, position} = action.payload
      if (alien.id === id) return {...alien, position}
      return alien
    })
  }),
  ROOM_ALIEN_RELEASED: state => ({...state, alienSelected: null})
}, {
  alienSelected: null,
  aliens: []
});
