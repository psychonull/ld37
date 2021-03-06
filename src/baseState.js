const options = require('./config/options.json');
const levels = require('./config/levels');
const characters = require('./config/characters.json');

const config = {
  options,
  levels,
  characters
}

export const getDefaultState = useStorage => ({ // TODO: use localstorage
  config
})

export const getLevelState = level => ({
  room: {
    level,
    moves: 0
  },
  config
})
