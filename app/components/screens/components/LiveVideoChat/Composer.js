import PropTypes from 'prop-types'
import React from 'react'
import { Platform, StyleSheet, TextInput, TextInputProps } from 'react-native'
import { MIN_COMPOSER_HEIGHT, DEFAULT_PLACEHOLDER } from './Constant'
import Color from './Color'
import { StylePropType } from 'react-native-gifted-chat'

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        lineHeight: 16,
        color: '#fff',
        // borderRadius: 20,
        // borderWidth: StyleSheet.hairlineWidth,
        // borderColor: '#fff',
        ...Platform.select({
            web: {
                paddingTop: 6,
                paddingLeft: 4,
            },
        }),
        marginTop: Platform.select({
            ios: 8,
            android: 0,
            web: 6,
        }),
        marginBottom: Platform.select({
            ios: 4,
            android: 3,
            web: 4,
        }),
    },
})


export default class Composer extends React.Component {
    static defaultProps = {
        composerHeight: MIN_COMPOSER_HEIGHT,
        text: '',
        placeholderTextColor: Color.defaultColor,
        placeholder: DEFAULT_PLACEHOLDER,
        textInputProps: null,
        multiline: true,
        disableComposer: false,
        textInputStyle: {},
        textInputAutoFocus: false,
        keyboardAppearance: 'default',
        onTextChanged: () => { },
        onInputSizeChanged: () => { },
    }

    static propTypes = {
        composerHeight: PropTypes.number,
        text: PropTypes.string,
        placeholder: PropTypes.string,
        placeholderTextColor: PropTypes.string,
        textInputProps: PropTypes.object,
        onTextChanged: PropTypes.func,
        onInputSizeChanged: PropTypes.func,
        multiline: PropTypes.bool,
        disableComposer: PropTypes.bool,
        textInputStyle: PropTypes.object,
        textInputAutoFocus: PropTypes.bool,
        keyboardAppearance: PropTypes.string,
    }

    layout = undefined

    onLayout = (e) => {
        const { layout } = e.nativeEvent

        // Support earlier versions of React Native on Android.
        if (!layout) {
            return
        }

        if (
            !this.layout ||
            (this.layout &&
                (this.layout.width !== layout.width ||
                    this.layout.height !== layout.height))
        ) {
            this.layout = layout
            this.props.onInputSizeChanged(this.layout)
        }
    }

    onChangeText = (text) => {
        this.props.onTextChanged(text)
    }

    render() {
        return (
            <TextInput
                testID={this.props.placeholder}
                accessible
                accessibilityLabel={this.props.placeholder}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
                multiline={this.props.multiline}
                editable={!this.props.disableComposer}
                onLayout={this.onLayout}
                onChangeText={this.onChangeText}
                style={[
                    styles.textInput,
                    this.props.textInputStyle,
                    {
                        height: this.props.composerHeight,
                        ...Platform.select({
                            web: {
                                outlineWidth: 0,
                                outlineColor: 'transparent',
                                outlineOffset: 0,
                            },
                        }),
                    },
                ]}
                autoFocus={this.props.textInputAutoFocus}
                value={this.props.text}
                enablesReturnKeyAutomatically
                underlineColorAndroid='transparent'
                keyboardAppearance={this.props.keyboardAppearance}
                {...this.props.textInputProps}
            />
        )
    }
}