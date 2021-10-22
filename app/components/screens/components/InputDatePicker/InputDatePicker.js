import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import styles from './InputDatePicker.style';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ClavaModal } from '../ClavaModal';
import { useEffect } from 'reactn';
import moment from 'moment'
import { set } from 'lodash';


const InputDatePicker = props => {

    const { onSelect, value } = props;

    const [_date, _setDate] = useState(value ? new Date(value) : new Date())
    const [changed, setChanged] = useState(!!value)
    const [mode, setMode] = useState('date')
    const [timezone, setTimezone] = useState()
    const [show, setShow] = useState(false)

    const onChange = (event, selected) => {
        _setDate(selected || _date)
        setChanged(true)
        if (Platform.OS === 'android') {
            // dismissedAction
            if (selected === undefined) {
                setShow(false)
            }
            onContinue()
        }
    }

    const onContinue = () => {
        if (mode === 'date') {
            setMode('time')
        } else {
            setShow(false)
            setMode('date')
        }
    }

    useEffect(() => {
        // const tzNames = moment.tz.names();
        // const map = new Map();

        // for (const name of tzNames) {
        //     const offsets = moment.tz.zone(name).offsets;

        //     for (const offset of offsets) {
        //         if (!map.has(offset)) {
        //             map.set(offset, new Set());
        //         }

        //         map.get(offset).add(name);
        //     }
        // }

        // const currentOffset = new Date().getTimezoneOffset();
        // setTimezone(map.get(currentOffset))
    }, [])

    useEffect(() => {
        if (!value) {
            setChanged(false)
        }
    }, [value])

    useEffect(() => {
        if (onSelect) {
            //differentiate between now and past time
            onSelect(changed ? _date : null)
        }
    }, [_date])

    let dateText = moment(_date).format('MMM Do, YYYY')
    let timeText = moment(_date).format('hh:mm A')
    return (
        <TouchableOpacity
            style={[styles.inputItem, props.wrapperStyle]}
            onPress={() => setShow(!show)}
        >
            <Text style={{
                ...styles.inputText,
                color: changed ? '#000' : '#b4b4b4'
            }}>{`Schedule ${changed ? `on ${dateText} at ${timeText}` : 'Now'}`}</Text>
            <ClavaModal
                isVisible={show}
                onBackdropPress={() => setShow(!show)}
            >
                <View style={styles.pickerContainer}>
                    <Text style={styles.modalTitleText}>{`Pick a ${mode}`}</Text>
                    {mode === 'time' && <TouchableOpacity
                        style={styles.clearLeftContainer}
                        onPress={() => {
                            setMode('date')
                        }}
                    >
                        <Text style={styles.clearText}>Back</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity
                        style={styles.clearRightContainer}
                        onPress={() => {
                            setChanged(false)
                            if (onSelect) {
                                onSelect(null)
                            }
                            setShow(false)
                        }}
                    >
                        <Text style={styles.clearText}>Now</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        value={_date}
                        mode={mode}
                        display="spinner"
                        onChange={onChange}
                        textColor="black"
                    />
                    <TouchableOpacity
                        onPress={onContinue}
                        style={styles.confirmButton}>
                        <Text style={styles.joinButtonTitle}>{mode === 'date' ? 'Continue' : 'Done'}</Text>
                    </TouchableOpacity>
                </View>
            </ClavaModal>
            {/* {changed && <Text style={styles.timeZone}>({timezone})</Text>} */}
        </TouchableOpacity>
    );
};

export default InputDatePicker;
