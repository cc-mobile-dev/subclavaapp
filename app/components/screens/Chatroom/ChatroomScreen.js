import React from 'react';
import { View, Text, TouchableOpacity, Clipboard, Alert, ActivityIndicator, Dimensions, Keyboard } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { compose } from 'recompose';

import { FlatList } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import EmojiSelector from 'react-native-emoji-selector';

import { uniq } from 'lodash';


import { connectChatrooms, connectSendBird, connectAuth, connectFavoriteChatrooms, connectChatroom, connectGiveaways, connectJoinedChatrooms, connectLiveVideo } from '../../../redux';
import { GiftedChat, Bubble, Avatar, InputToolbar, Composer, Send, Actions } from 'react-native-gifted-chat';
import { sbCreateBlockedUserListQuery } from '../../../redux/modules/sendbird/sendbirdActions';
import styles from './ChatroomScreen.style';
import { ClavaModal } from '../components/ClavaModal';
import { UserItem } from '../BlockedUsers/BlockedUsersScreen';

// import GiveawayBanner from '../components/GiveawayBanner/GiveawayBanner';
import { GoLiveModal } from '../components/GoLiveModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Parse = require('parse/react-native')
class ChatroomScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            previousMessageListQuery: null,
            blockedUserListQuery: null,
            longPressActions: [],
            selectedMessage: null, // long press selected message
            isUploadingImage: false,
            showUsersModal: false,
            currentText: null,
            usersSearchResults: [],
            mentionedUsers: [],
            selectingEmoji: false,
            textInputSelected: false,
            editMode: false,
            firstRender: true,
            keyboardShowing: false,
            goingLive: false
        }
    }

    componentDidMount() {
        this._onChatEnter();
        // this.keyboardDidShowListener = Keyboard.addListener(
        //     'keyboardDidShow',
        //     () => this._keyboardUpdate(true),
        // );
        // this.keyboardDidHideListener = Keyboard.addListener(
        //     'keyboardDidHide',
        //     () => this._keyboardUpdate(false),
        // );
        this.props.stopVideo()

        this.props.navigation.setParams({
            toggleGoLive: () => this.setState({
                goingLive: !this.state.goingLive
            })
        })
    }

    // componentDidUpdate(prev) {
    //     // console.log(prev.sendBirdState.chat.reactionMessage, this.props.sendBirdState.chat.reactionMessage);
    //     const wentLive = prev.chatroomData && !prev.chatroomData.isLive && this.props.chatroomData.isLive;
    //     const stoppedLive = prev.chatroomData && prev.chatroomData.isLive && !this.props.chatroomData.isLive;
    //     if (wentLive) {
    //         this.refs.toastRef.show(
    //             'Your chatroom is Live view it on the map!',
    //             3000
    //         );
    //     } else if (stoppedLive) {
    //         this.refs.toastRef.show(
    //             'Your chatroom is no longer live.',
    //             3000
    //         );
    //     }
    // }

    componentWillUnmount() {
        this._onChatLeave();
    }

    _onChatEnter = () => {
        let chatroom = this.props.route.params.chatroom;
        // chatroom.id = chatroom.objectId
        // this.props.initChatScreen();

        // sbGetOpenChannel(chatroom.id).then(channel => this.setState({ channel }, () => {
        //     this.props.createChatHandler(chatroom.id, true);
        //     this._getMessageList(false);
        //     this._getBlockedUsers();
        //     // this.props.getMemberList(chatroom.id);
        //     // sbMarkAsRead({ channelUrl: chatroom.id });
        // }));
        // this.props.initChat(chatroom)
    }

    _onChatLeave = () => {
        let chatroom = this.props.route.params.chatroom;
        this.props.releaseChat(chatroom)
        // if (this.state.channel) {
        //     this.props.channelExit(this.state.channel.url, true);
        // }
    }

    _keyboardUpdate = (keyboardShowing) => {
        this.setState({
            keyboardShowing
        })
    }

    _getBlockedUsers = (init) => {
        if (!this.state.blockedUserListQuery) {
            this.setState({ blockedUserListQuery: sbCreateBlockedUserListQuery() }, () => {
                this.props.getBlockUserList(this.state.blockedUserListQuery);
            })
        } else {
            this.props.getBlockUserList(this.state.blockedUserListQuery);
        }
    }


    _getMessageList = lastMessage => {
        const { chatroom } = this.props.route.params;
        let timestamp = Date.now();
        if (lastMessage) {
            if (this.props.currentChat.length > 0) {
                timestamp = this.props.currentChat[this.props.currentChat.length - 1].createdAt;
            }
        }
        this.props.getPrevMessagesByTimestamp(chatroom.objectId, timestamp, {
            inclusive: !lastMessage
        })

    };

    _onSendButtonPress = (textMessage) => {
        const { mentionedUsers, editMode, channel } = this.state;
        if (textMessage) {
            if (editMode) {
                this._onEditSend();
            } else {
                const { chatroom } = this.props.route.params;
                this.props.onSendButtonPress(chatroom.objectId, true, {
                    message: textMessage[0].text,
                    // ...mentionedUsers.length > 0 && { mentionedUserIds: mentionedUsers.map(m => m.userId) },
                    // ...mentionedUsers.length > 0 && { mentionType: 'users' }
                });
                this.setState({ mentionedUsers: [] }); //do this to keep tracking of mentioned users in text input
            }
        }
    };

    _renderBubble = (props) => {
        const { authState: { currentUser } } = this.props;
        const { bubbleContainer, textStyleUser, textStyleOther, userTextStyle, wrapperStyleUser, wrapperStyleOther, reactionCountContainerOther, reactionCountContainerUser } = styles;
        const textStyle = props.currentMessage.user._id !== currentUser.id ? textStyleOther : textStyleUser;
        const wrapperStyle = props.currentMessage.user._id !== currentUser.id ? wrapperStyleOther : wrapperStyleUser;
        const sentByUser = props.currentMessage.user._id === currentUser.objectId;
        const reactCountContainerStyle = sentByUser ? reactionCountContainerUser : reactionCountContainerOther;

        return <View style={bubbleContainer} >
            {!sentByUser && <Text style={userTextStyle}>{`${props.currentMessage.user.name} `}</Text>}
            <Bubble
                {...props}
                touchableProps={{
                    ...props.touchableProps,
                    onPress: () => props.onLongPress(null, props.currentMessage),
                    onLongPress: null
                }}
                textStyle={{
                    left: textStyle,
                    right: textStyle
                }}
                wrapperStyle={{
                    left: {
                        ...wrapperStyle,
                        marginLeft: -20
                    },
                    right: {
                        ...wrapperStyle,
                        marginRight: -43
                    }
                }}
            />
            <View style={reactCountContainerStyle}>
                {props.currentMessage.reactions.map(r => {
                    const userReacted = r.userIds.includes(props.user._id)
                    const emojiBorderColor = userReacted ? { backgroundColor: '#37ADFF' } : { backgroundColor: '#E8E8E8' };
                    const countSurroundStyle = userReacted
                        ? styles.reactionCountSurroundColored
                        : styles.reactionCountSurroundClear;
                    const countTextStyle = userReacted
                        ? styles.reactionCountText
                        : { color: '#000000', fontSize: 12, textAlign: 'center' };
                    const isPraiseEmoji = r.key === '🙌';
                    return <TouchableOpacity
                        key={r.key}
                        style={{ marginLeft: 5, flexDirection: 'row' }}
                        onPress={() => {
                            this.setState({ selectedMessage: props.currentMessage }, () => {
                                if (userReacted) {
                                    this._removeReaction(props.currentMessage, r.key);
                                } else {
                                    this._modifyReaction(r.key);
                                }
                            })
                        }}
                    >
                        <View style={{ ...styles.emojiBorder, ...emojiBorderColor, ...(isPraiseEmoji ? { paddingLeft: 1 } : {}) }}>
                            <Text style={{ fontSize: 12, textAlign: 'center', textAlignVertical: 'center' }}>{r.key}</Text>
                        </View>
                        {r.userIds.length > 1 && <View style={countSurroundStyle}>
                            <Text style={countTextStyle}>{r.userIds.length}</Text>
                        </View>}
                    </TouchableOpacity>
                }
                )}

            </View>

        </View>

    }


    _renderAvatar = props => {
        const { avatarSize } = styles;
        return <Avatar
            {...props}
            onPressAvatar={() => props.onLongPress(null, props.currentMessage)}
            imageStyle={{
                left: {
                    ...avatarSize,
                    marginLeft: 10,
                    bottom: -20
                },
                right: {
                    ...avatarSize,
                    // marginRight: 10,
                    marginLeft: 30,
                    bottom: -15
                },
            }}
        />
    }

    _renderInputToolbar = props => {
        const { isLongPress, keyboardShowing } = this.state;
        return !isLongPress && <InputToolbar
            {...props}
            containerStyle={{ ...styles.toolbarContainer }}
            accessoryStyle={{
                minHeight: 50
            }}
            textInputStyle={{ color: "black" }}
        />
    }

    _renderComposer = props => {
        const { authState: { currentUser } } = this.props;
        const { chatroom } = this.props.route.params;
        const { textInputSelected, isLongPress } = this.state;
        const renderedUploadIcon = chatroom.allowUserUploads || currentUser.id === chatroom.adminId;

        return !isLongPress && <View style={{ flex: 1 }}>
            {/* {props.usersSearchResults.length > 0 && textInputSelected &&
                <View style={renderedUploadIcon ? styles.mentionUsersBox : styles.mentionUsersNoUpload}>
                    <FlatList
                        data={props.usersSearchResults}
                        keyboardShouldPersistTaps={'handled'}
                        renderItem={({ item, index }) =>
                            <UserItem
                                data={item}
                                onPress={() => props.onUserMentionSelect(item)}
                                last={index === props.usersSearchResults.length - 1}
                            />
                        }
                        keyExtractor={item => item._id}
                    />
                </View>
            } */}
            <Composer
                {...props}
                textInputStyle={{
                    color: 'black',
                    paddingTop: 8
                }}
            />
        </View>
    }

    _renderSend = props => {
        const { isLongPress } = this.state;
        return !isLongPress && <Send {...props}
            containerStyle={{
                padding: 9,
                paddingBottom: 13,
                marginRight: 10
            }}
        >
            <Feather name="send" size={22} />
        </Send>
    }

    _renderActions = props => {
        const { route: { params: { chatroom } }, authState: { currentUser } } = this.props;
        const canUpload = chatroom.allowUserUploads || currentUser.id === chatroom.adminId;
        if (canUpload) {
            return !props.isUploadingImage
                ? <TouchableOpacity
                    style={{
                        ...styles.uploadIcon,
                        ...(this.state.keyboardShowing ? { marginTop: 9 } : {})
                    }}
                    onPress={() => this._onCustomAction(props)}
                >
                    <Feather name="plus-circle" size={22}
                    // color="#fff" 
                    />
                </TouchableOpacity>
                : <ActivityIndicator style={{ marginBottom: 10, marginTop: 0, marginLeft: 10 }} size="small" color="#fff" />
        }
    }

    _renderFooter = props => {
        return <Text></Text>
    }

    _renderCustomView = props => {
        return props.currentMessage.reactions.length > 0
            ? <View
                style={{ flexDirection: 'row' }}
            >
                {/* {props.currentMessage.reactions.map(r =>
                    <TouchableOpacity
                        key={r.key}
                        style={{ marginLeft: 5 }}
                        onPress={() => {
                            this.setState({ selectedMessage: props.currentMessage }, () => {
                                if (r.userIds.includes(props.user._id)) {
                                    this._removeReaction(props.currentMessage, r.key)
                                } else {
                                    this._modifyReaction(r.key)
                                }
                            })
                        }}
                    >
                        <Text>{r.key} <View><Text>{r.userIds.length}</Text></View></Text>
                    </TouchableOpacity>
                )} */}
            </View>
            : null
    }

    _renderReactionBar = () => {
        const reactions = ['😃', '👌', '👍', '❤️', '🙌'];
        return <View style={styles.reactionBarContainer}>
            {reactions.map(reaction => <TouchableOpacity
                onPress={() => this._modifyReaction(reaction)}
            >
                <Text style={styles.emoji}>{reaction}</Text>
            </TouchableOpacity>)}
        </View>
    }

    _renderOptionBar = (isAdmin) => {
        const { authState: { currentUser } } = this.props;
        const sentByUser = this.state.selectedMessage.user._id === currentUser.id;
        const options = isAdmin
            ? (sentByUser ? ['Edit', 'Delete'] : ['Reply', 'Block'])
            : ['Reply'];
        return <View style={styles.optionBarContainer}>
            {options.map(option => <TouchableOpacity onPress={() => this._onOptionPress(option)}>
                <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>)}
        </View>
    }

    _renderChatEmpty = () => {
        return <View style={styles.emptyChat}>
            <Text style={styles.emptyChatText}>No messages yet. Tap the Gear icon at the top to access chatroom features & settings.</Text>
        </View>
    }

    _removeReaction = (message, emoji) => {
        let sbMessage = this.props.currentChat.find(m => m.messageId === message._id);
        this.props.removeReaction({
            channelUrl: this.props.chatroomData.id,
            message: sbMessage,
            emoji
        });
    }

    // if message is null means remove reaction from message
    _modifyReaction = (emoji) => {
        let message = this.state.selectedMessage;

        if (emoji) {
            let sbMessage = this.props.currentChat.find(m => m.messageId === message._id);
            this.props.addReaction({
                channelUrl: this.props.chatroomData.objectId,
                message: sbMessage,
                emoji
            });
        }

        let toggle = !this.state.selectingEmoji;
        this.setState({ selectedMessage: null, isLongPress: false });
    }

    _onCustomAction = async (props) => {
        this.props.onSendFileMessage();
        let result = await new Promise(resolve => {
            ImagePicker.showImagePicker({
                allowsEditing: false,
                mediaType: 'mixed',
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                },
                quality: 0.1
            }, response => {
                response.mediaType = response.hasOwnProperty('type') ? 'image' : 'video';
                console.log('Media chosen: ', response)
                resolve({
                    ...response,
                    cancelled: response.error || response.didCancel,
                    base64: `data:${response.type};base64,${response.data}`,
                    type: response.type
                })
            })
        })
        this.setState({ isUploadingImage: true });

        if (!result.cancelled && result.base64) {
            console.log('result from image picker: ', result);
            try {
                let file = new Parse.File(this.props.chatroomData.id, { base64: result.base64 }, result.type)
                const res = await file.save();

                this.props.onFileButtonPress(this.props.chatroomData.id, true, res.url())

                // setSpinnerVisible(false);
            } catch (err) {
                console.log('Error from uploading: ', err)
                // setSpinnerVisible(false);
            } finally {
                this.setState({ isUploadingImage: false });
            }
        } else {
            this.props.onCancelSendFileMessage();
        }
    }

    _onLongPress = (context, currentMessage) => {
        const { currentChat } = this.state;
        const selectedMessage =
            this.setState({
                isLongPress: true,
                selectedMessage: currentMessage
            });
        // const { currentUser } = this.props.authState;
        // this.setState({
        //     isLongPress: true,
        //     selectedMessage: currentMessage,
        //     longPressActions: [
        //         // ...context !== 'avatarTap' ? [
        //         {
        //             id: 5,
        //             key: 'copy-text',
        //             name: 'Copy Text'
        //         },
        //         {
        //             id: 6,
        //             key: 'report-message',
        //             name: 'Report Message'
        //         }
        //         // ] : []
        //         ,
        //         ...currentUser.id !== currentMessage.user._id ? [{
        //             id: 1,
        //             key: 'add-reaction',
        //             name: 'Add Reaction'
        //         },
        //         {
        //             id: 2,
        //             key: 'mention',
        //             name: 'Mention @' + currentMessage.user.name
        //         },
        //         {
        //             id: 3,
        //             key: 'block-user',
        //             name: 'Block @' + currentMessage.user.name
        //         },
        //         {
        //             id: 4,
        //             key: 'report-user',
        //             name: 'Report @' + currentMessage.user.name
        //         }] : [],
        //     ]
        // })
    }

    _onBackDropPress = () => {
        this.setState({
            selectedMessage: null,
            isLongPress: false
        })
    }

    _onOptionPress = (option) => {
        const { selectedMessage } = this.state;
        switch (option) {
            case 'Reply':
                this._onMentionActionPress(selectedMessage.user.name)
                break;
            case 'Edit':
                this.setState({
                    editMode: true,
                    isLongPress: false,
                    currentText: selectedMessage.text
                });
                break;
            case 'Block':
                this.setState({
                    selectedMessage: null,
                    isLongPress: false
                }, () => {
                    this.props.onUserBlockPress(selectedMessage.user._id)
                    // doing this hack to refresh the messages list after blocking a user
                    this._onChatLeave();
                    this._onChatEnter();
                })
                break;
            case 'Delete':
                this._onDeletePress(selectedMessage);

                break;
            default:
                break;
        }
    }

    _onActionSheetPress = (item) => {
        const { selectedMessage } = this.state;
        switch (item.key) {
            case 'copy-text':
                Clipboard.setString(selectedMessage.text);
                break;
            case 'report-user':
                // this.props.navigation.state.params.toastRef.show(
                //     `@${selectedMessage.name} succesfully reported`,
                //     3000
                // );
                break;
            case 'hide-message':
                break;
            case 'report-message':
                Alert.alert('Message Reported', `${selectedMessage.text}`)
                break;
            case 'block-user':
                this.props.onUserBlockPress(selectedMessage.user._id)
                // doing this hack to refresh the messages list after blocking a user
                // this.props.navigation.navigate('Home', {blockedUser: {chatroom: this.props.navigation.state.params.chatroom } })
                this._onChatLeave();
                this._onChatEnter();
                break;
            case 'add-reaction':
                this._modifyReaction(null, selectedMessage);
                break;
            case 'mention':
                this._onMentionActionPress(selectedMessage.user.name);
                break;
            default:
                break;
        }

        if (item.key === 'add-reaction') {
            this.setState({ isLongPress: false })
        } else {
            this._onBackDropPress();
        }

    }

    _onEditSend = () => {
        const { selectedMessage, currentText } = this.state;
        const sbMessage = this.props.currentChat.find(m => m.messageId === selectedMessage._id);
        const updateContents = {
            message: currentText
        };
        this.props.onUserUpdateMessage(sbMessage.channelUrl, false, sbMessage, updateContents);
        this.setState({
            selectedMessage: null,
            currentText: null,
            editMode: false
        });
    };

    _onDeletePress = () => {
        const { selectedMessage, channel } = this.state;
        const sbMessage = this.props.currentChat.find(m => m.messageId === selectedMessage._id);
        this.props.onMessageDelete(sbMessage.channelUrl, false, sbMessage);
        this.setState({
            selectedMessage: null,
            isLongPress: false
        });
    }

    _onMentionActionPress = username => {
        const { currentText, selectedMessage } = this.state;
        const { chatroomMembers } = this.props;
        const userMentionedIndex = this.props.chatroomMembers.findIndex(i => i.userId === selectedMessage.user._id);
        const textWithMention = currentText !== null ? currentText + ` @${username}` : `@${username}`;

        this.setState({
            currentText: textWithMention,
            mentionedUsers: uniq([...this.state.mentionedUsers, ...[chatroomMembers[userMentionedIndex]]]),
            selectedMessage: null,
            isLongPress: false
        });
    };

    _onInputTextChanged = text => {
        const lastWordInText = text.split(' ')[text.split(' ').length - 1];

        if (text === '' || !text || !text.split('')[text.length - 1].length || !text.includes('@')) {
            this.setState({
                mentionedUsers: [],
                usersSearchResults: [],
                currentText: text
            })
        } else if (lastWordInText[0] === '@') {
            if (lastWordInText === '@') {
                this.setState({
                    usersSearchResults: [{ nickname: 'everyone' }, ...this.props.chatroomMembers],
                    currentText: text
                })
            } else {
                let matchedUsername = text.match(/(^|[^@\w])@(\w{1,15})\b/gm)
                if (matchedUsername) {
                    let matched = matchedUsername
                        .map(m => m.replace(/^\@|\s\@/, ''))
                        .filter(m => !this.state.mentionedUsers.map(j => j.nickname).includes(m.nickname))
                    this.setState({
                        currentText: text,
                        usersSearchResults: this.props.chatroomMembers
                            .filter(m => m.nickname.toLowerCase().includes(matched[0])),
                    })
                } else {
                    this.setState({
                        usersSearchResults: [],
                        currentText: text
                    })
                }
            }
        } else {
            this.setState({
                currentText: text,
                usersSearchResults: []
            })
        }

    }

    _onUserMentionSelect = item => {
        let currentText = this.state.currentText;
        // find where the handle began and replace it with the full username
        currentText = currentText.slice(0, currentText.lastIndexOf('@')) + '@' + item.nickname + ' ';
        const taggingAllUsers = item.nickname === 'everyone';
        const mentionedUsers = taggingAllUsers ? uniq([...this.props.chatroomMembers]) : uniq([...this.state.mentionedUsers, ...[item]]);

        this.setState({
            currentText,
            usersSearchResults: [],
            // mentionedUsers: uniq([...this.state.mentionedUsers, ...[item]])
            mentionedUsers
        })
    }

    _iconPress = (isAdmin) => {
        const { navigation: { navigate }, route } = this.props;
        navigate('ChatroomInfoScreen', { chatroom: route.params.chatroom, isAdmin });
    };

    goBackPress = () => {
        const { params } = this.props.route;
        const cameFromCreating = params.previousScreen === 'CategorySelection';
        if (cameFromCreating) {
            this.props.navigation.replace('Home');
        } else {
            this.props.navigation.goBack();
        }
    };

    isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
        const paddingToTop = 80;
        return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
    };

    render() {
        const { authState: { currentUser }, currentChat, route, giveawaysState: { currentGiveaway } } = this.props;
        console.log(currentGiveaway)
        const messages = currentChat.map(m => {
            return {
                _id: m.messageId,
                // text: m._sender.userId === currentUser.id ? m.message : `${m._sender.nickname}: ${m.message}`,
                text: m.message,
                reactions: m.reactions,
                user: {
                    _id: m._sender.userId,
                    name: m._sender.nickname,
                    avatar: m._sender.profileUrl
                },
                ...m.messageType === 'file' && { image: m.url }
            }
        });
        const { chatroom } = route.params;
        const { isLongPress, currentText, selectingEmoji, selectedMessage } = this.state;
        const currentUserIsAdmin = currentUser.objectId === chatroom.admin.objectId;
        const selectedMessageSentByUser = !!selectedMessage && selectedMessage.user._id === currentUser.id;
        return (
            <View style={styles.safeContainer}>
                {/* <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={this.goBackPress}>
                        <Feather name="chevron-left" style={styles.inactiveIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{chatroom.name}</Text>
                    <View style={styles.rightButtons}>
                        <TouchableOpacity
                            onPress={() => this._iconPress(currentUserIsAdmin)}
                        >
                            <Feather
                                name={'settings'}
                                size={25}
                                style={styles.settingsIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View> */}
                <GiftedChat
                    messages={messages}
                    text={currentText}
                    // inverted={messages.length === 0}
                    textInputProps={{
                        // multiline: true,
                        onFocus: () => this.setState({ textInputSelected: true, selectingEmoji: false }),
                        onBlur: () => this.setState({ textInputSelected: false })
                    }}
                    onInputTextChanged={this._onInputTextChanged}
                    renderActions={this._renderActions}
                    renderBubble={this._renderBubble}
                    renderAvatar={this._renderAvatar}
                    renderInputToolbar={this._renderInputToolbar}
                    renderComposer={this._renderComposer}
                    renderSend={this._renderSend}
                    renderFooter={this._renderFooter}
                    renderCustomView={this._renderCustomView}
                    onLongPress={this._onLongPress}
                    onLoadEarlier={() => this._getMessageList(true)}
                    renderChatEmpty={this._renderChatEmpty}
                    // loadEarlier
                    listViewProps={{
                        scrollEventThrottle: 400,
                        onScroll: ({ nativeEvent }) => {
                            if (this.isCloseToTop(nativeEvent)) {
                                this._getMessageList(true);
                            }
                        }
                    }}
                    // multiline
                    showUserAvatar
                    // alwaysShowSend
                    renderAvatarOnBottom
                    isCustomViewBottom
                    showAvatarForEveryMessage
                    keyboardShouldPersistTaps="never"
                    onSend={message => this._onSendButtonPress(message)}
                    user={{
                        _id: currentUser.objectId,
                        name: currentUser.username,
                        ...currentUser
                    }}
                    usersSearchResults={this.state.usersSearchResults}
                    onUserMentionSelect={this._onUserMentionSelect}
                    isUploadingImage={this.props.sendBirdState.chat.isUploadingImage}
                />

                <ClavaModal
                    isVisible={isLongPress}
                    onBackdropPress={this._onBackDropPress}
                >
                    {/* {isLongPress && this._renderReactionBar(selectedMessageSentByUser)} */}
                    {isLongPress && this._renderOptionBar(currentUserIsAdmin)}
                </ClavaModal>
                <GoLiveModal
                    isVisible={this.state.goingLive}
                    onBackdropPress={() => this.setState({ goingLive: false })}
                    chatroom={chatroom}
                    currentGiveaway={currentGiveaway}
                    onDone={() => {
                        this.setState({ goingLive: false })
                    }}
                />
                {selectingEmoji &&
                    <KeyboardAwareScrollView>
                        <EmojiSelector
                            style={styles.emojiPicker}
                            onEmojiSelected={emoji => this._modifyReaction(emoji, null)}
                            showSearchBar={false}
                        />
                    </KeyboardAwareScrollView>}
            </View>
        )
    }
}

export default compose(
    connectJoinedChatrooms(),
    connectChatrooms(),
    connectSendBird(),
    connectAuth(),
    connectChatroom(),
    connectGiveaways(),
    connectLiveVideo()
)(ChatroomScreen);