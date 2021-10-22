import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
// import { Chat, Channel, MessageList, MessageInput } from 'stream-chat-expo';
import styled from 'styled-components';
import * as Icon from 'react-native-vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-easy-toast';
import { compose } from 'recompose';

import { promisify, connectChatrooms, connectAuth, connectFavoriteChatrooms } from '../../redux';
import { updateChatroom, addFavoriteChatroom, deleteFavoriteChatroom } from '../../utilities/api';
import { BASE, GREEN } from '../../config/style';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const Chatroom = props => {
  const {
    navigation,
    navigation: { getParam, goBack, navigate },
    authState: { currentUser },
    favoriteChatroomsState: { favoriteChatrooms },
  } = props;
  const [channel, setChannel] = useState(getParam('channel'));
  const [chatClient, setChatClient] = useState(getParam('chatClient'));
  const [chatroom, setChatroom] = useState(getParam('chatroom'));
  const [isLive, setIsLive] = useState(chatroom.isLive);
  const [isFavorite, setIsFavorite] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const toastRef = useRef();

  channel.watch();

  useEffect(() => {
    const localChatroom = getParam('chatroom');
    setChannel(getParam('channel'));
    setChatClient(getParam('chatClient'));
    setChatroom(localChatroom);
    setIsLive(localChatroom.isLive);
    setIsFavorite(favoriteChatrooms.some(a => a.id === localChatroom.id));
  }, [navigation]);

  function setLiveEvent() {
    setSpinnerVisible(true);
    const body = {
      isLive: !isLive,
    };
    setIsLive(body.isLive);
    updateChatroom(chatroom.id, body)
      .then(res => {
        setSpinnerVisible(false);

        if (res.status === 'ok') {
          // Getting all chatrooms to update isLive field
          // TODO: Need to update the isLive directly in the Redux, instead of fetching all the chatrooms.
          getChatrooms();

          const alertText = body.isLive
            ? 'Chatroom is Live from now'
            : 'Chatroom is not Live anymore';

          toastRef.current.show(alertText, 1000);

          channel.update(
            {},
            {
              text: `${currentUser.firstName} has set the chatroom ${
                body.isLive ? 'to Live Event' : 'to Event'
                }`,
            }
          );
        }
      })
      .catch(err => {
        setSpinnerVisible(false);
        console.log('Unable set chatroom to Live', err);
        toastRef.current.show('Unable set chatroom to Live', 1000);
      });
  }

  function setFavoriteChatroom() {
    setSpinnerVisible(true);
    const body = {
      isFavorite: !isFavorite,
    };
    setIsFavorite(body.isFavorite);

    if (body.isFavorite) {
      addFavoriteChatroom({ chatroomId: chatroom.id })
        .then(res => {
          setSpinnerVisible(false);

          if (res.status === 'ok') {
            // Getting all favorite chatrooms to update isFavorite field
            // TODO: Need to update the isFavorite directly in the Redux, instead of fetching all the chatrooms.
            getFavoriteChatrooms();

            toastRef.current.show('You have favorited this chatroom', 1000);

            channel.update(
              {},
              {
                text: `${currentUser.firstName} has favorited this chatroom`,
              }
            );
          }
        })
        .catch(err => {
          setSpinnerVisible(false);
          console.log('Unable to favorite the chatroom', err);
          toastRef.current.show('Unable to favorite the chatroom', 1000);
        });
    } else {
      deleteFavoriteChatroom({ chatroomId: chatroom.id })
        .then(res => {
          setSpinnerVisible(false);

          if (res.status === 'ok') {
            // Getting all favorite chatrooms to update isFavorite field
            // TODO: Need to update the isFavorite directly in the Redux, instead of fetching all the chatrooms.
            getFavoriteChatrooms();

            toastRef.current.show('This chatroom no more your favorite', 1000);

            channel.update(
              {},
              {
                text: `${currentUser.firstName} has removed this chatroom from his favorites`,
              }
            );
          }
        })
        .catch(err => {
          setSpinnerVisible(false);
          console.log('Unable to remove the chatroom from favorite', err);
          toastRef.current.show('Unable to remove the chatroom from favorite', 1000);
        });
    }
  }

  function getChatrooms() {
    promisify(props.getChatrooms, {})
      .then(response => {
        // console.log('get chatrooms success', response);
      })
      .catch(err => {
        console.log('get chatrooms response', err);
      });
  }

  function getFavoriteChatrooms() {
    promisify(props.favoriteChatrooms, {})
      .then(response => {
        // console.log('get favorite chatrooms success', response);
      })
      .catch(err => {
        console.log('get favorite chatrooms response', err);
      });
  }

  return (
    <View style={{ paddingTop: 20, paddingBottom: 35, paddingHorizontal: 10 }}>
      {/* <Chat client={chatClient} style={theme}>
        <Channel channel={channel}>
          <Container>
            <Cover>
              <TouchableOpacity
                onPress={() => {
                  goBack();
                }}>
                <CloseView>
                  <Icon.Ionicons name="ios-arrow-back" size={24} color="#6039fe" />
                </CloseView>
              </TouchableOpacity>
              <Title>{chatroom.name}</Title>
              <EventView>
                <TouchableOpacity
                  onPress={() => {
                    setLiveEvent();
                  }}>
                  <LiveEvent>
                    {currentUser.id === chatroom.adminId &&
                      (isLive ? (
                        <Icon.Ionicons name="ios-wifi" size={24} color="#3EE8B5" />
                      ) : (
                        <Icon.Ionicons name="ios-wifi" size={24} color="#6039fe" />
                      ))}
                  </LiveEvent>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFavoriteChatroom();
                  }}>
                  <FavoriteChatroom>
                    {isFavorite ? (
                      <Icon.Ionicons name="ios-heart" size={24} color="#6039fe" />
                    ) : (
                      <Icon.Ionicons name="ios-heart-empty" size={24} color="#6039fe" />
                    )}
                  </FavoriteChatroom>
                </TouchableOpacity>
              </EventView>
            </Cover>
            <MessageList
              onMessageTouch={(e, message) => {
                console.log('Event: ', e);
                console.log('Message: ', message);
              }}
              onThreadSelect={thread => {
                navigate('ThreadScreen', {
                  thread,
                  channel: channel.id,
                  chatClient,
                });
              }}
              actionSheetStyles={actionSheetStyles}
            />
            <MessageInput />
          </Container>
        </Channel>
      </Chat> */}
      <Toast
        ref={toastRef}
        style={{
          backgroundColor: GREEN.turquoise,
          borderColor: GREEN.turquoise,
          maxWidth: screenWidth * 0.8,
        }}
        position="top"
        positionValue={screenHeight * 0.12}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={1}
        textStyle={{
          color: BASE.light,
          fontWeight: 'bold',
        }}
      />
      <Spinner visible={spinnerVisible} />
    </View>
  );
};

Chatroom.navigationOptions = () => ({
  headerShown: false,
});

export default compose(
  connectChatrooms(),
  connectAuth(),
  connectFavoriteChatrooms()
)(Chatroom);

const actionSheetStyles = {
  body: { flex: 1, alignSelf: 'flex-end', backgroundColor: 'transparent' },
  titleBox: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  buttonBox: {
    height: 50,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonBox: {
    height: 50,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

/*{
  primary: #006cff
    secondary: #111
    danger: #EDD8DD
    light: #EBEBEB
    textLight: white
    textDark: rgba(0,0,0,1)
    textGrey: rgba(0,0,0,0.5)
    transparent: transparent
}*/

const theme = {
  'colors.primary': '#6039fe',
  'messageInput.container': 'backgroundColor: #6039fe; color: white;',
  'messageInput.attachButton': 'width: 20; height: 20;',
  'message.actionSheet.titleContainer':
    'height: 40; background-color: #6039fe; borderTopLeftRadius: 25px; borderTopRightRadius: 25px;', // you can add further styles here.
  'message.actionSheet.titleText': 'color: white; font-family: Roboto; font-weight: bold;',
  'message.actionSheet.buttonContainer': 'background-color: #6039fe; width: 100%;',
  'message.actionSheet.buttonText': 'color: white; font-family: Roboto',
  'message.actionSheet.cancelButtonContainer': 'background-color: #6039fe; width: 100%',
  'message.actionSheet.cancelButtonText':
    'color: white; font-family: Roboto; font-weight: bold; width: 100%; text-align: center',
};

const Container = styled.View`
  flex: 1;
  background: white;
`;

const Cover = styled.View`
  margin-top: 25px;
  width: 100%;
  height: 44px;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 19px;
  color: #6039fe;
  font-weight: 700;
  width: ${screenWidth - 235}px;
  margin-horizontal: 10px;
  text-align: center;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

const CloseView = styled.View`
  width: 65px;
  height: 44px;
  margin-horizontal: 10px;
`;

const EventView = styled.View`
  margin-left: 10px;
  margin-right: 20px;
  width: 60px;
  flex-direction: row;
`;

const LiveEvent = styled.View`
  margin-horizontal: 10px;
  width: 24px;
`;

const FavoriteChatroom = styled.View`
  margin-horizontal: 10px;
`;
