import { connect } from 'react-redux'
import Hud from '../components/Hud.jsx';
import {action as roomActions} from '../prefabs/Room/actions';
import {getCurrentLevel} from '../prefabs/Room/selector';

const mapStateToProps = (state) => {
  let currentLevel = getCurrentLevel(state);
  return {
    level: currentLevel ? currentLevel.name : null ,
    targetSprite: currentLevel ? state.config.characters[currentLevel.target.character].sprite : null,
    moves: state.room.moves
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRestartLevelClick: (e) => {
      e.preventDefault();
      dispatch(roomActions.restartLevel());
    }
  }
};

const HudContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hud);

export default HudContainer;