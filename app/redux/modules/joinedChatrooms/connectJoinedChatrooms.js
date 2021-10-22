import { connect } from 'react-redux';
import { joinedChatroomsActionCreators } from './actions';

function mapStateToProps({ joinedChatroomsState }) {
  return {
    joinedChatroomsState,
  };
}

const mapDispatchToProps = joinedChatroomsActionCreators;

export function connectJoinedChatrooms(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps
  );
}
