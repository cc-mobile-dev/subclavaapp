import { StyleSheet } from 'react-native';
import { PURPLE, GREEN } from '../../../config/style';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  mapView: {
    ...StyleSheet.absoluteFillObject
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
  homeButton: {
    bottom: 40,
  },
  searchButton: {
    right: 20,
    top: 45,
  },
  announcementButton: {
    left: 20,
    top: 45,
  },
  mapIconImage: {
    width: 20,
    height: 20,
  },
  buttonIcon: {
    color: '#FFF',
    fontSize: 24,
  },
  locationButton: {
    bottom: 40,
    right: 20,
    backgroundColor: GREEN.riptide,
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
  markerIcon: {
    fontSize: 24,
    color: PURPLE.eletricViolet,
  },
});

export default styles;
