import { connect } from 'react-redux';
import { animationActionCreators } from './actions';

function mapStateToProps({ animationState }) {
  return {
    animationState,
  };
}

const mapDispatchToProps = animationActionCreators;

export function connectAnimation(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps
  );
}
