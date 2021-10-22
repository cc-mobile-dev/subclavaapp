// packages
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const talentStyle = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#421290',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: hp('12%'),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: wp('7%'),
  },

  headerText: {
    fontSize: 19,
    fontFamily: 'SF Pro Rounded',
    fontWeight: 'bold',
    color: '#E5FFE0',
    height: hp('4.4%'),
  },

  chevronWrapper: {
    width: wp('4.4%'),
    height: hp('4.4%'),
  },

  contentWrapper: {
    paddingHorizontal: 25,
    paddingTop: hp('4%'),
  },

  body: {
    color: '#EBDFFF',
    fontSize: hp('2%'),
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },

  Input: {
    backgroundColor: '#ebdfff',
    borderRadius: hp('4%'),
    paddingLeft: 15,
    marginVertical: hp('1%'),
    height: hp('7.4%'),
    width: '100%',
    color: '#333',
    fontSize: hp('1.8%'),
  },

  chooseText: {
    color: '#EBDFFF',
    fontSize: hp('2%'),
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
    textAlign: 'center',
    marginVertical: hp('2%'),
  },

  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('0.5%'),
  },
  wrapperVertical: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: wp('25%'),
    alignSelf: 'center',
  },

  checkboxWrapper: {
    flexDirection: 'row',
  },

  AgreeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('4%'),
    marginBottom: hp('1%'),
  },

  AgreeLink: {
    fontSize: hp('1.9%'),
    fontWeight: 'bold',
    color: '#E5FFE0',
    textDecorationLine: 'underline',
    fontFamily: 'SF Pro Rounded',
    marginLeft: 5,
    paddingTop: hp('0.01%'),
  },

  chooseOption: {
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    color: '#E5FFE0',
  },

  ApplyBtn: {
    height: hp('7%'),
    width: wp('68%'),
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
    marginTop: hp('1%'),
    borderRadius: hp('4%'),
  },

  ApplyBtnText: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#E5FFE0',
    alignSelf: 'center',
    fontFamily: 'SF Pro Rounded',
  },
});

export default talentStyle;
