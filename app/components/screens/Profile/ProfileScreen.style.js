import { StyleSheet, Platform, StatusBar } from 'react-native';
import { PURPLE } from '../../../config/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8FF',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#FBF8FF',
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
    lineHeight: 20,
    color: PURPLE.eletricViolet,
    textAlign: 'center',
  },
  settingsButton: {
    position: 'absolute',
    right: 30,
  },
  settingsIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
  },
  body: {
    paddingHorizontal: 40,
  },
  buttonIcon: {
    color: '#FFF',
    fontSize: 24,
  },
  actionButtonIcon: {
    color: '#FFF',
    fontSize: 24,
  },
  actionButtonImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  button: {
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 4,
  },
  graidentButton: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default styles;
