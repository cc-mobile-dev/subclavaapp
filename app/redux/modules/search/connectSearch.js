import { connect } from 'react-redux';
import { searchActionCreators } from './actions';

function mapStateToProps({ searchState }) {
  return {
    searchState,
  };
}

const mapDispatchToProps = searchActionCreators;

export function connectSearch(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps
  );
}
