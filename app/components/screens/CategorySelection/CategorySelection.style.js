import { StyleSheet, Platform, StatusBar } from 'react-native';
import { PURPLE, GREEN } from '../../../config/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
  },
  keyboardAwareScrollViewContainer: {
    paddingHorizontal: 20,
  },
  box: {
    width: '45%',
    height: '50%',
    paddingVertical: '1.5%',
    paddingHorizontal: '2%',
  },
  innerInactive: {
    flex: 1,
    backgroundColor: '#7025E8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: '#843EDE',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  innerActive: {
    flex: 1,
    backgroundColor: '#49D868',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: '#843EDE',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  category: {
    fontSize: 19,
    fontWeight: 'bold',
    paddingTop: 25,
    color: '#fff',
  },
  safeContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 50,
    // alignItems: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 19,
    lineHeight: 22,
    color: PURPLE.eletricViolet,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 40,
  },
  title: {
    width: '100%',
    // height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '5%',
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingBottom: '5%',
    paddingTop: '5%',
  },
  backButton: {
    // position: 'absolute',
    // left: 38,
  },
  backIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
    fontWeight: 'bold',
  },
  inactiveIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
  },
  activeIcon: {
    color: GREEN.turquoise,
    fontSize: 24,
  },
  categoryContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    // left:
  },
  greenButton: {
    width: 275,
    height: 54,
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
    marginTop: 15,
    marginBottom: 30
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
