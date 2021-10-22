import PropTypes from 'prop-types'
import React from 'react'
import {
    StyleSheet,
    View,
    Keyboard,
    EmitterSubscription,
    StyleProp,
    ViewStyle,
} from 'react-native'

import { Send, Actions, Color, StylePropType } from 'react-native-gifted-chat'
import Composer from './Composer'

const styles = StyleSheet.create({
    container: {
        // borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#fff',
        // borderRadius: 50,
        bottom: 0,
        left: 0,
        right: 0,
    },
    primary: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#fff',
    },
    accessory: {
        height: 44,
        // backgroundColor: '#000'
    },
})

export default class InputToolbar extends React.Component {
    static defaultProps = {
        renderAccessory: null,
        renderActions: null,
        renderSend: null,
        renderComposer: null,
        containerStyle: {},
        primaryStyle: {},
        accessoryStyle: {},
        onPressActionButton: () => { },
    }

    static propTypes = {
        renderAccessory: PropTypes.func,
        renderActions: PropTypes.func,
        renderSend: PropTypes.func,
        renderComposer: PropTypes.func,
        onPressActionButton: PropTypes.func,
        containerStyle: PropTypes.object,
        primaryStyle: PropTypes.object,
        accessoryStyle: PropTypes.object,
    }

    state = {
        position: 'absolute',
    }

    keyboardWillShowListener = undefined
    keyboardWillHideListener = undefined

    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            this.keyboardWillShow,
        )
        this.keyboardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            this.keyboardWillHide,
        )
    }

    componentWillUnmount() {
        if (this.keyboardWillShowListener) {
            this.keyboardWillShowListener.remove()
        }
        if (this.keyboardWillHideListener) {
            this.keyboardWillHideListener.remove()
        }
    }

    keyboardWillShow = () => {
        if (this.state.position !== 'relative') {
            this.setState({
                position: 'relative',
            })
        }
    }

    keyboardWillHide = () => {
        if (this.state.position !== 'absolute') {
            this.setState({
                position: 'absolute',
            })
        }
    }

    renderActions() {
        const { containerStyle, ...props } = this.props
        if (this.props.renderActions) {
            return this.props.renderActions(props)
        } else if (this.props.onPressActionButton) {
            return <Actions {...props} />
        }
        return null
    }

    renderSend() {
        if (this.props.renderSend) {
            return this.props.renderSend(this.props)
        }
        return <Send {...this.props} />
    }

    renderComposer() {
        if (this.props.renderComposer) {
            return this.props.renderComposer(this.props)
        }

        return <Composer {...this.props} />
    }

    renderAccessory() {
        if (this.props.renderAccessory) {
            return (
                <View style={[styles.accessory, this.props.accessoryStyle]}>
                    {this.props.renderAccessory(this.props)}
                </View>
            )
        }
        return null
    }

    render() {
        return (
            <View
                style={
                    [
                        styles.container,
                        { position: this.state.position },
                        this.props.containerStyle,
                    ]
                }
            >
                <View style={[styles.primary, this.props.primaryStyle]}>
                    {this.renderActions()}
                    {this.renderComposer()}
                    {this.renderSend()}
                </View>
                {this.renderAccessory()}
            </View>
        )
    }
}