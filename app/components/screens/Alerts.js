import React from 'react';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

class Alerts extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <Container>
        <Cover>
          <Title> Alerts </Title>
        </Cover>
        <Content>
          <TouchableOpacity styled={{ position: 'absolute' }}>
            <Image />
          </TouchableOpacity>
          <TouchableOpacity>
            <Wrapper>
              <Business> Ceremony Coffee </Business>
              <Discount> 10% off coffee </Discount>
            </Wrapper>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ios-arrow-forward" size={24} color="#6039fe" />
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default Alerts;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  top: 70px;
`;

const Title = styled.Text`
  font-size: 19px;
  font-weight: 500;
  color: #6039fe;
  align-self: center;
`;

const Content = styled.View`
  top: 100px;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;

const Image = styled.Image`
  height: 10px;
  width: 10px;
  background: black;
`;

const Wrapper = styled.View`
  align-self: center;
  flex-direction: column;
  justify-content: center;
`;

const Business = styled.Text`
  align-self: center;
  font-size: 19px;
  font-weight; 700;
  color: #6039fe;
`;

const Discount = styled.Text`
  align-self: center;
  align-self: center;
  font-size: 15px;
  font-weight; 500;
  color: #6039fe;
`;
