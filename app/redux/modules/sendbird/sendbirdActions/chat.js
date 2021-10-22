import { sbGetOpenChannel } from './openChannel';
import { sbGetGroupChannel } from './groupChannel';
import SendBird from 'sendbird';

export const sbCreatePreviousMessageListQuery = (channelUrl, isOpenChannel) => {
  return new Promise((resolve, reject) => {
    if (isOpenChannel) {
      sbGetOpenChannel(channelUrl)
        .then(channel => resolve(channel.createPreviousMessageListQuery()))
        .catch(error => reject(error));
    } else {
      sbGetGroupChannel(channelUrl)
        .then(channel => resolve(channel.createPreviousMessageListQuery()))
        .catch(error => reject(error));
    }
  });
};

export const sbGetMessageList = previousMessageListQuery => {
  const limit = 30;
  const reverse = true;
  return new Promise((resolve, reject) => {
    previousMessageListQuery.load(limit, reverse, (messages, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(messages);
      }
    });
  });
};

export const sbGetMessages = (channel, timestamp, options) => {
  return new Promise((resolve, reject) => {
    sbGetOpenChannel(channel)
      .then(channel => {
        channel.getPreviousMessagesByTimestamp(
          timestamp,
          options.inclusive || true,
          options.limit || 30,
          options.reverse || true,
          '',
          '',
          [],
          options.includeMetaArrays || true,
          options.includeReactions || true,
          (messages, error) => {
            if (messages) {
              resolve(messages)
            } else {
              reject('Could not list messages')
            }
          })
      })
  })
}

export const sbSendTextMessage = (channel, textMessage, callback) => {
  if (channel.isGroupChannel()) {
    channel.endTyping();
  }

  let sb = SendBird.getInstance();

  let params = new sb.UserMessageParams();
  params.message = textMessage.message;

  if (textMessage.mentionedUserIds) {
    textMessage.mentionedUserIds
    params.mentionedUserIds = textMessage.mentionedUserIds || [];
  }
  if (textMessage.mentionType) {
    params.mentionType = textMessage.mentionType || 'users';
  }
  return channel.sendUserMessage(params, (message, error) => {
    callback(message, error);
  });
};

export const sbSendFileMessage = (channel, file, callback) => {
  const data = '';
  const customType = '';
  const thumbSizeList = [{ maxWidth: 160, maxHeight: 160 }];
  const startTime = Date.now() / 1000;
  const clearIntervalId = setInterval(() => {
    const curTime = Date.now() / 1000;
    if (curTime - startTime > 1 * 60 * 60) {
      clearInterval(clearIntervalId);
    }
    if (SendBird.getInstance() && SendBird.getInstance().getConnectionState() === 'OPEN') {
      clearInterval(clearIntervalId);
      channel.sendFileMessage(file, data, customType, thumbSizeList, (message, error) => {
        callback(message, error);
      });
    }
  }, 500);
};

export const sbCreateExtraData = (channel, message, keys = ['reactions', 'reactedUsers']) => {
  return new Promise((resolve, reject) => {
    channel.createMessageMetaArrayKeys(message, keys, (m, error) => {
      if (!error) {
        resolve(m)
      } else {
        console.log(error);
        reject('Cannot create Array keys')
      }
    })
  })
}

export const sbAddExtraData = (channel, message, values) => {
  return new Promise((resolve, reject) => {
    channel.addMessageMetaArrayValues(message, values, (m2, error) => {
      if (!error) {
        resolve(m2)
      } else {
        console.log(error);
        reject('Cannot add Array keys')
      }
    })
  })
}

export const sbTypingStart = channelUrl => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.startTyping();
        resolve(channel);
      })
      .catch(error => reject(error));
  });
};

export const sbTypingEnd = channelUrl => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.endTyping();
        resolve(channel);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const sbIsTyping = channel => {
  if (channel.isTyping()) {
    const typingMembers = channel.getTypingMembers();
    if (typingMembers.length == 1) {
      return `${typingMembers[0].nickname} is typing...`;
    } else {
      return 'several member are typing...';
    }
  } else {
    return '';
  }
};

export const sbChannelDeleteMessage = (channel, message) => {
  return new Promise((resolve, reject) => {
    channel.deleteMessage(message, (response, error) => {
      console.log('delete error: ', error)
      error ? reject(error) : resolve(response);
    });
  });
};

export const sbChannelUpdateMessage = (channel, message, contents) => {
  return new Promise((resolve, reject) => {
    let sb = SendBird.getInstance();
    const params = new sb.UserMessageParams()
    params.message = contents.message;
    channel.updateUserMessage(message.messageId, params, (response, error) => {
      error ? reject(error) : resolve(response);
    });
  });
};

export const sbMarkAsRead = ({ channelUrl, channel }) => {
  if (channel) {
    channel.markAsRead();
  } else {
    sbGetGroupChannel(channelUrl).then(channel => channel.markAsRead());
  }
};


export const sbSetAppState = (state = 'active') => {
  const sb = SendBird.getInstance();
  return state === 'active' ? sb.setForegroundState() : sb.setBackgroundState();
}

export const sbAddReaction = ({ channelUrl, message, emoji }) => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        console.log({ channel, channelUrl, message });
        return channel.addReaction(
          message,
          emoji,
          (reaction, error) => {
            console.log(reaction, error)
            if (!error) {
              message.applyReactionEvent(reaction)
              resolve(reaction)
            } else {
              console.log(error);
              reject();
            }
          }
        )
      });
  })
}

export const sbRemoveReaction = ({ channelUrl, message, emoji }) => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        return channel.deleteReaction(
          message,
          emoji,
          (reaction, error) => {
            if (!error) {
              message.applyReactionEvent(reaction)
              resolve(reaction)
            } else {
              console.log(error);
              reject();
            }
          }
        )
      });
  })
}