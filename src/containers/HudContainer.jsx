import { connect } from 'react-redux'
import Hud from '../components/Hud.jsx';
import {action as roomActions} from '../prefabs/Room/actions';
import { toggleSound } from '../gameActions';
import {getCurrentLevel} from '../prefabs/Room/selector';

const mapStateToProps = (state) => {
  let currentLevel = getCurrentLevel(state);
  return {
    level: currentLevel ? currentLevel.name : null ,
    targetSprite: currentLevel ? state.config.characters[currentLevel.target.character].sprite : null,
    sound: state.gameStats.sound,
    moves: state.room.moves
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRestartLevelClick: (e) => {
      e.preventDefault();
      dispatch(roomActions.restartLevel());
    },
    onToggleSoundClick: (e) => {
      e.preventDefault();
      dispatch(toggleSound());
    }
  }
};

const HudContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hud);

export default HudContainer;