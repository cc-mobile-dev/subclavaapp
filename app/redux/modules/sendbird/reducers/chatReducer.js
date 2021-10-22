import update from 'immutability-helper';
import {
  INIT_CHAT_SCREEN,
  CREATE_CHAT_HANDLER_SUCCESS,
  CREATE_CHAT_HANDLER_FAIL,
  CHANNEL_TITLE_CHANGED,
  CHANNEL_TITLE_CHANGED_FAIL,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAIL,
  SEND_MESSAGE_TEMPORARY,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  CHANNEL_EXIT_SUCCESS,
  CHANNEL_EXIT_FAIL,
  USER_MESSAGE_PRESS,
  USER_MESSAGE_SELECTION_CLEAR,
  MESSAGE_RECEIVED,
  MESSAGE_UPDATED,
  MESSAGE_DELETED,
  CHANNEL_CHANGED,
  TYPING_STATUS_UPDATED,
  READ_RECEIPT_UPDATED,
  OWN_MESSAGE_DELETED,
  OWN_MESSAGE_DELETED_FAIL,
  OWN_MESSAGE_UPDATED,
  OWN_MESSAGE_UPDATED_FAIL,
  MESSAGE_COPY,
  ADDED_MESSAGE_REACTION,
  ADD_MESSAGE_REACTION,
  REMOVE_MESSAGE_REACTION,
  REMOVED_MESSAGE_REACTION,
  SEND_FILE_MESSAGE,
  SEND_FILE_MESSAGE_FAIL,
  SEND_FILE_MESSAGE_SUCCESS
} from '../actions/types';

const INITAL_STATE = {
  list: [],
  memberCount: 0,
  title: '',
  exit: false,
  typing: '',
  isSending: false, // only using it for sending and tracking image uploads
  selectedMessages: [],
  reactionMessage: '',
  isUploadingImage: false
};

const uniqueList = list => {
  return list.reduce((uniqList, currentValue) => {
    let ids = uniqList.map(item => {
      return item.messageId;
    });
    if (ids.indexOf(currentValue.messageId) < 0) {
      uniqList.push(currentValue);
    }
    return uniqList;
  }, []);
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case INIT_CHAT_SCREEN:
      return { ...state, ...INITAL_STATE };
    case CREATE_CHAT_HANDLER_SUCCESS:
      return { ...state };
    case CREATE_CHAT_HANDLER_FAIL:
      return { ...state };
    case CHANNEL_TITLE_CHANGED:
      return { ...state, title: action.title, memberCount: action.memberCount };
    case CHANNEL_TITLE_CHANGED_FAIL:
      return { ...state };
    case MESSAGE_LIST_SUCCESS:
      return { ...state, list: uniqueList([...state.list, ...action.list]) };
    case MESSAGE_LIST_FAIL:
      return { ...state };
    case SEND_FILE_MESSAGE:
      return { ...state, isUploadingImage: true };
    case SEND_FILE_MESSAGE_FAIL:
    case SEND_FILE_MESSAGE_SUCCESS:
      return { ...state, isUploadingImage: false }
    case SEND_MESSAGE_TEMPORARY:
      return { ...state, list: [...[action.message], ...state.list] };
    case SEND_MESSAGE_SUCCESS:
      const newMessage = action.message;
      let foundNewMessage = false;
      const sendSuccessList = state.list.map(message => {
        if (message.reqId && newMessage.reqId && message.reqId.toString() === newMessage.reqId.toString()) {
          foundNewMessage = true;
          return newMessage;
        } else {
          return message;
        }
      });
      if (foundNewMessage) {
        return { ...state, list: sendSuccessList };
      } else {
        return { ...state, list: [...[newMessage], ...sendSuccessList] };
      }
    case SEND_MESSAGE_FAIL:
      const newChatList = state.list.slice(1);
      return { ...state, list: newChatList };
    case CHANNEL_EXIT_SUCCESS:
      return { ...state, exit: true };
    case CHANNEL_EXIT_FAIL:
      return { ...state, exit: false };
    case USER_MESSAGE_PRESS:
      const newSelectedMessage = action.message;
      return { ...state, selectedMessages: [newSelectedMessage] };
    case USER_MESSAGE_SELECTION_CLEAR:
      return { ...state, selectedMessages: [] };
    case MESSAGE_RECEIVED:
      return { ...state, list: uniqueList([...[action.payload], ...state.list]) };
    case MESSAGE_UPDATED:
      const updatedMessage = action.payload;
      const updatedList = state.list.map(message => {
        if (message.messageId === updatedMessage.messageId) {
          message = updatedMessage;
        }
        return message;
      });
      console.log('new message list: ', updatedList)
      return { ...state, list: updatedList };
    case MESSAGE_DELETED:
      const deletedList = state.list.filter(message => {
        return message.messageId.toString() !== action.payload.toString();
      });
      return { ...state, list: deletedList };
    case CHANNEL_CHANGED:
      return { ...state, memberCount: action.memberCount, title: action.title };
    case TYPING_STATUS_UPDATED:
      return { ...state, typing: action.typing };
    case READ_RECEIPT_UPDATED:
      return { ...state, list: state.list };
    case OWN_MESSAGE_DELETED_FAIL:
      return { ...state };
    case OWN_MESSAGE_DELETED:
      return { ...state, selectedMessages: [] };
    case OWN_MESSAGE_UPDATED:
      const editedMessage = action.edited;
      const updatedList2 = state.list.map(message => {
        if (message.messageId === editedMessage.messageId) {
          return editedMessage
        }
        return message;
      });

      return { ...state, selectedMessages: [], list: updatedList2 };
    case OWN_MESSAGE_UPDATED_FAIL:
      return { ...state };
    case MESSAGE_COPY:
      return { ...state, selectedMessages: [] };
    case ADD_MESSAGE_REACTION:
      return { ...state };
    case REMOVE_MESSAGE_REACTION:
      return { ...state, reactionMessage: action.message.messageId.toString() };
    case ADDED_MESSAGE_REACTION:
      console.log('added message: ', {action})
      console.log('added message react: ', action.message)
      let index = state.list.findIndex(m => m.messageId === action.message.messageId);
      let reactions = state.list[index].reactions;
      let reactionsIndex = reactions.findIndex(r => r.key === action.message.key)
      if (reactionsIndex > -1) {
        return update(state, {
          list: {
            [index]: {
              reactions: {
                [reactionsIndex]: {
                  userIds: { $push: [action.message.userId] }
                }
              }
            }
          },
          reactionMessage: { $set: '' }
        })
      } else {
        return update(state, {
          list: {
            [index]: {
              reactions: {
                $push: [{
                  key: action.message.key,
                  userIds: [action.message.userId],
                  updatedAt: action.message.updatedAt
                }]
              }
            }
          },
          reactionMessage: { $set: '' }
        })
      }
      break;
    case REMOVED_MESSAGE_REACTION:
      let message = action.message;
      let index1 = state.list.findIndex(m => m.messageId === message.messageId);
      let reactions1 = state.list[index1].reactions;
      let reactionsIndex1 = reactions1.findIndex(r => r.key === message.key)

      console.log({ index1, reactions1, reactionsIndex1 });
      // let userIdIndex = reactions1[reactionsIndex1].userIds.findIndex(u => u === message.userId)
      if (reactionsIndex1 > -1) {

        if (reactions1[reactionsIndex1].userIds.length > 1) {
          return update(state, {
            // list: {
            //   [index]: {
            //     reactions: {
            //       userIds: {
            //         $splice: [userIdIndex, 1]
            //       }
            //     }
            //   }
            // },
            reactionMessage: { $set: '' }
          })
        } else {
          return update(state, {
            list: {
              [index1]: {
                reactions: {
                  $splice: [[reactionsIndex1, 1]]
                }
              }
            },
            reactionMessage: { $set: '' }
          })
        }
      }
      // return { ...state, reactionMessage: { $set: message.messageId.toString() } }
      break;
    default:
      return state;
  }
};
