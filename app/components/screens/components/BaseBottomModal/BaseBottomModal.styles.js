import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  touchableView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#FFF',
  },
});

export default styles;
