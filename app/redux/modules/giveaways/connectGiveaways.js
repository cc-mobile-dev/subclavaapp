import { connect } from 'react-redux';
import { giveawaysActionCreators } from './actions';
import { currentGiveaway } from './selector';

function mapStateToProps(state, props) {
  return {
    giveawaysState: {
      ...state.giveawaysState,
      currentGiveaway: currentGiveaway(state, props)
    }
  };
}

const mapDispatchToProps = giveawaysActionCreators;

export function connectGiveaways(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps
  );
}
