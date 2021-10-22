import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import styles from './IconToggle.style';
import { ActivityIndicator } from 'react-native';

class IconToggle extends React.Component {
    render() {
        const { buttonProps, onToggle, active, onActive, onInactive, payload, iconProps, isLoading } = this.props;
        return (
            <TouchableOpacity
                {...buttonProps}
                onPress={(e) => {
                    if (onToggle) {
                        onToggle(payload)
                    } else {
                        if (active) {
                            onActive(payload)
                        } else {
                            onInactive(payload)
                        }
                    }
                }}
            >
                {
                    !isLoading
                        ? <Icon
                            {...iconProps}
                            style={active ? styles.activeIcon : styles.inactiveIcon}
                        />
                        : <ActivityIndicator size="small" color='#000' />
                }
            </TouchableOpacity>
        )
    }
}

export default IconToggle;