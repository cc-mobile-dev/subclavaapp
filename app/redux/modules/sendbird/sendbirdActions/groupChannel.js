import SendBird from 'sendbird';

export const sbCreateGroupChannelListQuery = () => {
  let sb = SendBird.getInstance();
  return sb.GroupChannel.createMyGroupChannelListQuery();
};

export const sbGetGroupChannelList = groupChannelListQuery => {
  return new Promise((resolve, reject) => {
    groupChannelListQuery.next((channels, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channels);
      }
    });
  });
};

export const sbGetGroupChannel = channelUrl => {
  return new Promise((resolve, reject) => {
    let sb = SendBird.getInstance();
    sb.GroupChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbLeaveGroupChannel = channelUrl => {
  return new Promise((resolve, reject) => {
    let sb = SendBird.getInstance();
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.leave((response, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      })
      .catch(error => reject(error));
  });
};

export const sbHideGroupChannel = channelUrl => {
  return new Promise((resolve, reject) => {
    let sb = SendBird.getInstance();
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.hide((response, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      })
      .catch(error => reject(error));
  });
};

export const sbCreateUserListQuery = () => {
  let sb = SendBird.getInstance();
  return sb.createApplicationUserListQuery();
};

export const sbGetUserList = userListQuery => {
  return new Promise((resolve, reject) => {
    userListQuery.next((users, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(users);
      }
    });
  });
};

export const sbCreateGroupChannel = (inviteUserIdList, isDistinct) => {
  return new Promise((resolve, reject) => {
    let sb = SendBird.getInstance();
    sb.GroupChannel.createChannelWithUserIds(inviteUserIdList, isDistinct, (channel, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbCreateGroupChannelWithParams = ({ isPublic, isEphemeral, isDistinct, name, channelUrl, coverImage }) => {
  return new Promise((resolve, reject) => {
    let sb = SendBird.getInstance();
    let params = new sb.GroupChannelParams();
    params.isPublic = isPublic;
    params.isEphemeral = isEphemeral;
    params.isDistinct = isDistinct;
    // params.addUserIds(['John', 'Harry']);
    // params.operatorIds = ['Jay'];   // Or .operators(Array<User>)
    params.name = name;
    params.channelUrl = channelUrl; // In a group channel, you can create a new channel by specifying its unique channel URL in a 'GroupChannelParams' object. 
    params.coverUrl = coverImage;       // Or .coverUrl = COVER_URL;
    // params.data = DATA;
    // params.customType = CUSTOM_TYPE;
    sb.GroupChannel.createChannel(params, (channel, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbJoinGroupChannel = (channelUrl, isPublic = true) => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.join((response, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const sbInviteGroupChannel = (inviteUserIdList, channelUrl) => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.inviteWithUserIds(inviteUserIdList, (channel, error) => {
          if (error) {
            reject(error);
          } else {
            resolve(channel);
          }
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};
