import { connect } from 'react-redux';
import { promotionsActionCreators } from './actions';

function mapStateToProps({ promotionsState }) {
  return {
    promotionsState,
  };
}

const mapDispatchToProps = promotionsActionCreators;

export function connectPromotions(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps
  );
}
