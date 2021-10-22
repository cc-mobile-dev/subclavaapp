import { createSelector } from 'reselect';

const allChatrooms = state => state.chatroomsState.allChatrooms;
const chatroomId = (state, props) => props.route?.params?.chatroom?.id;

export const currentChatroom = createSelector(
    [allChatrooms, chatroomId],
    (chatrooms, chatroomId) => {
        return chatrooms.find(c => c.id === chatroomId)
    }
)

const messages = state => state.sendBirdState.chat.list || [];
const reactionMessage = state => state.sendBirdState.chat.reactionMessage || [];
const blockedUserList = state => state.sendBirdState.blockUser.list || [];


export const filteredMessages = createSelector(
    [messages, reactionMessage],
    (messages, reactionMessage) => {
        return messages.filter(m => '_sender' in m && !m._sender.isBlockedByMe)
    }
)

const chatroomsByLocation = state => state.chatroomsState.chatroomsByLocation;
export const chatroomDataByLocation = createSelector(
    [allChatrooms, chatroomsByLocation],
    (allChatrooms, byLocation) => {
        if (byLocation) {
            return byLocation.map(l => allChatrooms.find(a => a.id === l))
        } else {
            return []
        }
    }
)


const users = state => state.sendBirdState.member.list;
export const userList = createSelector(
    [users],
    (users) => users
)


// export const blockedAndHidden = createSelector(
//     [messages, blocked]
// )