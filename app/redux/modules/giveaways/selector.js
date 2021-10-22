import { createSelector } from 'reselect';

const allGiveaways = state => state.giveawaysState.all;
const chatroomId = (state, props) => {
    return props.route?.params?.chatroom?.id
}

export const currentGiveaway = createSelector(
    [allGiveaways, chatroomId],
    (giveaways, chatroomId) => (chatroomId && giveaways) ? giveaways.find(g => g.chatroom && g.chatroom.objectId === chatroomId) : null
)