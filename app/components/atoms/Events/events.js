// packages
import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';

const Outline = ({ backgroundColor = '#6039fe' }) => (
  <View
    style={[
      {
        width: 45,
        height: 45,
        backgroundColor,
        borderRadius: 22.5,
        position: 'absolute',
        top: -5.25,
        left: -5.25,
        right: 0,
        bottom: 0,
      },
    ]}
  />
);

const Events = props => {
  const { style, source } = props;
  return (
    <View style={style ? style : {}}>
      <Outline />
      <Image
        source={source}
        style={{
          width: 35,
          height: 35,
        }}
      />
    </View>
  );
};

Events.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.string),
    }),
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        headers: PropTypes.objectOf(PropTypes.string),
      })
    ),
  ]).isRequired,
  style: PropTypes.object,
};

export default Events;
