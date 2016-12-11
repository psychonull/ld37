import { createAction } from 'redux-actions';

// Actions
export const action = {
  receiveAliens: createAction('ROOM_ALIENS_RECEIVE'),
  alienSelected: createAction('ROOM_ALIEN_SELECTED'),
  alienMoveTo: createAction('ROOM_ALIEN_SET_POSITION'),
  alienReleased: createAction('ROOM_ALIEN_RELEASED')
};
