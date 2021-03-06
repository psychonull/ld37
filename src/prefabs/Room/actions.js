import { createAction } from 'redux-actions';

// Actions
export const action = {
  setLevel: createAction('ROOM_LEVEL_SET'),
  restartLevel: createAction('ROOM_LEVEL_RESTART'),
  receiveAliens: createAction('ROOM_ALIENS_RECEIVE'),
  alienSelected: createAction('ROOM_ALIEN_SELECTED'),
  alienMoveTo: createAction('ROOM_ALIEN_SET_POSITION'),
  alienReleased: createAction('ROOM_ALIEN_RELEASED')
};
