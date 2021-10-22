import { connect } from 'react-redux';
import { globalActionCreators } from './actions';

function mapStateToProps({ globalState }) {
  return {
    globalState,
  };
}

const mapDispatchToProps = globalActionCreators;

export function connectGlobal(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps
  );
}
