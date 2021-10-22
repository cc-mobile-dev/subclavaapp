import { createSelector } from 'reselect';

const allChats = state => state.chatState.messages;
const chatroomId = (state, props) => props.route.params.chatroom.objectId;

export const currentChat = createSelector(
    [allChats, chatroomId],
    (chats, chatroomId) => {
        return chats[chatroomId] || []
    }
)