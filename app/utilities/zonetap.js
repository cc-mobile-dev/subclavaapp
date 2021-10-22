import AsyncStorage from '@react-native-community/async-storage';
// import Constants from 'expo-constants';
import { getUniqueId, getDeviceName } from 'react-native-device-info';


const ZT_API_KEY = 'PN31F3BTK9';
const ZT_DEVICE_REQ = 'https://app.zonetap.com/api/device';
const ZT_COUPON_REQ = 'https://app.zonetap.com/api/coupons/active';
const ZT_COUPON_SERVED = 'https://app.zonetap.com/api/coupons/served';

const getDeviceIDFromAPI = async () => {
  try {
    let modelID = await getDeviceName();
    let deviceID = await getUniqueId();
    let response = await fetch(ZT_DEVICE_REQ, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_device: deviceID,
        id_company: ZT_API_KEY,
        model: modelID,
        firebase_token: Math.random() //Random value substituted for unused firebase functionality.
          .toString(36)
          .substring(2, 15),
      }),
    });
    let responseJson = await response.json();
    return responseJson.id;
  } catch (error) {
    console.error(error.message);
  }
};

const postServedPromos = async (lon, lat, acc, deviceID, servedResponseJSON) => {
  try {
    for (var i = 0; i < servedResponseJSON.length; i++) {
      let _id = servedResponseJSON[i]._id;
      fetch(ZT_COUPON_SERVED, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_device: deviceID,
          id_company: ZT_API_KEY,
          id_coupon: _id,
          gps_accuracy: acc,
          latitude: lat,
          longitude: lon,
        }),
      });
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getDeviceID = async () => {
  try {
    let deviceID = await AsyncStorage.getItem('@zonetap:deviceID');
    if (deviceID) {
      return deviceID;
    } else {
      let id = await getDeviceIDFromAPI();
      await AsyncStorage.setItem('@zonetap:deviceID', id);
      return id;
    }
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const checkActiveCoupons = async (latitude, longitude, accuracy = 1) => {
  try {
    let deviceID = await getDeviceID();
    let url =
      ZT_COUPON_REQ +
      '?id_device=' +
      deviceID +
      '&company=' +
      ZT_API_KEY +
      '&lat=' +
      latitude +
      '&lon=' +
      longitude +
      '&accuracy=' +
      accuracy;
    let response = await fetch(url);
    let responseJson = await response.json();
    await postServedPromos(latitude, longitude, accuracy, deviceID, responseJson);
    return responseJson;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
