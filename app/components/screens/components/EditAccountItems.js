import React from 'react';
import styled from 'styled-components';

const EditAccountItems = props => (
  <Container>
    <Content>
      <Title>{props.title}</Title>
      <Subtitle>{props.subtitle}</Subtitle>
    </Content>
  </Container>
);

export default EditAccountItems;

const Container = styled.View``;

const Content = styled.View``;

const Title = styled.Text`
  width: 100%;
  left: 30px;
  font-size: 19px;
  font-weight: 800;
  color: #6039fe;
`;

const Subtitle = styled.Text`
  width: 350px;
  left: 30px;
  padding-bottom: 20px;
  font-size: 19px;
  font-weight: 400;
  color: #6039fe;
`;
