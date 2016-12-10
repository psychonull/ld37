import { handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

export const action = {};

// Reducer
export const reducer = handleActions({HACK: state => state}, {
  config: {
    options: require('./options.json'),
    levels: require('./levels.json'),
    characters: require('./characters.json')
  }
});

// Selectors
const getLevel = (state, i) => {
  return state.config.levels[i]
}

export const select = {
  level: (state, index) => createSelector([getLevel], a => a)(state, index)
};
