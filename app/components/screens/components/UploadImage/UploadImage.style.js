import { StyleSheet, Platform, StatusBar } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PURPLE, GREEN } from '../../../../config/style';

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
  imageView: size => ({
    width: size || 50,
    height: size || 50,
    // marginTop: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%'),
  }),
  avatarImage: size => ({
    width: size || 50,
    height: size || 50,
    borderRadius: size / 2 || 25,
  }),
  avatarIconBkg: size => ({
    width: size || 50,
    height: size || 50,
    borderRadius: size / 4 || 25,
    backgroundColor: '#EBDFFF',
    alignItems: 'center',
    justifyContent: 'center',
  }),
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
    fontSize: 19,
    lineHeight: 22,
    color: PURPLE.eletricViolet,
    fontWeight: 'bold',
    marginTop: 10,
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
    width: wp('45%'),
    height: hp('6%'),
    backgroundColor: '#49D868',
    borderRadius: 20,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 5,
    marginBottom: hp('2%'),
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
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
