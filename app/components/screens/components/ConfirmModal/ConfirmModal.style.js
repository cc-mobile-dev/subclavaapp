import { StyleSheet } from 'react-native';
import { PURPLE, GREEN } from '../../../../config/style/colors.style';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 40,
        paddingVertical: 20,
        alignItems: 'center',
        height: 240,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headerLine: {
        width: 44,
        height: 5,
        borderRadius: 2,
        marginBottom: 15,
        backgroundColor: PURPLE.eletricViolet,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 8,
        borderColor: PURPLE.purpleHeart,
    },
    title: {
        flex: 1,
        fontSize: 22,
        lineHeight: 26,
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 55,
        color: PURPLE.eletricViolet,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        color: PURPLE.eletricViolet,
        fontSize: 17,
        lineHeight: 20,
        marginTop: 15,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 28,
    },
    button: {
        backgroundColor: PURPLE.eletricViolet,
        height: 30,
        width: 80,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 17,
        lineHeight: 20,
    },
    yesButton: {
        backgroundColor: GREEN.turquoise,
        marginLeft: 4,
    },
});

export default styles;
