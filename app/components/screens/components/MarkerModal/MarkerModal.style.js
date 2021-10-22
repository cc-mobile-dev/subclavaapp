import { StyleSheet } from 'react-native';
import { PURPLE } from '../../../../config/style/colors.style';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    alignItems: 'center',
    height: 320,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerLine: {
    width: 40,
    height: 4,
    borderRadius: 10,
    marginBottom: 40,
    backgroundColor: PURPLE.eletricViolet,
  },
  infoContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
    paddingVertical: 12,
    width: 300
  },
  header: {
    // marginRight: 25
    // flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 8,
    borderColor: PURPLE.purpleHeart,
    // alignSelf: 'flex-start'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    // borderWidth: 8,
    // borderColor: PURPLE.purpleHeart,
    shadowOpacity: 0.25,
    // paddingRight: 50,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    alignSelf: 'center'
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    // alignSelf: 'center',
    marginRight: 50
  },
  title: {
    // flex: 1,
    fontSize: 22,
    // lineHeight: 26,
    fontWeight: 'bold',
    // marginLeft: 5,
    // marginRight: 55,
    // color: PURPLE.eletricViolet,
    textAlign: 'center',
    
  },
  description: {
    textAlign: 'center',
    // color: PURPLE.eletricViolet,
    fontSize: 17,
    // lineHeight: 20,
    marginTop: 20,
    // marginLeft: 20
  },
  joinButton: {
    backgroundColor: PURPLE.eletricViolet,
    marginTop: 30,
    height: 30,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: '#000',
    shadowRadius: 20,
    elevation: 5,
  },
  joinButtonText: {
    color: '#FFF',
    fontSize: 17,
    lineHeight: 20,
  },
});

export default styles;
