import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PURPLE } from '../../../config/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PURPLE.eletricViolet
  },
  videoView: {
    flex: 1,
    padding: 0,
    backgroundColor: '#000',
    borderRadius: 20,
    borderColor: '#000'
  },
  topBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 35,
    zIndex: 999999
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30
  },
  iconButton: {
    paddingVertical: 8,
    paddingHorizontal: 9,
    borderRadius: 20,
    backgroundColor: PURPLE.eletricViolet
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  startButton: (isLive) => ({
    backgroundColor: isLive ? '#f00' : PURPLE.eletricViolet,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15
  }),
  surfaceView: {
    flex: 1
  }
});

export default styles;
