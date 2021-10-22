// packages
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const signInStyle = StyleSheet.create({
  HeaderWrapper: {
    marginLeft: 5,
    marginBottom: hp('2%'),
    marginTop: hp('25%'),
  },

  KeyboardView: {
    height: 400,
  },

  SignInText: {
    fontSize: hp('4%'),
    color: '#e5ffe0',
    fontFamily: 'SF Pro Rounded',
    fontWeight: 'bold',
  },
  chatImage: {
    width: wp('20%'),
    height: hp('10%'),
    position: 'absolute',
    marginLeft: wp('60%'),
    marginTop: hp('15%'),
  },

  heartImage: {
    width: wp('20%'),
    height: hp('10%'),
    position: 'absolute',
    marginLeft: 0,
    marginTop: hp('5%'),
  },

  videoImage: {
    width: wp('20%'),
    height: hp('10%'),
    position: 'absolute',
    marginLeft: wp('20%'),
    marginTop: hp('72%'),
  },

  WrapperInput: {
    flexDirection: 'row',
    backgroundColor: '#ebdfff',
    borderRadius: 20,
    paddingLeft: 10,
    marginVertical: 10,
  },
  Input: {
    height: hp('8%'),
    width: wp('80%'),
    fontSize: hp('2%'),
    fontFamily: 'SF Pro Rounded',
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#000',
  },

  ForgotPassWrapper: {
    marginTop: 10,
  },

  ForgotPassword: {
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    lineHeight: hp('2%'),
    color: '#ebdfff',
    alignSelf: 'center',
    fontFamily: 'SF Pro Rounded',
    textDecorationLine: 'underline',
    lineHeight: hp('2%')
  },

  SignInBtnWrapper: {
    marginTop: hp('3%'),
  },

  SignInBtn: {
    width: wp('65%'),
    height: hp('6.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#379d4d',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    marginTop: hp('2%'),
  },
  BtnText: {
    fontSize: hp('2.2%'),
    color: '#E5FFE0',
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
  },
  WrapperSignUp: {
    flexDirection: 'row',
    height: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('20%'),
  },
  SignUpCTA: {
    fontSize: hp('2%'),
    color: '#E5FFE0',
    fontFamily: 'SF Pro Rounded',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  SignUpText: {
    fontSize: hp('2%'),
    color: '#ebdfff',
    fontFamily: 'SF Pro Rounded',
  },
});

export default signInStyle;
