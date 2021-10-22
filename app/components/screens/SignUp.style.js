// packages
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const signUpStyle = StyleSheet.create({
  Container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 40,
    paddingTop: hp('5%'),
    paddingBottom: hp('20%'),
  },

  BackBtnWrapper: {
    width: wp('4%'),
    height: hp('4%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('1%'),
  },
  HeaderWrapper: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },

  SignUpHeader: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: '#E5FFE0',
    paddingLeft: 5,
  },
  Content: {
    marginTop: 20,
  },
  WrapperInput: {
    flexDirection: 'row',
    backgroundColor: '#EBDFFF',
    borderRadius: 20,
    marginVertical: hp('1%'),
  },

  Input: {
    height: hp('7%'),
    width: '100%',
    fontSize: hp('2%'),
    fontFamily: 'SF Pro Rounded',
    paddingLeft: 10,
    color: '#000',
  },

  TalentWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1%'),
    lineHeight: hp('2%')
  },

  TalentText: {
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'SF Pro Rounded',
  },

  AgreeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  AgreeLink: {
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    color: '#E5FFE0',
    textDecorationLine: 'underline',
    fontFamily: 'SF Pro Rounded',
    lineHeight: hp('2%'),
  },

  SignUpBtn: {
    height: hp('7%'),
    width: wp('80%'),
    backgroundColor: '#379D4D',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('5%'),
    borderRadius: 20,
  },

  SignUpBtnText: {
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    color: '#E5FFE0',
    alignSelf: 'center',
    fontFamily: 'SF Pro Rounded',
  },
});

export default signUpStyle;
