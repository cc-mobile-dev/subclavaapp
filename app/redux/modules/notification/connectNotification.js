import { connect } from 'react-redux';
import { notificationActionCreators } from './actions';

function mapStateToProps({ notificationState }) {
  return {
    notificationState,
  };
}

const mapDispatchToProps = notificationActionCreators;

export function connectNotification(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps
  );
}
