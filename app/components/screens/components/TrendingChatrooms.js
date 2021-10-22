import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';

const TrendingChatrooms = props => (
  <Container>
    <TouchableOpacity>
      <Content>
        <Image source={props.image} />
      </Content>
    </TouchableOpacity>
    <Trend source={props.trend} />
    <Title>{props.title}</Title>
    <Wrapper>
      <IconOne source={props.iconOne} />
      <Users>{props.users}</Users>
    </Wrapper>
  </Container>
);

export default TrendingChatrooms;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  top: 100;
  justify-content: space-evenly;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text``;

const Image = styled.Image``;

const Trend = styled.Image``;

const Users = styled.Text`
  top: 20px;
  font-size: 15px;
  font-weight: 500;
  color: #6039fe;
`;

const IconOne = styled.Image``;
