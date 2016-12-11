import {select} from '../../config'

export const getCurrentLevel = state => select.level(state, state.room.level)
export const getAliens = state => state.room.aliens
export const getAlien = (state, _id) => getAliens(state).find(({id}) => id === _id)
