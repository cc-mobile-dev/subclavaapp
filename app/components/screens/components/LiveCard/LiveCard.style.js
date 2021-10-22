import { StyleSheet } from 'react-native';
import { GREEN, PURPLE } from '../../../../config/style';
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
    width: wp('40%'),
    height: 235,
    // width: 154,
    // height: 180,
    backgroundColor: '#421290',
    borderRadius: 20,
    shadowColor: '#8D45FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: hp('2%'),
    // paddingHorizontal: wp('5.2%'),
    marginRight: wp('5%'),
    // borderBottomColor: '#000',
    // borderWidth: 1
  },
  liveCard: {
    width: wp('42%'),
    height: 270,
    // width: 154,
    // height: 180,
    backgroundColor: '#421290',
    borderRadius: 20,
    shadowColor: '#8D45FF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: hp('2%'),
    // paddingHorizontal: wp('5.2%'),
    marginRight: wp('5%'),
    // borderBottomColor: '#000',
    // borderWidth: 1
  },
  time: {
    fontSize: hp('2.9%'),
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
    color: '#F6F0FF',
    marginTop: hp('0.2%'),
  },

  title: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'SF Pro Rounded Bold',
    color: '#E5FFE0',
    marginTop: hp('1.2%'),
    alignSelf: 'flex-start',
    // marginLeft: wp('1.6%'),
  },
  liveTitle: {
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'SF Pro Rounded Bold',
    color: '#E5FFE0',
    marginTop: hp('1%'),
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
    marginTop: hp('2%'),
  },

  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
    color: '#E5FFE0',
    marginTop: hp('-0.2%')
  },
  liveSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
    color: '#E5FFE0',
    marginLeft: wp('-1%')
  },
  subtitleSml: {
    fontSize: 8,
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
  backImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  profileImage: {
    // width: wp('8%'),
    // height: hp('4%'),
    width: 30,
    height: 30,
    borderRadius: 3,
    marginTop: hp('1%'),
  },
  liveProfileImage: {
    // width: wp('4%'),
    // height: hp('2%'),
    width: 24,
    height: 24,
    borderRadius: 3,
    marginRight: hp('1%')
  },
  bottomBar: {
    position: 'absolute',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    left: 0,
    right: 0,
    bottom: hp('2%'),
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderBottomStartRadius: 20,
    borderBottomRightRadius: 20,
  },
  topBar: {
    position: 'absolute',
    left: 10,
    right: 10,
    top: 15,
  },
  infoSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 4,
    marginLeft: wp('1.5%'),
    justifyContent: 'center',
  },
  timeView: {
    backgroundColor: '#379D4D',
    borderRadius: 7,
    padding: 7,
    paddingHorizontal: 7
  },
  timeContainer: {
    position: 'absolute',
    top: hp('1.7%'),
    left: hp('1.5%'),
  },
  bellContainer: {
    position: 'absolute',
    top: hp('1.8%'),
    right: hp('2%'),
  }
});

export default styles;
