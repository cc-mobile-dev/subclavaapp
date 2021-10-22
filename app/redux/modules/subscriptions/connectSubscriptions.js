import { connect } from 'react-redux';
import { subscriptionsActionCreators } from './actions';

function mapStateToProps({ subscriptionsState }) {
  return {
    subscriptionsState,
  };
}

const mapDispatchToProps = subscriptionsActionCreators;

export function connectSubscriptions(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps
  );
}
