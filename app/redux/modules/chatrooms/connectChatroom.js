import { connect } from 'react-redux';
import { currentChatroom, filteredMessages, userList } from './selector';

function mapStateToProps(state, props) {
    return {
        chatroomData: currentChatroom(state, props),
        chatroomMembers: userList(state)
    };
}

export function connectChatroom(configMapStateToProps = mapStateToProps) {
    return connect(
        configMapStateToProps
    );
}
