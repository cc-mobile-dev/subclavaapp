import { StyleSheet, Platform, StatusBar } from 'react-native';
import { PURPLE } from '../../../config/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
  },
  keyboardAwareScrollViewContainer: {
    flex: 1,
    marginTop: 36,
  },
  header: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 50 : 50,
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 19,
    fontWeight: 'bold',
    color: PURPLE.eletricViolet,
    textAlign: 'center',
  },
  headerBackButton: {
    position: 'absolute',
    left: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBackButtonText: {
    fontSize: 24,
    color: PURPLE.eletricViolet,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  listItemImageWrapper: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: PURPLE.eletricViolet,
  },
  listItemImage: {
    width: '75%',
    height: '75%',
    borderRadius: 18,
    alignSelf: 'center'
  },
  listItemTextContainer: {
    flex: 1,
    // textAlign: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'center'
  },
  listItemName: {
    flex: 1,
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    color: PURPLE.eletricViolet,
    // marginLeft: 20,
    fontWeight: 'bold'
  },
  listItemDescription: {
    flex: 1,
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    color: PURPLE.eletricViolet,
    // marginLeft: 20,
  },
  listItemLeftIcon: {
    fontSize: 22,
    color: '#FFF',
  },
  listItemRightIcon: {
    fontSize: 24,
    color: PURPLE.eletricViolet,
    marginLeft: 20,
  },
  shadow: {
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: '#6C6C6C',
    shadowRadius: 20,
    elevation: 5,
  },
  filterTextInput: {
    color: '#FFF',
    backgroundColor: PURPLE.eletricViolet,
    height: 40,
    fontSize: 17,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginHorizontal: 56,
    marginVertical: 24,
  },
});

export default styles;
