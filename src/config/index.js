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

export const getGrid = state => {
  const {tileSize, gameWidth, gameHeight} = state.options
  const rows = Math.floor(gameHeight/tileSize);
  const cols = Math.floor(gameWidth/tileSize);

  return new Array(cols).fill(1).map(() => new Array(rows).fill(0));
}

export const select = {
  level: (state, index) => createSelector([getLevel], a => a)(state, index)
};
