import { StyleSheet, Platform, StatusBar } from 'react-native';
import { PURPLE, GREEN } from '../../../../config/style';
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
  inputs: {
    marginTop: 38,
    paddingHorizontal: 38,
  },
  // inputItem: {
  //     marginTop: 20,
  // },
  inputItem: {
    backgroundColor: '#EBDFFF',
    borderRadius: 15,
    marginTop: 10,
    width: wp('85%'),
    alignSelf: 'center',
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
    paddingVertical: hp('2%'),
    paddingLeft: 15,
    width: wp('80%'),
    fontSize: hp('2%'),
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
});

export default styles;
