import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './InputLabel.style';

const InputLabel = props => {
    return (

        <View style={[styles.inputItem, props.wrapperStyle]}>
            {props.children || <TextInput
                {...props.inputProps}
            />}
        </View>
    );
};

export default InputLabel;
