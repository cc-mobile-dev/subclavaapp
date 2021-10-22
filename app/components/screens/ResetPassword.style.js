import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const resetstyles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#421290',
    paddingHorizontal: wp('5%'),
    position: 'relative',
  },

  ImageWrapper: {
    position: 'relative',
  },
  EmailImage: {
    width: wp('24%'),
    height: hp('12%'),
    position: 'absolute',
    marginLeft: wp('10%'),
    marginTop: hp('-18%'),
  },
  Header: {
    fontSize: hp('3.4%'),
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
    color: '#E5FFE0',
  },

  Body: {
    fontSize: hp('1.8%'),
    textAlign: 'center',
    fontFamily: 'System',
    color: '#fff',
    marginTop: hp('1%'),
    paddingHorizontal: '4%',
  },

  WrapperInput: {
    flexDirection: 'row',
    backgroundColor: '#ebdfff',
    borderRadius: hp('2%'),
    paddingLeft: 10,
    marginTop: hp('4%'),
    marginBottom: hp('1.5%'),
  },
  Input: {
    height: hp('8%'),
    width: wp('80%'),
    fontSize: hp('2%'),
    color: '#000'
  },
  resendWrapper: {
    flexDirection: 'row',
    textDecorationLine: 'underline',
  },
  caption: {
    fontSize: hp('1.8%'),
    fontFamily: 'SF Pro Rounded',
    color: '#fff',
  },
  captionBold: {
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
    fontFamily: 'SF Pro Rounded',
    textDecorationLine: 'underline',
    marginLeft: wp('1.5%'),
    color: '#E5FFE0',
  },

  BtnWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: hp('5%'),
    paddingHorizontal: wp('2%'),
  },

  SubmitBtn: {
    width: wp('40%'),
    height: hp('6%'),
    borderRadius: hp('2%'),
    backgroundColor: '#379D4D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  SubmitBtnText: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
    color: '#E5FFE0',
  },

  CancelBtn: {
    width: wp('40%'),
    height: hp('6%'),
    borderRadius: hp('2%'),
    backgroundColor: '#7823FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CancelBtnText: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
    color: '#E5FFE0',
  },
});
export default resetstyles;
