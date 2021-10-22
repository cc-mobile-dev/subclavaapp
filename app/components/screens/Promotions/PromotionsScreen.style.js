import { StyleSheet, Platform, StatusBar } from 'react-native';
import { PURPLE, GREEN } from '../../../config/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    lineHeight: 22,
    color: PURPLE.eletricViolet,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 38,
  },
  backIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
    fontWeight: 'bold',
  },
  bellButton: {
    position: 'absolute',
    right: 32,
  },
  bellIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    paddingHorizontal: 30,
    height: 45,
  },
  listItemImageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 7,
    borderColor: PURPLE.eletricViolet,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  listItemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  markerIcon: {
    fontSize: 24,
    color: PURPLE.eletricViolet,
  },
  listItemBody: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  listItemName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: PURPLE.eletricViolet,
    textAlign: 'center'
  },
  listItemDescription: {
    fontSize: 12,
    color: PURPLE.eletricViolet,
    marginTop: 3,
  },
  listItemLeftIcon: {
    fontSize: 24,
    color: PURPLE.eletricViolet,
  },
  listItemRightButton: {
    width: 32,
    alignItems: 'center',
  },
  listItemRightButtonIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
  },
  menuItem: {
    marginTop: 50,
  },
  menuItemText: {
    fontSize: 25,
    lineHeight: 29,
    color: PURPLE.eletricViolet,
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
  noPromotions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voteButton: {
    backgroundColor: GREEN.turquoise,
    borderRadius: 10,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 56,
    marginBottom: 40,
  },
  voteButtonText: {
    fontSize: 15,
    lineHeight: 18,
    color: '#FFF',
  },
});

export default styles;
