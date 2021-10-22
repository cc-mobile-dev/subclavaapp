import { StyleSheet, Platform, StatusBar } from 'react-native';
import { PURPLE, GREEN } from '../../../config/style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingTop: hp('5%'),
  },
  header: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 22,
    color: PURPLE.eletricViolet,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 38,
  },
  backIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
  },
  content: {
    alignContent: 'center',
    marginTop: 20,
    backgroundColor: '#FBF8FF',
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    borderRadius: wp('4%'),
    marginVertical: hp('1%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  notifItem: {
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    borderRadius: wp('4%'),
    marginVertical: hp('1%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuItemText: {
    fontSize: hp('2%'),
    fontFamily: 'SF Pro Rounded',
    color: '#333',
  },
  logOutButton: {
    width: wp('60%'),
    height: hp('7%'),
    backgroundColor: '#FC3434',
    borderRadius: hp('2%'),
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#FC3434',
    shadowRadius: 20,
    elevation: 5,
    marginBottom: hp('2%'),
    marginTop: hp('5%'),
  },
  logOutButtonText: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default styles;
