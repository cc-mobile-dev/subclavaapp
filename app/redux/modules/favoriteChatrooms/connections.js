import AsyncStorage from '@react-native-community/async-storage';
import { getFavoriteChatrooms } from '../../../utilities';

export const favoriteChatrooms = async () => {
  try {
    const unparsedUser = await AsyncStorage.getItem('@clava:user');
    const user = await JSON.parse(unparsedUser);
    const response = await getFavoriteChatrooms(user.id);
    if (response.status === 'ok') {
      return response;
    }
    return {
      error: true,
      status: response.status,
      err: response,
    };
  } catch (err) {
    return {
      error: true,
      msg: 'Network error',
      err,
    };
  }
};
