import React from 'react';
import styled from 'styled-components';

const SearchTags = props => (
  <Container>
    <Title>{props.title}</Title>
  </Container>
);

export default SearchTags;

const Container = styled.View`
  height: 30;
  background-color: #3ee8b5;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  width: 120px;
  justify-content: center;
  margin: 2px;
`;

const Title = styled.Text`
  color: white;
  align-self: center;
  font-size: 15px;
  font-weight: 500;
`;
