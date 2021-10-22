import { StyleSheet, Platform, StatusBar } from 'react-native';
import { GREEN, PURPLE } from '../../../../config/style';

const styles = StyleSheet.create({
    inactiveIcon: {
        color: PURPLE.eletricViolet,
        fontSize: 24,
    },
    activeIcon: {
        color: GREEN.turquoise,
        fontSize: 24
    },
});

export default styles;
