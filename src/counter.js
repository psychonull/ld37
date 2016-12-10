import { createAction } from 'redux-actions';
import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// Actions
export const action = {
  increment: createAction('INCREMENT'),
  incrementBy: createAction('INCREMENT_BY')
};

// Reducer
export const reducer = handleActions({
  INCREMENT_BY: (state, action) => ({
    count: state.count + action.payload
  }),
  INCREMENT: (state, action) => ({
    count: state.count + 1
  }),
  DECREMENT: (state, action) => ({
    count: state.count - 1
  })
}, { count: 0 });


// Selectors
const getCurrentCounter = state => state.counter

export const select = {
  current: () => createSelector([getCurrentCounter], ({count}) => count)($$.getState())
};
