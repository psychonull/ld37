export const reducer = (state = 'boot', action) => {
  switch (action.type) {
    case 'GAME_WIN':
      return 'win';
    case 'GAME_START':
      return 'game';
    case 'GAME_STATE_CHANGE':
      return action.payload;
    default:
      return state;
  }
}