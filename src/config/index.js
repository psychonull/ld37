import {getDefaultState} from '../baseState'
import { createSelector } from 'reselect';

export const action = {};

// Reducer
export const reducer = (state = getDefaultState(true)) => state

// Selectors
const getLevel = (state, i) => {
  return state.config.levels[i]
}

export const getGrid = state => {
  const {tileSize, gameWidth, gameHeight, offsetX, offsetY} = state.config.options
  const rows = Math.floor((gameHeight - offsetY)/tileSize);
  const cols = Math.floor((gameWidth - offsetX)/tileSize);

  return new Array(cols).fill(1).map(() => new Array(rows).fill(0));
}

export const select = {
  level: (state, index) => createSelector([getLevel], a => a)(state, index)
};
