import { StyleSheet, Platform, StatusBar } from 'react-native';
import { PURPLE, GREEN } from '../../../config/style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  editButton: {
    position: 'absolute',
    right: 32,
  },
  editIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
  },
  saveIcon: {
    color: GREEN.turquoise,
    fontSize: 24,
  },
  imageView: {
    width: 50,
    height: 50,
    marginTop: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarIconBkg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: GREEN.turquoise,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 24,
  },
  avatarEditButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PURPLE.eletricViolet,
  },
  avatarEditIcon: {
    color: '#FFF',
    fontSize: 8,
  },

  wrapperTopInput: {
    backgroundColor: '#EBDFFF',
    borderRadius: 20,
    marginTop: hp('5%'),
    marginBottom: hp('1%'),
  },
  wrapperInput: {
    backgroundColor: '#EBDFFF',
    borderRadius: 20,
    marginVertical: hp('1%'),
  },
  wrapperReset: {
    height: 54,
    width: wp('60%'),
    backgroundColor: '#421290',
    borderRadius: wp('4%'),
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  containerWrapper: {
    flex: 1,
    paddingTop: hp('2%'),
    paddingHorizontal: 30,
  },

  imageWrapper: {
    marginVertical: hp('2%'),
  },

  inputs: {
    height: hp('7%'),
    width: '100%',
    fontSize: hp('2%'),
    fontFamily: 'System',
    paddingLeft: 15,
    color: '#000'
  },
  inputItem: {
    marginTop: 20,
  },
  inputLabelWrapper: {
    alignSelf: 'flex-start',
  },
  inputLabel: {
    fontSize: 19,
    lineHeight: 22,
    color: PURPLE.eletricViolet,
  },
  inputLabelUnderline: {
    height: 3,
    borderRadius: 10,
    backgroundColor: GREEN.turquoise,
    marginTop: 3,
  },
  input: {
    fontSize: hp('2%'),
    fontFamily: 'SF Pro Rounded',
    color: '#F6F0FF',
  },
  deleteButton: {
    width: 220,
    height: 39,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 100,
    backgroundColor: '#E83E3E',
    borderRadius: 10,
  },
  greenButton: {
    height: 54,
    width: wp('60%'),
    backgroundColor: '#49D868',
    borderRadius: wp('4%'),
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 5,
    marginBottom: hp('7%'),
  },
  deleteButtonText: {
    fontSize: 19,
    lineHeight: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  editModeDescription: {
    fontSize: 12,
    lineHeight: 14,
    marginTop: 100,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
});

export default styles;
