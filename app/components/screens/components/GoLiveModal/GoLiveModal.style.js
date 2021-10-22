import { StyleSheet } from 'react-native';
import { GREEN, PURPLE } from '../../../../config/style/colors.style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#421290',
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
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
    paddingVertical: 12,
    width: 300,
  },
  header: {
    // marginRight: 25
    // flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 8,
    borderColor: PURPLE.purpleHeart,
    // alignSelf: 'flex-start'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    // alignSelf: 'center',
    marginRight: 50,
  },
  input: {
    height: hp('8%'),
    width: wp('80%'),
    fontSize: hp('2%'),
    fontFamily: 'SF Pro Rounded',
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#000',
  },
  description: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,
    paddingBottom: 10,
    fontFamily: 'SF Pro Rounded',
    // lineHeight: 20,
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
    width: wp('40%'),
    height: hp('6%'),
    backgroundColor: GREEN.turquoise,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6039FE',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    borderRadius: 25,
    marginVertical: 10,
    marginTop: hp('2%'),
  },
  joinButtonTitle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: hp('2.2%'),
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
