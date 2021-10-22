import { StyleSheet, Platform, StatusBar } from 'react-native';
import { PURPLE } from '../../../config/style';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 50 : 50,
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
        marginTop: 30,
        paddingHorizontal: 30,
    },
    lastListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        paddingHorizontal: 30,
        paddingBottom: 30
    },
    listItemImageWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
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
        zIndex: 4
    },
});

export default styles;
