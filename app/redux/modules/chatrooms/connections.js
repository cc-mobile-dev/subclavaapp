import { getFavoriteChatrooms } from '../../../utilities';
import { authState } from '../auth';
import getEnvVars from '../../../../environment';

// const API_BASE_URL = 'http://3.18.86.24:3000/api/v1/chatrooms';
// const API_BASE_URL = 'http://localhost:3000/api/v1/chatrooms';
const { chatroomServiceUrl } = getEnvVars();

export const getChatrooms = async params => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  try {
    const response = await fetch(`${chatroomServiceUrl}/chatrooms`, options);
    const responseJson = await response.json();
    if (response.status === 200) {
      return responseJson;
    }
    return {
      error: true,
      status: response.status,
      err: responseJson,
    };
  } catch (err) {
    return {
      error: true,
      msg: 'Network error',
      err,
    };
  }
};



export const userFavoriteChatrooms = async () => {
  try {
    const { currentUser } = authState;
    const response = await getFavoriteChatrooms(currentUser.id);
    const responseJson = await response.json();
    if (response.status === 200) {
      return responseJson;
    }
    return {
      error: true,
      status: response.status,
      err: responseJson,
    };
  } catch (err) {
    return {
      error: true,
      msg: 'Network error',
      err,
    };
  }
};
