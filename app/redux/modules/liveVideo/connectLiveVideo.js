import { connect } from 'react-redux';
import { liveVideoActionCreators } from './actions';
import { currentGiveaway } from './selector';

function mapStateToProps(state, props) {
  return {
    liveVideoState: {
      ...state.liveVideoState,
      liveGiveaway: currentGiveaway(state, props)
    }
  };
}

const mapDispatchToProps = liveVideoActionCreators;

export function connectLiveVideo(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps
  );
}
