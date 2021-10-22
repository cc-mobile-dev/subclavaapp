import React from 'react';
import styled from 'styled-components';

const TrendingTags = props => (
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

export default TrendingTags;

const Container = styled.View``;

const Content = styled.View``;

const Wrapper = styled.View``;

const Image = styled.Image``;

const Trend = styled.Image``;

const Users = styled.Text``;

const IconOne = styled.Image``;
