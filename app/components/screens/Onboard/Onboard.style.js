// packages
import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// modules
import { percentage } from '../../../utilities';
// import { black } from 'react-native-paper/lib/typescript/src/styles/colors';

const onboard = StyleSheet.create({
  container: {
    flex: 1,
  },
  // skip button wrapper
  headerWrapper: {
    width: percentage(100),
    height: percentage(20),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    zIndex: 100,
  },

  // holds onboarding images
  imageWrapper: {
    width: wp('100%'),
    height: hp('65%'),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  mainImage: {
    width: wp('56%'),
    height: hp('28%'),
    resizeMode: 'stretch',
    marginTop: percentage(20),
  },
  fadedLeft: {
    width: percentage(30),
    height: percentage(2),
    marginBottom: percentage(40),
    resizeMode: 'stretch',
    position: 'absolute',
    alignSelf: 'flex-start',
    top: 75,
    left: 25,
  },
  fadedRight: {
    width: percentage(30),
    height: percentage(0),
    marginBottom: percentage(40),
    resizeMode: 'stretch',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: -170,
    right: 30,
  },
  // holds onboarding text & dot navigation
  rectangle: {
    width: percentage(100),
    height: hp(35),
    position: 'relative',
    // top: hp(55),
    // left: 0,
    elevation: 50,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    padding: percentage(6),
  },
  heading: {
    fontWeight: 'bold',
    fontSize: hp('3.2%'),
    lineHeight: 30,
    textAlign: 'center',
    color: '#F6F0FF',
    marginTop: 50,
    // color: PURPLE.electricViolet,
  },
  text: {
    fontWeight: '400',
    fontSize: hp('2.2%'),
    lineHeight: hp('2.8%'),
    textAlign: 'center',
    color: '#F6F0FF',
    // color: PURPLE.electricViolet,
    paddingTop: percentage(1),
    paddingBottom: percentage(15),
  },

  completeWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5FFE0',
    width: wp('27%'),
    height: hp('5%'),
    borderRadius: 14,
    marginRight: percentage(5),
  },
  completeText: {
    fontWeight: 'bold',
    fontSize: hp('2%'),
    lineHeight: 22,
    color: '#379D4D',
  },
  skipWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#421290',
    width: wp('27%'),
    height: hp('5%'),
    borderRadius: 14,
    marginRight: percentage(5),
  },
  skipText: {
    fontWeight: 'bold',
    fontSize: hp('2%'),
    lineHeight: 22,
    color: '#F6F0FF',
  },

  // contains all of the dots
  dotWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#421290',
    marginHorizontal: 3,
  },
});

export default onboard;

// navTab: {
//   flex: 1,
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   // paddingTop: percentage(10),
//   // paddingBottom: percentage(10),
// },
// navTab3: {
//   flex: 1,
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   // paddingTop: percentage(10),
//   // marginTop: percentage(10),
//   paddingBottom: percentage(10),
// },
