import { StyleSheet, Platform, StatusBar } from 'react-native';
import { PURPLE } from '../../../../config/style';
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
  },
  header: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    lineHeight: 22,
    color: PURPLE.eletricViolet,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 38,
  },
  backIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    paddingLeft: 15,
    paddingRight: 20,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#7823FF',
    shadowColor: '#421290',
    shadowOffset: { width: 5, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginHorizontal: 25,
  },
  liveListItem: {
    backgroundColor: '#379D4D',
  },
  listItemImageWrapper: {
    // flex: 1,
    // borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  markerIcon: {
    fontSize: 24,
    color: PURPLE.eletricViolet,
  },
  listItemName: {
    width: wp('38%'),
    fontSize: hp('2.1%'),
    textAlign: 'left',
    color: '#F6F0FF',
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
    marginHorizontal: wp('2%'),
  },
  listItemSubtitle: {
    fontSize: hp('1.5%'),
    textAlign: 'left',
    color: '#F6F0FF',
    marginHorizontal: wp('2%'),
  },
  listItemLeftIcon: {
    fontSize: 24,
    color: PURPLE.eletricViolet,
  },
  chevronButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    borderRadius: 8,
    backgroundColor: '#421290',
  },
  lockButton: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5FFE0',
    width: 30,
    height: 30,
    marginLeft: 10
  },
  timer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FC3434',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 5,
    marginRight: 10,
  },
  timerText: {
    color: '#fff',
    fontSize: 14,
  },
  listItemInfo: {
    flex: 6,
  },
  right: {
    flex: 2,
    alignItems: 'flex-end',
  },
  rightElements: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronIcon: {
    color: '#F6F0FF',
    fontSize: 18,
    marginLeft: 1,
    marginTop: 1,
  },
  userIcon: {
    color: '#F6F0FF',
    fontSize: 14,
    marginLeft: 10,
    marginTop: 1,
    marginRight: 10
  },
  lockIcon: {
    color: '#379D4D',
    fontSize: 14,
    // padding: 8,
    // paddingHorizontal: 9,
  },
  menuItem: {
    marginTop: 50,
  },
  menuItemText: {
    fontSize: 25,
    lineHeight: 29,
    color: PURPLE.eletricViolet,
  },
  shadow: {
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 4,
  },
});

export default styles;
