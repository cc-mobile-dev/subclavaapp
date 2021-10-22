import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../utilities/navigation';
import getEnvVars from '../../environment';

const { authServiceUrl, uploadServiceUrl, chatroomServiceUrl } = getEnvVars();
const googleApiKey = 'AIzaSyAG00unaPjA7AE5NHoM40dFDp4hB5x-8GM';

export const fetchConstants = () => get('https://raw.githubusercontent.com/clava-app/json-constants/master/constants.json', {});

/***
  No AUTH Routes
***/
export const signIn = searchParams => post(`${authServiceUrl}/auth/login`, searchParams);
export const forgotPassword = searchParams =>
  post(`${authServiceUrl}/auth/forgot-password`, searchParams);
export const signUp = searchParams => post(`${authServiceUrl}/auth/register`, searchParams);
export const verify = searchParams => post(`${authServiceUrl}/auth/confirm`, searchParams);
export const resendVerify = searchParams =>
  post(`${authServiceUrl}/auth/resend-confirm`, searchParams);
export const refreshAccessToken = searchParams =>
  post(`${authServiceUrl}/auth/refresh`, searchParams);
export const resetPassword = searchParams => post(`${authServiceUrl}/auth/confirm-password`, searchParams);

/***
  AUTH Routes
 ***/
// User
export const updateUser = body => authRequest(`${authServiceUrl}/users`, body, 'PATCH');
export const updatePassword = body => authRequest(`${authServiceUrl}/users/change-password`, body, 'POST');
export const deleteUser = () => authRequest(`${authServiceUrl}/users`, null, 'DELETE');

// Upload
export const uploadImage = body => authRequest(`${uploadServiceUrl}/upload/image`, body);
export const uploadPublicImage = body => post(`${uploadServiceUrl}/upload/image/public`, JSON.stringify(body), 'application/json')

// Chatroom
export const getChatroom = chatroomId => authRequest(`${chatroomServiceUrl}/chatrooms/${chatroomId}`, null, 'GET')
export const createChatroom = body => authRequest(`${chatroomServiceUrl}/chatrooms`, body);
export const updateChatroom = (id, body) =>
  authRequest(`${chatroomServiceUrl}/chatrooms/${id}`, body, 'PUT');
export const deleteChatroom = id =>
  authRequest(`${chatroomServiceUrl}/chatrooms/${id}`, undefined, 'DELETE');
export const getJoinedChatrooms = userId =>
  authRequest(`${chatroomServiceUrl}/chatrooms?userId=${userId}`, null, 'GET');
export const addJoinedChatroom = body =>
  authRequest(`${chatroomServiceUrl}/chatrooms/memberAdd`, body, 'POST');
export const deleteJoinedChatroom = body =>
  authRequest(`${chatroomServiceUrl}/chatrooms/memberLeave`, body, 'DELETE');
export const getFavoriteChatrooms = userId =>
  authRequest(`${chatroomServiceUrl}/chatrooms?userId=${userId}`, null, 'GET');
export const addFavoriteChatroom = body =>
  authRequest(`${chatroomServiceUrl}/chatrooms/favorite`, body, 'POST');
export const deleteFavoriteChatroom = body =>
  authRequest(`${chatroomServiceUrl}/chatrooms/favorite`, body, 'DELETE');
export const getChatroomsByLocation = loc => authRequest(`${chatroomServiceUrl}/chatrooms/chatrooms-by-location?lat=${loc.lat}&long=${loc.long}&distance=${loc.distance}&units=${loc.units}`, null, 'GET')
export const getChatroomsByCategory = category => authRequest(`${chatroomServiceUrl}/chatrooms/chatrooms-by-category?category=${category}`, null, 'GET');
export const checkChatroomSubscriptions = body => authRequest(`${chatroomServiceUrl}/chatrooms/subscriptions`, body, 'POST')
// Notifications
export const getNotifications = () => authRequest(`${chatroomServiceUrl}/notifications`, null, 'GET');
export const updateNotifications = (body) => authRequest(`${chatroomServiceUrl}/notifications/update`, body, 'PUT');
export const voteForPromotions = body =>
  authRequest(`${chatroomServiceUrl}/promotionVote`, body, 'POST');

// Search
export const searchPlaces = params =>
  get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
    ...params,
    key: googleApiKey,
  });

export const getPlaceDetails = params =>
  get('https://maps.googleapis.com/maps/api/place/details/json', {
    ...params,
    key: googleApiKey,
  });

// Giveaway
export const getGiveaways = () => authRequest(`${chatroomServiceUrl}/giveaways`, null, 'GET')
export const getGiveaway = (id) => authRequest(`${chatroomServiceUrl}/giveaways/${id}`, null, 'GET')
export const createGiveaway = body => authRequest(`${chatroomServiceUrl}/giveaways`, body);
export const updateGiveaway = (id, body) =>
  authRequest(`${chatroomServiceUrl}/giveaways/${id}`, body, 'PUT');
export const deleteGiveaway = id =>
  authRequest(`${chatroomServiceUrl}/giveaways/${id}`, undefined, 'DELETE');

/***
 API Template
***/

const get = (url, params) => {
  const searchParams = Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    })
    .join('&');

  return fetch(`${url}?${searchParams}`).then(result => result.json());
};

const post = (url, searchParams, contentType = 'application/x-www-form-urlencoded') =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
    },
    body: searchParams,
  }).then(result => result.json());

const authRequest = (url, body, method = 'POST') => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessToken = await AsyncStorage.getItem('@clava:accessToken');

      if (!accessToken) {
        return reject(new Error('No access token'));
      }

      const result = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (result.status === 401) {
        const refreshToken = await AsyncStorage.getItem('@clava:refreshToken');
        const phoneNumber = await AsyncStorage.getItem('@clava:phoneNumber');

        if (!refreshToken || !phoneNumber) {
          reject(new Error('Refresh token not found'));
          AsyncStorage.clear();
          NavigationService.navigate('NoAuth');
          return;
        }

        const refreshResponse = await refreshAccessToken(
          `phoneNumber=${phoneNumber}&refreshToken=${refreshToken}`
        );

        if (refreshResponse.status === 'ok' && refreshResponse.data) {
          await AsyncStorage.setItem('@clava:accessToken', refreshResponse.data.accessToken);
          await AsyncStorage.setItem('@clava:refreshToken', refreshResponse.data.refreshToken);

          const retryResponse = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refreshResponse.data.accessToken}`,
            },
            body: body ? JSON.stringify(body) : undefined,
          });

          if (retryResponse.status === 401) {
            reject(new Error('Invalid access token'));
            AsyncStorage.clear();
            NavigationService.navigate('NoAuth');
            return;
          }

          const retryResponseJson = await retryResponse.json();
          return resolve(retryResponseJson);
        }

        reject(new Error('Refresh token failed'));
        AsyncStorage.clear();
        NavigationService.navigate('NoAuth');
        return;
      }

      const resultJson = await result.json();

      resolve(resultJson);
    } catch (err) {
      reject(err);
    }
  });
};
