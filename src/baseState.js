const options = require('./config/options.json');
const levels = require('./config/levels.json');
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
    level
  },
  config
})
