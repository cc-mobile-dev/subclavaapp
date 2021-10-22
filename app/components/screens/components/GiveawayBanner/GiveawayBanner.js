import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import styles from './GiveawayBanner.style';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useEffect, useState } from 'react';

const GiveawayBanner = props => {
    const { giveaway } = props;

    const [timer, setTimer] = useState(giveaway.limit)
    const [actualTime, setActualTime] = useState('')
    const [isOver, setIsOver] = useState(false)

    const _onPress = () => {
        if (giveaway.link && !isOver) {
            if (Linking.canOpenURL(giveaway.link)) {
                Linking.openURL(giveaway.link)
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            var sec_num = (new Date(giveaway.expiresAt).getTime() - Date.now()) / 1000   // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));

            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            if (seconds < 10) { seconds = "0" + seconds; }
            setActualTime(minutes + ':' + seconds.toString());

            if (sec_num <= 0) {
                setIsOver(true)
                clearInterval(interval)
            }

        }, 1000);
        return () => clearInterval(interval);
    }, [giveaway.limit]);

    return (
        <TouchableOpacity style={{
            ...styles.liveEvent,
            backgroundColor: isOver ? '#ddd' : '#6C38FF'

        }} onPress={_onPress}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ flex: 2, alignItems: 'flex-start' }}>
                    <View style={{ backgroundColor: '#fff', borderRadius: 50, width: 80, height: 80, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={styles.eventTimeText}>{actualTime}</Text>
                    </View>
                </View>
                <View style={{ flex: 4, alignItems: 'flex-start' }}>
                    <Text style={styles.eventTitleText}>{'New Drop'}</Text>
                    <Text style={styles.eventDescText}>{giveaway.description}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <View style={{ flex: 1, justifyContent: 'center', paddingRight: '10%' }}>
                        <Ionicons name='ios-arrow-forward' color={'#fff'} size={30} />
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    );
};

export default GiveawayBanner;
