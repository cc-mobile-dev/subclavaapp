import { StyleSheet, Platform, StatusBar } from 'react-native';
import { PURPLE } from '../../../config/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  button: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PURPLE.eletricViolet,
    alignItems: 'center',
    justifyContent: 'center',
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
  headerStyle: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 50,
  },
  headerTitle: {
    color: PURPLE.eletricViolet,
    fontWeight: 'bold',
    fontSize: 16,
  },
  notificationItem: {
    flex: 1,
    // justifyContent: 'center',
    paddingVertical: 10,
    // paddingLeft: 5
    // alignSelf: 'center'
  },
  listItemImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 10,
    marginRight: 5,
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 15 },
    // shadowOpacity: 0.15,
    // shadowRadius: 30,
  },
  listItemImageWrapper: {
    // justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  markerIcon: {
    // fontSize: 24,
    // paddingLeft: 23,
    // color: PURPLE.eletricViolet,
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 18,
  },
  listItemName: {
    flex: 1,
    fontSize: 17,
    textAlign: 'center',
    color: PURPLE.eletricViolet,
    marginHorizontal: 20,
  },
  listItemLeftIcon: {
    fontSize: 24,
    color: PURPLE.eletricViolet,
  },
  deleteButton: {
    width: 32,
  },
  deleteButtonIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
  },
  menuItem: {
    marginTop: 50,
  },
  menuItemText: {
    fontSize: 16,
    color: '#555',
    marginTop: 3,
    marginLeft: 5
  },
  timeText: {
    fontSize: 13,
    color: '#555',
    marginTop: 0
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
  endView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1
  }
});

export default styles;
