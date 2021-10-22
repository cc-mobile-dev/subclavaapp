import { StyleSheet, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PURPLE, GREEN } from '../../../config/style';

const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: screenHeight * 0.07,
  },
  safeContainer: {
    flex: 1,
  },
  keyboardAwareScrollViewContainer: {
    paddingHorizontal: 20,
  },
  headerContainerAdmin: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainerUser: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '60%'
  },
  infoContainer: {
    // alignSelf: 'flex-start',
    marginTop: hp('4%'),
    flex: 1,
  },
  leftIcon: {
    alignSelf: 'flex-start',
    // width: '50%'
  },
  leftIconUser: {
    position: 'absolute',
    left: 0,
  },
  headerText: {
    // fontFamily: 'SF Pro Rounded',
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'bold',
    // alignSelf: 'flex-end'
  },
  backButton: {
    color: PURPLE.purpleHeart,
  },
  submitButton: {
    alignSelf: 'flex-end',
    paddingTop: 10,
    lineHeight: 20,
  },
  chatImageContainer: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
  },
  editCircle: {
    backgroundColor: '#957BFF',
    zIndex: 5,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 55,
    marginTop: 40,
    marginBottom: -40,
  },
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: PURPLE.eletricViolet,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    overflow: 'hidden',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 5,
  },
  cameraButtonIcon: {
    fontSize: 48,
    color: '#FFF',
  },
  chatroomPicture: {
    width: 50,
    height: 50,
  },
  uploadedPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatroomPictureText: {
    color: PURPLE.eletricViolet,
    marginTop: 12,
    alignSelf: 'center',
    fontSize: 15,
    lineHeight: 18,
    marginBottom: 36,
  },
  memberCountContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 25,
    alignSelf: 'center',
    marginBottom: 25,
  },
  memberCountText: {
    fontSize: 18,
  },
  inputSection: {
    marginTop: 24,
    flex: 1,
    alignItems: 'flex-start',
  },
  titleSection: {
    marginTop: hp('6%'),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputTitle: {
    // color: PURPLE.eletricViolet,
    fontSize: 19,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#ebdfff',
    borderRadius: hp('4%'),
    paddingLeft: 15,
    marginVertical: hp('1%'),
    height: hp('7%'),
    width: '100%',
    color: '#333',
    fontSize: hp('1.8%'),
  },
  allowShareSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('5%'),
    // justifyContent: 'space-between'
  },
  allowShareText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  allowShareToggleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  allowShareEnabled: {
    fontSize: 14,
    color: GREEN.turquoise,
    fontWeight: 'bold',
    marginTop: 2,
  },
  allowShareDisabled: {
    fontSize: 14,
    fontWeight: 'bold',
    color: PURPLE.med,
    marginTop: 2,
  },
  sliderOutside: {
    borderColor: '#7025E8',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  goLiveButton: {
    width: 275,
    height: 54,
    backgroundColor: '#49D868',
    borderRadius: 20,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('5%'),
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 5,
  },
  shareButton: {
    width: 275,
    height: 54,
    backgroundColor: '#6C38FF',
    borderRadius: 20,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('5%'),
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 5,
  },
  redButton: {
    width: 275,
    height: 54,
    backgroundColor: '#FF0000',
    borderRadius: 20,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 5,
    marginTop: hp('15%'),
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
