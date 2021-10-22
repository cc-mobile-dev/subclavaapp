import { createSelector } from 'reselect';

const allGiveaways = state => state.giveawaysState.all;
const chatroom = (state, props) => props.chatroomId;

export const currentGiveaway = createSelector(
    [allGiveaways, chatroom],
    (allGiveaways, chatroom) => {
        return allGiveaways.find(g => g.chatroom && g.chatroom.objectId === chatroom)
    }
)
