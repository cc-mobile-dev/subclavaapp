import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Pdf from 'react-native-pdf';

import { PURPLE } from '../../config/style';

const PdfDisplay = (props) => {
  console.log('pdf props: ', props.navigation)
  const {
    navigation: {
      goBack,
      // state: {
      //   params: { pdf }
      // }
    },
  } = props;
  const pdfs = {
    PrivacyPolicy: {
      uri: 'https://clava.s3.us-east-2.amazonaws.com/PrivacyPolicy.pdf',
      cache: true
    },
    TermsOfService: {
      uri: 'https://clava.s3.us-east-2.amazonaws.com/Terms+%26+Conditions.pdf',
      cache: true,
    }
  }
  const pdf = props.navigation.state ? pdfs[props.navigation.state.routeName] : pdfs[props.route.name];
  return (
    <View style={styles.container}>
      <Pdf
        source={pdf}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    // alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 50 : 50,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  backButton: {
    // position: 'absolute',
    left: 38,
    alignSelf: 'flex-start'
  },
  backIcon: {
    color: PURPLE.eletricViolet,
    fontSize: 24,
  },
});

export default PdfDisplay;
