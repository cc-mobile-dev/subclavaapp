import React from 'react';
import styled from 'styled-components';

const Tags = props => (
  <Container>
    <Content>
      <Image source={props.image} />
    </Content>
    <Trend source={props.trend} />
    <Wrapper>
      <IconOne source={props.iconOne} />
      <Users>{props.users}</Users>
    </Wrapper>
  </Container>
);

export default Tags;

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
  padding-top: 10px;
  padding-bottom: 2px;
  align-items: center;
  justify-content: center;
  width: 20px;
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

const IconOne = styled.Image`
  margin-right: 10px;
  margin-top: 2px;
`;
