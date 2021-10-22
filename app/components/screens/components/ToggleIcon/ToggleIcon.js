import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FA5 from 'react-native-vector-icons/FontAwesome5'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './ToggleIcon.style';
import { ActivityIndicator } from 'react-native';

const ToggleIcon = props => {
    const {
        onToggle,
        initialValue = false,
        canToggle = true,
        tintColor,
        color = '#fff',
        activeColor = '#fff',
        inactiveColor = '#421290',
        activeIconColor,
        inactiveIconColor,
        activeIcon,
        inactiveIcon,
        size = 22,
        iconSize = 22,
        switchColor = false,
        style,
        iconType = 'feather',
    } = props;

    // useEffect(() => {
    //     setToggled(value)
    // }, [value])

    const [toggled, setToggled] = useState(initialValue)


    const name = canToggle ? (!toggled ? activeIcon : inactiveIcon) : activeIcon
    const iconColor = switchColor ? (toggled ? (inactiveIconColor || inactiveColor) : (activeIconColor || activeColor)) : '#fff'

    _renderIcon = (iconType) => {
        switch (iconType) {
            case 'font-awesome-5':
                return <FA5 color={iconColor} size={size} name={name} />
            case 'ionicons':
                return <Ionicons color={iconColor} size={size} name={name} />
            case 'material':
                return <Material color={iconColor} size={size} name={name} />
            default:
                return <Feather color={iconColor} size={size} name={name} />
        }
    }

    return (
        <TouchableOpacity
            style={{
                ...styles.iconButton,
                ...switchColor && {
                    backgroundColor: canToggle ? (toggled ? activeColor : inactiveColor) : activeColor
                },
                ...style
            }}
            onPress={() => {
                if (onToggle) {
                    onToggle(!toggled)
                }
                setToggled(!toggled)
            }}
        >
            {_renderIcon(iconType)}
        </TouchableOpacity>
    )
}

export default ToggleIcon;