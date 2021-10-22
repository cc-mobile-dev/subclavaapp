import { StyleSheet, Dimensions } from 'react-native';
import { PURPLE, GREEN } from '../../../config/style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#222',
    // backgroundColor: '#421290',
    backgroundColor: '#fff',
  },
  safeContainer: {
    flex: 1,
  },
  keyboardAwareScrollViewContainer: {
    paddingHorizontal: 20,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    // alignSelf: 'flex-start',
    flex: 1,
  },
  headerText: {
    // fontFamily: 'SF Pro Rounded',
    fontSize: 34,
    width: 200,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  submitButton: {
    alignSelf: 'flex-end',
    paddingTop: 30,
    lineHeight: 20,
  },
  chatImageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  editCircle: {
    backgroundColor: '#957BFF',
    zIndex: 5,
    width: 28,
    height: 28,
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 60,
    marginTop: 40,
    marginBottom: -41,
    paddingTop: 2,
  },
  cameraButton: {
    width: 80,
    height: 80,
    borderRadius: 50,
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
    width: 60,
    height: 60,
  },
  uploadedPicture: {
    width: 60,
    height: 60,
    borderRadius: 35,
  },
  chatroomPictureText: {
    color: '#A1A1A1',
    marginTop: hp('1%'),
    alignSelf: 'center',
    fontSize: hp('1.3%'),
    lineHeight: 18,
    // marginBottom: 36,
  },

  imageWrapper: {
    marginTop: 10,
  },

  textWrapper: {
    marginHorizontal: wp('1.4%'),
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },

  CreateHeader: {
    fontSize: hp('1.5%'),
    color: '#A1A1A1',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  CreateBody: {
    fontSize: hp('2%'),
    color: '#333',
    marginTop: 2,
    textAlign: 'center',
  },

  inputSection: {
    marginTop: 24,
  },
  inputTitle: {
    // color: PURPLE.eletricViolet,
    fontSize: 19,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  WrapperInput: {
    backgroundColor: '#EBDFFF',
    borderRadius: 20,
    marginTop: hp('3%'),
    width: wp('85%'),
    alignSelf: 'center',
  },
  input: {
    color: 'black',
    height: hp('7%'),
    width: '100%',
    fontSize: hp('2%'),
    fontFamily: 'SF Pro Rounded',
    paddingLeft: 15,
    paddingRight: 10,
  },
  inputDescription: {
    color: 'black',
    height: hp('15%'),
    width: '100%',
    fontSize: hp('2%'),
    fontFamily: 'SF Pro Rounded',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
  },
  allowShareSection: {
    height: hp('7%'),
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 20,
    marginVertical: hp('0.5%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#EBDFFF',
  },
  allowShareText: {
    fontSize: 14,

    color: '#848383',
    // alignSelf: 'flex-start',
    // width: 250,
    lineHeight: 25,
  },
  allowShareToggleContainer: {
    // alignSelf: 'flex-end'
    justifyContent: 'center',
    marginRight: wp('5%'),
  },
  allowShareEnabled: {
    fontSize: 15,
    color: GREEN.turquoise,
    fontWeight: 'bold',
  },
  allowShareDisabled: {
    fontSize: 15,
    fontWeight: 'bold',
    color: PURPLE.med,
  },
  sliderOutside: {
    borderColor: '#7025E8',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  sliderInsideEnabled: {},
  sliderInsideDisabled: {},
  actionButtonIcon: {
    color: '#FFF',
    fontSize: 24,
  },
  actionButtonImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  headerTitle: {
    // fontFamily: 'SF Pro Rounded',
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'bold',
    // alignSelf: 'flex-end'
  },
  joinButton: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#6039FE',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  joinButtonTitle: {
    fontWeight: 'bold',
    color: '#6039FE',
    paddingBottom: 5,
    fontSize: 20,
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
  greenButton: {
    height: 54,
    width: wp('60%'),
    backgroundColor: '#49D868',
    borderRadius: wp('3%'),
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowColor: '#000',
    shadowRadius: 30,
    elevation: 5,
    marginTop: 20,
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitleStyle: {
    fontSize: hp('3.4%'),
    fontWeight: 'bold',
    paddingTop: 0,
    color: '#333',
    fontFamily: 'SF Pro Rounded',
  },
  headerStyle: {
    backgroundColor: '#fff',
    shadowOpacity: 0,
    height: hp('12%'),
    elevation: 0
  }
});

export default styles;
