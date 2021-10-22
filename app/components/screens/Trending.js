/* This is the trending page, you can access by tapping the task bar in the bottom right
Didn't know how to show the trending page for a specific location. Please resort to
designs for that. */
import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import TrendingChatrooms from './components/TrendingChatrooms';
import TrendingTags from './components/TrendingTags';

class Trending extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <Container>
        <TextInputTitle placeholder="Search Another Location" placeholderTextColor="white" />
        <SubtitleOne>Trending Chatrooms</SubtitleOne>
        <Content>
          {trendingChats.map((popular, index) => (
            <TrendingChatrooms
              key={index}
              title={popular.title}
              trend={popular.trend}
              image={popular.image}
              iconOne={popular.iconOne}
              users={popular.users}
            />
          ))}
        </Content>
        <SubtitleTwo>Trending Tags</SubtitleTwo>
        <TouchableOpacity>
          <Content>
            {trendingTags.map((tags, index) => (
              <TrendingTags
                key={index}
                trend={tags.trend}
                image={tags.image}
                iconOne={tags.iconOne}
                users={tags.users}
              />
            ))}
          </Content>
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', top: 780, left: 188 }} />
      </Container>
    );
  }
}
export default Trending;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  width: 100%;
  flex-direction: row;
`;

// const Cover = styled.View`
//   top: 70px;
//   width: 300px;
//   height: 50px;
//   justify-content: center;
//   align-items: center;
//   border-radius: 14px;
//   box-shadow: 0 18px 10px rgba(134, 130, 130, 0.25)
//   background-color: #6039fe;
// `;

const TextInputTitle = styled.TextInput`
  top: 50px;
  background-color: #6039fe;
  width: 300px;
  height: 40px;
  border-radius: 14px;
  box-shadow: 0 18px 10px rgba(134, 130, 130, 0.25);
  align-self: center;
  padding-left: 15px;
  font-size: 17px;
  font-weight: 500;
  color: white;
`;

const SubtitleOne = styled.Text``;

const SubtitleTwo = styled.Text``;

const trendingChats = [
  {
    title: 'Drake',
    trend: require('../assets/trending-up.png'),
    image: require('../assets/Chatroom1.png'),
    iconOne: require('../assets/user.png'),
    users: 92,
  },
  {
    title: 'Nike',
    trend: require('../assets/trending-down.png'),
    image: require('../assets/Chatroom2.png'),
    iconOne: require('../assets/user.png'),
    users: 52,
  },
  {
    title: 'Coachella',
    trend: require('../assets/trending-up.png'),
    image: require('../assets/Chatroom3.png'),
    iconOne: require('../assets/user.png'),
    users: 21,
  },
];

const trendingTags = [
  {
    trend: require('../assets/trending-up.png'),
    image: require('../assets/Food.png'),
    iconOne: require('../assets/user.png'),
    users: 92,
  },
  {
    trend: require('../assets/trending-down.png'),
    image: require('../assets/Love.png'),
    iconOne: require('../assets/user.png'),
    users: 52,
  },
  {
    trend: require('../assets/trending-up.png'),
    image: require('../assets/Group3.png'),
    iconOne: require('../assets/user.png'),
    users: 21,
  },
];
