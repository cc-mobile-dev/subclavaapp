import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';

const Popular = props => (
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
    <Wrapper>
      <IconTwo source={props.iconTwo} />
      <Favorites>{props.favorites}</Favorites>
    </Wrapper>
  </Container>
);

export default Popular;

const Container = styled.View`
  justify-items: center;
  align-items: center;
`;

const Content = styled.View`
  flex-direction: column;
  align-items: center;
  padding-bottom: 120px;
  padding-left: 125px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  padding-top: 2px;
  padding-bottom: 2px;
  align-items: center;
  justify-content: center;
  width: 20px;
`;

const Title = styled.Text`
  font-size: 19px;
  color: #6039fe;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Image = styled.Image`
  position: absolute;
`;

const Trend = styled.Image``;

const Users = styled.Text`
  margin-top: 2px;
  color: #6039fe;
  font-weight: 400;
`;

const Favorites = styled.Text`
  color: #6039fe;
  font-weight: 400;
`;

const IconOne = styled.Image`
  margin-right: 10px;
  margin-top: 2px;
`;

const IconTwo = styled.Image`
  margin-right: 10px;
`;
