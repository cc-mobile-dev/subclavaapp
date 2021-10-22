import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Keyboard, Animated } from 'react-native';
import styles from './LiveVideoChat.style';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import Message from './Message';
import InputToolbar from './InputToolbar'
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Easing } from 'react-native';

const LiveVideoChat = props => {
  const { currentChat = [], currentUser, onSendButtonPress, giveaway } = props;

  const [currentText, setCurrentText] = useState('')
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  const positonValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height)
    })
    Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0)
    })
    return () => {
      Keyboard.removeListener('keyboardWillShow')
      Keyboard.removeListener('keyboardWillHide')
    }
  }, [])

  useEffect(() => {
    Animated.timing(
      positonValue,
      {
        easing: Easing.exp,
        toValue: hp('60%') - keyboardHeight * 2,
        duration: 200
      }
    ).start()
  }, [keyboardHeight])

  const messages = currentChat;

  const renderMessage = (props) => {
    const {
      currentMessage: { text: currText },
    } = props

    let messageTextStyle

    // Make "pure emoji" messages much bigger than plain text.
    // if (currText && emojiUtils.isPureEmojiString(currText)) {
    //   messageTextStyle = {
    //     fontSize: 28,
    //     // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
    //     lineHeight: Platform.OS === 'android' ? 34 : 30,
    //   }
    // }

    return <Message {...props} />
  }

  const renderInputToolbar = (props) => {
    return <InputToolbar {...props} />
  }

  const renderSend = (props) => {
    return <Send {...props}
      containerStyle={{
        padding: 9,
        paddingBottom: 13,
        marginRight: 10
      }}
    >
      <Feather name="send" size={22} color="#fff" />
    </Send>
  }

  const onSend = (textMessage) => {
    onSendButtonPress({
      room: giveaway.objectId,
      message: textMessage[0].text,
    });
  }

  return (
    <Animated.View style={{
      ...styles.chatBox,
      top: positonValue
    }} >
      <LinearGradient style={styles.container} colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}>
        <GiftedChat
          messages={messages}
          text={currentText}
          renderDay={() => { }}
          // inverted={messages.length !== 0}
          // textInputProps={{
          //   // multiline: true,
          //   onFocus: () => this.setState({ textInputSelected: true, selectingEmoji: false }),
          //   onBlur: () => this.setState({ textInputSelected: false })
          // }}
          onInputTextChanged={text => setCurrentText(text)}
          renderMessage={renderMessage}
          // renderActions={this._renderActions}
          // renderBubble={this._renderBubble}
          // renderAvatar={this._renderAvatar}
          renderInputToolbar={renderInputToolbar}
          // renderComposer={this._renderComposer}
          renderSend={renderSend}
          // renderFooter={this._renderFooter}
          // renderCustomView={this._renderCustomView}
          // onLongPress={this._onLongPress}
          // onLoadEarlier={() => this._getMessageList(true)}
          // renderChatEmpty={this._renderChatEmpty}
          // loadEarlier
          // multiline
          showUserAvatar
          // alwaysShowSend
          renderAvatarOnBottom
          isCustomViewBottom
          showAvatarForEveryMessage
          keyboardShouldPersistTaps="never"
          onSend={message => onSend(message)}
          user={{
            _id: currentUser.objectId,
            name: currentUser.username,
            ...currentUser
          }}
        // usersSearchResults={this.state.usersSearchResults}
        // onUserMentionSelect={this._onUserMentionSelect}
        // isUploadingImage={this.props.sendBirdState.chat.isUploadingImage}
        />
      </LinearGradient>
    </Animated.View>
  );
};

export default LiveVideoChat;