import SendBird from 'sendbird';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// import messaging from '@react-native-firebase/messaging';

// const APP_ID = '078105E7-BD8C-43C9-A583-59E334353965'; // test
const APP_ID = '9BFCA194-6D1E-4E85-B6AB-36E4E530F3E0'; // sample

export const sbRegisterPushToken = (token) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) {
      // messaging().registerForRemoteNotifications()
      //   .finally(() => {
      if (Platform.OS === 'ios') {
        // WARNING! FCM token doesn't work in request to APNs.
        // Use APNs token here instead.
        if (token) {
          sb.registerAPNSPushTokenForCurrentUser(token, (result, error) => {
            if (!error) {
              resolve();
            } else reject(error);
          });
        } else {
          resolve();
        }
      } else {
        if (token) {
          sb.registerGCMPushTokenForCurrentUser(token, (result, error) => {
            if (!error) {
              resolve();
            } else reject(error);
          });
        } else {
          resolve();
        }
      }
      // })
    } else {
      reject('SendBird is not initialized');
    }
  });
};
export const sbUnregisterPushToken = () => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) {
      if (Platform.OS === 'ios') {
        if (!apnsToken) {
          return resolve();
        }
        sb.unregisterAPNSPushTokenForCurrentUser(apnsToken, (result, error) => {
          if (!error) {
            resolve();
          } else reject(error);
        });
      } else {
        sb.unregisterGCMPushTokenForCurrentUser(token, (result, error) => {
          if (!error) {
            resolve();
          } else reject(error);
        });
      }
    } else {
      reject('SendBird is not initialized');
    }
  });
};

export const sbConnect = (userId, nickname) => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject('UserID is required.');
      return;
    }
    if (!nickname) {
      reject('Nickname is required.');
      return;
    }
    const sb = new SendBird({ appId: APP_ID });
    sb.connect(userId, (user, error) => {
      if (error) {
        reject('SendBird Login Failed.');
      } else {
        resolve(sbUpdateProfile(nickname));
      }
    });
  });
};

export const sbConnectWithToken = (userId, nickname, token) => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject('UserID is required.');
      return;
    }
    if (!token) {
      reject('Token is required.');
      return;
    }
    const sb = new SendBird({ appId: APP_ID });
    sb.connect(userId, token, (user, error) => {
      if (error) {
        console.log(error, userId, nickname, token);
        reject('SendBird Login Failed.');
      } else {
        resolve(sbUpdateProfile(nickname));
      }
    });
  });
};

export const sbUpdateProfile = (nickname, avatarUrl = null) => {
  return new Promise((resolve, reject) => {
    if (!nickname) {
      reject('Nickname is required.');
      return;
    }
    let sb = SendBird.getInstance();
    if (!sb) sb = new SendBird({ appId: APP_ID });
    sb.updateCurrentUserInfo(nickname, avatarUrl, (user, error) => {
      console.log(error)
      if (error) {
        reject('Update profile failed.');
      } else {
        AsyncStorage.setItem('user', JSON.stringify(user), () => {
          resolve(user);
        });
      }
    });
  });
};

export const sbDisconnect = () => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) {
      AsyncStorage.removeItem('user', () => {
        sb.disconnect(() => {
          resolve(null);
        });
      });
    } else {
      resolve(null);
    }
  });
};

export const sbGetCurrentInfo = () => {
  const sb = SendBird.getInstance();
  if (sb.currentUser) {
    return {
      profileUrl: sb.currentUser.profileUrl,
      nickname: sb.currentUser.nickname
    };
  }
  return {};
};

export const sbUserBlock = blockUserId => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sb.blockUserWithUserId(blockUserId, (user, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};

export const sbUserUnblock = unblockUserId => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sb.unblockUserWithUserId(unblockUserId, (user, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};

export const sbCreateBlockedUserListQuery = () => {
  const sb = SendBird.getInstance();
  return sb.createBlockedUserListQuery();
};

export const sbGetBlockUserList = blockedUserListQuery => {
  return new Promise((resolve, reject) => {
    blockedUserListQuery.next((blockedUsers, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(blockedUsers);
      }
    });
  });
};
