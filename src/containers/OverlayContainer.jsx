import { connect } from 'react-redux'
import Overlay from '../components/Overlay.jsx';
import {start as gameStart} from '../gameActions';

const mapStateToProps = ({gameState, ...state}) => {
  return {
    gameState
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStartGameClick: (e) => {
      e.preventDefault();
      dispatch(gameStart());
    }
  }
};

const OverlayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Overlay);

export default OverlayContainer;