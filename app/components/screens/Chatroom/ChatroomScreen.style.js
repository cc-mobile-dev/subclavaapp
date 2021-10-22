import { StyleSheet, Platform, StatusBar } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { PURPLE, GREEN } from '../../../config/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 50 : 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PURPLE.eletricViolet,
    textAlign: 'center',
    position: 'absolute',
  },
  rightButtons: {
    position: 'absolute',
    flexDirection: 'row',
    // marginLeft: 20,
    right: 15,
  },
  settingsIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
  },
  backButton: {
    position: 'absolute',
    left: 30,
    // marginRight: 'auto'
  },
  inactiveIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
  },
  activeIcon: {
    color: GREEN.turquoise,
    fontSize: 24,
  },
  body: {
    paddingHorizontal: 40,
  },
  buttonIcon: {
    color: '#FFF',
    fontSize: 24,
  },
  actionButtonIcon: {
    color: '#FFF',
    fontSize: 24,
  },
  button: {
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 4,
  },
  graidentButton: {
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#FFF',
  },
  userTextStyle: {
    color: PURPLE.dark,
    fontSize: 14,
    top: -8,
    fontWeight: 'bold',
    marginBottom: -5,
    marginLeft: -10
  },
  textStyleUser: {
    color: 'white',
    fontSize: 16,
    top: -8,
    marginTop: 15
  },
  textStyleOther: {
    color: 'black',
    fontSize: 16,
    top: -8,
    marginTop: 15
  },
  wrapperStyleUser: {
    backgroundColor: '#6C38FF',
    padding: 10,
    marginTop: 15,
    maxWidth: wp('75%'),
    // justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flex: 1,
    flexDirection: 'row',
  },
  wrapperStyleOther: {
    backgroundColor: '#E8E8E8',
    padding: 10,
    maxWidth: wp('75%'),
    // justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flex: 1,
    flexDirection: 'row',
  },
  avatarSize: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  bubbleContainer: {
    marginTop: 25,
    marginLeft: 8,
    // maxWidth: wp('75%')
    // alignItems: 'flex-end'
    // flex: 1,
    // flexDirection: 'column'
  },
  emojiBorder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -5,
  },
  reactionCountContainerUser: {
    flexDirection: 'row',
    marginLeft: wp('12%')
  },
  reactionCountContainerOther: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: wp('12%')
  },
  reactionCountSurroundClear: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    alignItems: 'center',
    marginTop: -10,
    marginLeft: -5
  },
  reactionCountSurroundColored: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    alignItems: 'center',
    backgroundColor: '#37ADFF',
    marginTop: -10,
    marginLeft: -5
  },
  reactionCountText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  reactionBarContainerOther: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: 248,
    height: 40,
    borderRadius: 30,
    zIndex: 6,
    marginLeft: 75,
    top: 400,
    position: 'absolute',
  },
  reactionBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFFFF',
    width: 260,
    height: 48,
    borderRadius: 30,
    zIndex: 6,
    top: hp('50%'),
    marginLeft: 75,
    position: 'absolute',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 10,
  },
  emoji: {
    fontSize: 18,
  },
  emptyChat: {
    transform: [{ scaleY: -1 }],
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyChatText: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  toolbarContainer: {
    borderRadius: 20,
    borderTopWidth: 0,
    // backgroundColor: '#6039fe',
    // backgroundColor: '#6039fe',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 10,
  },
  longPressModal: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    height: 320,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#6039fe',
    justifyContent: 'center',
  },
  uploadIcon: {
    marginBottom: 10,
    marginTop: 0,
    marginLeft: 10
  },
  longPressModalButton: {
    padding: 8,
    margin: 8,
    alignItems: 'center',
    backgroundColor: '#6039fe',
  },
  optionBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    backgroundColor: '#fff',
    width: 375,
    height: 44,
    borderRadius: 20,
    marginLeft: 20,
    top: hp('90%'),
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 10,
  },
  optionText: {
    textDecorationLine: 'underline',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000'
  },
  mentionUsersBox: {
    position: 'absolute',
    bottom: 60,
    left: -30,
    right: -30,
    borderRadius: 10,
    paddingBottom: 0,
    marginBottom: 20,
    maxHeight: 300,
    backgroundColor: '#fff',
  },
  mentionUsersNoUpload: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: -30,
    borderRadius: 10,
    paddingBottom: 0,
    marginBottom: 20,
    maxHeight: 300,
    backgroundColor: '#fff',
  },
  emojiPicker: {
    color: 'black',
  },
});

export default styles;
