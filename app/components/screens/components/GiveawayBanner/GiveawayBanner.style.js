import { StyleSheet } from 'react-native';
import { PURPLE } from '../../../../config/style/colors.style';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
    liveEvent: {
        alignItems: 'center',
        backgroundColor: '#6C38FF',
        width: wp('85%'),
        alignSelf: 'center',
        borderRadius: wp('15%'),
        padding: '3%',
        shadowOpacity: 0.15,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowColor: '#000',
        shadowRadius: 20,
        elevation: 5,
    },
    eventTimeText: {
        color: '#6C38FF',
        fontSize: 22,
        fontWeight: 'bold'
    },
    eventTitleText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    eventDescText: {
        color: '#FFF',
        fontSize: 15
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
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 5,
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
        color: PURPLE.eletricViolet,
        fontSize: 24,
        fontWeight: 'bold'
    },
});

export default styles;
