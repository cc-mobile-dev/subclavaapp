import { connect } from 'react-redux';
import { favoriteChatroomsActionCreators } from './actions';

function mapStateToProps({ favoriteChatroomsState }) {
  return {
    favoriteChatroomsState,
  };
}

const mapDispatchToProps = favoriteChatroomsActionCreators;

export function connectFavoriteChatrooms(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps
  );
}
