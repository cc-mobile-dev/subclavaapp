import { connect } from 'react-redux';
import { chatroomsActionCreators } from './actions';
import { chatroomDataByLocation } from './selector';

function mapStateToProps(state) {
  return {
    chatroomsState: state.chatroomsState,
    chatroomsByLocation: chatroomDataByLocation(state)
  };
}

const mapDispatchToProps = chatroomsActionCreators;

export function connectChatrooms(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps
  );
}
