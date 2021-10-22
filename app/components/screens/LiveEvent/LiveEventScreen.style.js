import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { PURPLE, GREEN } from '../../../config/style';

const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: screenHeight * 0.025,
  },
  safeContainer: {
    flex: 1,
  },
  keyboardAwareScrollViewContainer: {
    paddingHorizontal: 20,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    color: PURPLE.purpleHeart,
  },
  leftIcon: {
    position: 'absolute',
    left: 0
  },
  headerText: {
    // fontFamily: 'SF Pro Rounded',
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'bold',
    // alignSelf: 'flex-end'
  },
  timesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeButton: {
    width: 275,
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 20,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('2%'),
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 5,
  },
  timeButtonSelected: {
    width: 275,
    height: 54,
    backgroundColor: '#6039FE',
    borderRadius: 20,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('2%'),
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 5,
  },
  timeText: {

  },
  timeTextSelected: {

  },

});

export default styles;