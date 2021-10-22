import { StyleSheet, Platform, StatusBar } from 'react-native';
import { PURPLE } from '../../../../config/style';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    content: {
        alignItems: 'center',
        marginTop: 20,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#7823FF',
        shadowColor: '#421290',
        shadowOffset: { width: 5, height: 15 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        marginHorizontal: 25
    },
    liveListItem: {
        backgroundColor: '#379D4D',
    },
    listItemImageWrapper: {
        flex: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItemImage: {
        width: 38,
        height: 38,
        borderRadius: 18,
    },
    markerIcon: {
        fontSize: 24,
        color: PURPLE.eletricViolet,
    },
    listItemName: {
        flex: 1,
        fontSize: hp('2.1%'),
        textAlign: 'left',
        color: '#F6F0FF',
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
    listItemSubtitle: {
        flex: 1,
        fontSize: hp('1.5%'),
        textAlign: 'left',
        color: '#F6F0FF',
        marginHorizontal: 20,
    },
    listItemLeftIcon: {
        fontSize: 24,
        color: PURPLE.eletricViolet,
    },
    chevronButton: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#421290',
    },
    lockButton: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E5FFE0',
    },
    timer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FC3434',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 5,
        marginRight: 10
    },
    timerText: {
        color: '#fff',
        fontSize: 14,
    },
    listItemInfo: {
        flex: 6
    },
    right: {
        flex: 2,
        alignItems: 'flex-end'
    },
    rightElements: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chevronIcon: {
        color: '#F6F0FF',
        fontSize: 18,
        padding: 3,
        paddingHorizontal: 4
    },
    lockIcon: {
        color: '#379D4D',
        fontSize: 18,
        padding: 3,
        paddingHorizontal: 4
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
    chatBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    container: {
        flex: 1,
        paddingBottom: 50,
        paddingHorizontal: 10
    }
});

export default styles;