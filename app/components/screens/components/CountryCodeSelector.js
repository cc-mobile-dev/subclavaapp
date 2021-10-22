import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

// import PhoneInput from 'react-native-phone-input';
import ModalPickerImage from './ModalPickerImage';

class CountryCodeSelector extends Component {
  // state = {
  //   pickerData: null,
  // };

  // componentDidMount() {
  //   // eslint-disable-next-line react/no-did-mount-set-state
  //   this.setState({
  //     pickerData: this.phone.getPickerData(),
  //   });
  // }

  // onPressFlag = () => {
  //   this.myCountryPicker.open();
  // };

  // selectCountry = country => {
  //   this.phone.selectCountry(country.iso2);
  //   this.props.setCountryCode(country.dialCode);
  // };

  render() {
    return (
      <View>
        {/* <PhoneInput
          ref={ref => {
            this.phone = ref;
          }}
          onPressFlag={this.onPressFlag}
          style={{ width: 40, height: 40 }}
        />

        <ModalPickerImage
          ref={ref => {
            this.myCountryPicker = ref;
          }}
          data={this.state.pickerData}
          onChange={country => {
            this.selectCountry(country);
          }}
          cancelText="Cancel"
        /> */}
      </View>
    );
  }
}

module.exports = CountryCodeSelector;
