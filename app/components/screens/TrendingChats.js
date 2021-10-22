/* This is the trending page, you can access by tapping the task bar in the bottom right
Didn't know how to show the trending page for a specific location. Please resort to
designs for that. */
import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import Popular from './components/Popular';
import Tags from './components/Tags';

class TrendingChats extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <Container>
        <Cover>
          <Title>Search Another Location...</Title>
        </Cover>
        <SubtitleOne>Trending Chatrooms</SubtitleOne>
        <Content>
          {popular.map((popular, index) => (
            <Popular
              key={index}
              title={popular.title}
              trend={popular.trend}
              image={popular.image}
              iconOne={popular.iconOne}
              iconTwo={popular.iconTwo}
              users={popular.users}
              favorites={popular.favorites}
            />
          ))}
        </Content>
        <SubtitleTwo>Trending Tags</SubtitleTwo>
        <TouchableOpacity>
          <Content>
            {tags.map((tags, index) => (
              <Tags
                key={index}
                trend={tags.trend}
                image={tags.image}
                iconOne={tags.iconOne}
                users={tags.users}
              />
            ))}
          </Content>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.push('Alert');
          }}
          style={{ position: 'absolute', top: 780, left: 188 }}>
          <Taskbar>
            <Image source={require('../assets/AJProfile.jpeg')} />
          </Taskbar>
        </TouchableOpacity>
      </Container>
    );
  }
}
export default TrendingChats;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Content = styled.View`
  flex-direction: row;
  align-content: center;
  align-items: center;
  padding-top: 10px;
  margin-left: 20px;
`;

const Cover = styled.View`
  margin-top: 70px;
  margin-left: 30px;
  margin-right: 30px;
  background-color: #6039fe;
  height: 41px;
  justify-content: center;
  align-content: left;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 500px;
  margin-left: 20px;
  color: white;
  opacity: 0.95;
`;

const SubtitleOne = styled.Text`
  font-size: 25px;
  font-weight: 500px;
  color: #6039fe;
  margin-top: 40px;
  margin-left: 40px;
`;

const SubtitleTwo = styled.Text`
  font-size: 25px;
  font-weight: 500px;
  color: #6039fe;
  margin-top: 40px;
  margin-left: 40px;
`;

const Taskbar = styled.View`
  width: 40;
  height: 40;
  background-color: #6039fe;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

const popular = [
  {
    title: 'Drake',
    trend: require('../assets/trending-up.jpg'),
    image: require('../assets/Chatroom1.png'),
    iconOne: require('../assets/user.png'),
    iconTwo: require('../assets/heart.png'),
    users: 92,
    favorites: 82,
  },
  {
    title: 'Nike',
    trend: require('../assets/trending-down.jpg'),
    image: require('../assets/Chatroom2.png'),
    iconOne: require('../assets/user.png'),
    iconTwo: require('../assets/heart.png'),
    users: 52,
    favorites: 82,
  },
  {
    title: 'Coachella',
    trend: require('../assets/trending-up.jpg'),
    image: require('../assets/Chatroom3.png'),
    iconOne: require('../assets/user.png'),
    iconTwo: require('../assets/heart.png'),
    users: 21,
    favorites: 82,
  },
];

const tags = [
  {
    trend: require('../assets/trending-up.jpg'),
    image: require('../assets/Food.png'),
    iconOne: require('../assets/user.png'),
    users: 92,
  },
  {
    trend: require('../assets/trending-down.jpg'),
    image: require('../assets/Love.png'),
    iconOne: require('../assets/user.png'),
    users: 52,
  },
  {
    trend: require('../assets/trending-up.jpg'),
    image: require('../assets/Chatroom3.png'),
    iconOne: require('../assets/user.png'),
    users: 21,
  },
];
