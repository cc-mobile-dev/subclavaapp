import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardContainer: {
    width: wp('100%'),
    marginBottom: hp('26%'),
    paddingHorizontal: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    width: wp('100%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  card: {
    // width: wp('38%'),
    // height: hp('21%'),
    width: 154,
    height: 180,
    backgroundColor: '#421290',
    borderRadius: 20,
    shadowColor: '#8D45FF',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: wp('5.2%'),
    margin: 10,
  },
  time: {
    fontSize: hp('2.9%'),
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
    color: '#F6F0FF',
    marginTop: hp('0.2%'),
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
    color: '#E5FFE0',
    marginTop: hp('1%'),
    marginBottom: hp('0.2%'),
    alignSelf: 'flex-start',
    // marginLeft: wp('1.6%'),
  },

  purchase: {
    width: wp('30%'),
    height: 36,
    backgroundColor: '#6822DA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('1.4%'),
  },

  purchaseTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
    color: '#E5FFE0',
  },

  header: {
    fontSize: hp('2.0%'),
    lineHeight: hp('2.4%'),
    fontFamily: 'SF Pro Rounded',
    fontWeight: 'bold',
    color: '#333',
    marginTop: hp('4%'),
    textAlign: 'center',
    paddingHorizontal: wp('1.4%'),
  },
});

export default styles;
