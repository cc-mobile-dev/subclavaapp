import { StyleSheet } from 'react-native';
import { GREEN, PURPLE } from '../../../../config/style/colors.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: wp('5%'),
    // paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('33%'),
    backgroundColor: '#421290',
    // backgroundColor: PURPLE.eletricViolet,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  headerLine: {
    width: 40,
    height: 4,
    borderRadius: 10,
    marginBottom: 40,
    backgroundColor: PURPLE.eletricViolet,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
    // paddingVertical: 12,
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
  },
  header: {
    // marginRight: 25
    // flexDirection: 'row',
    // alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 32.5,
    // borderWidth: 8,
    // borderColor: PURPLE.purpleHeart,
    // alignSelf: 'flex-start'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 6,
    // borderWidth: 8,
    // borderColor: PURPLE.purpleHeart,
    shadowOpacity: 0.25,
    // paddingRight: 50,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp('6%'),

    // marginTop: hp('2%'),
    // alignSelf: 'center',
    // marginRight: 50
  },
  title: {
    // flex: 1,
    fontSize: hp('2%'),
    // lineHeight: 26,
    fontWeight: 'bold',
    // marginLeft: 5,
    // marginRight: 55,
    marginTop: hp('1.9%'),
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    color: '#fff',
    fontSize: hp('1.8%'),
    // lineHeight: 20,
    marginTop: hp('0.2%'),
    // marginLeft: 20
  },
  joinButton: {
    // flex: 1,
    // flexDirection: 'row',
    // backgroundColor: '#fff',
    // padding: 10,
    // marginTop: 30,
    // borderRadius: 20,
    // shadowOpacity: 0.15,
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowColor: '#000',
    // shadowRadius: 20,
    // elevation: 5,
    // marginVertical: 10,
    // flexWrap: 'wrap',
    paddingHorizontal: wp('10%'),
    paddingVertical: hp('1.4%'),
    marginTop: hp('4%'),
    backgroundColor: '#379D4D',
    // backgroundColor: GREEN.turquoise,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#6039FE',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    borderRadius: 15,
    flexDirection: 'row',
  },
  joinButtonTitle: {
    fontWeight: 'bold',
    color: '#E5FFE0',
    paddingBottom: 2,
    fontSize: hp('1.8%'),
  },
  joinButtonText: {
    fontSize: 16,
    color: '#838383',
    width: '100%',
    textAlign: 'left',
  },
  priceBubble: {
    backgroundColor: '#6039FE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 27,
    padding: 10,
  },
  priceBubbleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
