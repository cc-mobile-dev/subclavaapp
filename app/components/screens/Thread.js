import React from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
// import { Chat, Channel, Thread } from 'stream-chat-expo';
import styled from 'styled-components';
import * as Icon from 'react-native-vector-icons';

const ThreadScreen = props => {
  const { navigation } = props;
  const thread = navigation.getParam('thread');
  const chatClient = navigation.getParam('chatClient');
  const channel = chatClient.channel('messaging', navigation.getParam('channel'));

  return (
    <SafeAreaView>
      {/* <Chat client={chatClient}>
        <Channel client={chatClient} channel={channel} thread={thread} dummyProp="DUMMY PROP">
          <Container>
            <Cover>
              <Title>Thread</Title>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.goBack();
                }}
                style={{ position: 'absolute', left: 30, top: 0 }}>
                <CloseView>
                  <Icon.Ionicons name="ios-arrow-back" size={24} color="#6039fe" />
                </CloseView>
              </TouchableOpacity>
            </Cover>
            <Thread thread={thread} />
          </Container>
        </Channel>
      </Chat> */}
    </SafeAreaView>
  );
};

ThreadScreen.navigationOptions = () => ({
  headerShown: false,
});

export default ThreadScreen;

const Container = styled.View`
  flex: 1;
  background: white;
`;

const Cover = styled.View`
  margin-top: 35px;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 19px;
  color: #6039fe;
  font-weight: 700;
  align-self: center;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
`;
