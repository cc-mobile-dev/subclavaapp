import { connect } from 'react-redux';
import { authActionCreators } from './actions';

function mapStateToProps({ authState }) {
  return {
    authState,
  };
}

const mapDispatchToProps = authActionCreators;

export function connectAuth(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps
  );
}
