import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './CountdownTimer.style';
import { useEffect } from 'reactn';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

const CountdownTimer = props => {
  // const { endAt } = props;
  const { giveaway = { isRecording: false, isActive: false }, size = 'medium' } = props;

  const [timer, setTimer] = useState(0)
  const [startedAt, setStartedAt] = useState(0)

  // useEffect(() => {
  //   if (giveaway && giveaway.isRecording && startedAt === 0) {
  //     setStartedAt(Date.now())
  //     setTimer(Math.floor((Date.now() - startedAt) / 1000))
  //   }
  // }, [giveaway])

  // useEffect(() => {
  //   if (giveaway && giveaway.isRecording) {
  //     setTimeout(() => {
  //       setTimer(Math.floor((Date.now() - startedAt) / 1000))
  //     }, 1000)
  //     // return () => {
  //     //   if (timerInterval) {
  //     //     clearInterval(timerInterval)
  //     //   }
  //     // }
  //   }
  // }, [timer])

  // const timeText = (secs) => {
  //   let totalMinutes = Math.floor(secs / 60)  //With hours out this will retun minutes
  //   let totalSeconds = secs - (totalMinutes * 60)
  //   return `${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`
  // }

  // const isRecording = giveaway && giveaway.isRecording

  return (
    <View style={styles.timer}>
      {/* <Text style={styles.timerText}>{endAt ? (timer <= 0 ? 'Ended' : timeText(timer)) : 'Live'}</Text> */}
      {/* {isRecording
        ? <Material name={'record'} color={'#fff'} size={20} style={{ marginTop: 2 }} />
        : <ActivityIndicator size="small" color="#fff" animating />
      } */}
      <Text style={styles.timerText}>
        {/* {
          isRecording
            ? `LIVE`
            : `Connecting...`
        } */}
        {'LIVE'}
      </Text>
    </View>
  );
};
export default CountdownTimer;