import { StyleSheet } from 'react-native';
import { GREEN, PURPLE } from '../../../../config/style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  tag: inverted => ({
    backgroundColor: !inverted ? PURPLE.eletricViolet : '#fff',
    borderRadius: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  title: (inverted, size = 16) => ({
    color: inverted ? PURPLE.eletricViolet : '#fff',
    fontSize: size,
    fontWeight: 'bold',
    paddingLeft: 5,
  }),
});

export default styles;
