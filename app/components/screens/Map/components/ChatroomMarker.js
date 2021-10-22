import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';

import ChatImage from './LiveChatMarker';
import { PURPLE } from '../../../../config/style';
import { mapLogoIcon } from '../../../../utilities/constants';
import { percentage } from '../../../../utilities';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Platform } from 'react-native';


// const styles = StyleSheet.create({
//   marker: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     borderWidth: 8,
//     alignSelf: 'center',
//     borderColor: PURPLE.governorBay,
//   },
//   liveBackground: {
//     width: 75,
//     height: 75,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// });



class ChatroomMarker extends React.Component {
  state = {
    tracksViewChanges: true,
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.coordinate !== this.props.coordinate;
  // }

  onLoadEnd = () => {
    this.setState({ tracksViewChanges: false });
  }

  render() {
    const { coordinate, imageUrl, zIndex, onPress, isLive } = this.props;

    return (
      <Marker
        zIndex={zIndex}
        coordinate={coordinate}
        onPress={onPress}
        style={{
          width: Platform.select({
            ios: 56,
            android: 80
          }),
          height: Platform.select({
            ios: 56,
            android: 80
          })
        }}
      >
        <ChatImage source={imageUrl || mapLogoIcon} isLive={isLive} />
      </Marker>
    );
  };
};

export default ChatroomMarker;