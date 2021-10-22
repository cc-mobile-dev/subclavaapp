import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { compose } from 'recompose';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { } from '../../../redux';
import times from './times';
import styles from './LiveEventScreen.style';

const LiveEventScreen = (props) => {
  const [timeLength, setTimeLength] = useState(null);
  const [description, setDescription] = useState('');
  const [eventLink, setEventLink] = useState('');
  const {
    navigation: { navigate, goBack },
  } = props;

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps='always'
          keyboardDismissMode='on-drag'
          contentContainerStyle={styles.keyboardAwareScrollViewContainer}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.leftIcon}
              onPress={goBack}
            >
              <Feather
                name="chevron-left"
                style={styles.backButton}
                size={25}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Live Event Information</Text>
          </View>
          <View style={styles.timesContainer}>
            {/* {times.map(time => (
              <TouchableOpacity
                style={timeLength === time.value ? styles.timeButtonSelected : styles.timeButton}
                onPress={() => setTimeLength(time.value)}
              >
                <Text
                  style={timeLength === time.value ? styles.timeTextSelected : styles.timeText}
                >
                  {time.text}
                </Text>
              </TouchableOpacity>
            ))} */}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  )
};

export default compose()(LiveEventScreen);