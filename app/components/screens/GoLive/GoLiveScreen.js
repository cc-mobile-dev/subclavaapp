import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { compose } from 'recompose';

import styles from '../CreateChatroom/CreateChatroomScreen.style';
import { PURPLE, GREEN } from '../../../config/style';
import {
    connectChatrooms,
    connectGlobal,
    connectAuth,
    connectSendBird,
    connectGiveaways,
} from '../../../redux';
import { uploadImage } from '../../../utilities';
import { createChatroom } from '../../../utilities/api';
import { mapLogoIcon } from '../../../utilities/constants';
import navigation from '../../../utilities/navigation';
import { InputLabel } from '../components/InputLabel';

const GoLiveScreen = props => {
    // const [imageUrl, setImageUrl] = useState(null);
    const [spinnerVisible, setSpinnerVisible] = useState(false);
    const [isNew, setIsNew] = useState(!currentGiveaway)

    const [giveaway, setGiveaway] = useState({
        description: '',
        link: '',
        limit: 900,
        uid: 0
    })

    const {
        navigation: { navigate },
        route: { params: { isAdmin, chatroom } },
        giveawaysState: {
            currentGiveaway,
            isFetching
        }
    } = props;

    const _handleSubmit = (gwy) => {
        // createFakeChatrooms();
        // return;

        const { description, limit } = gwy;

        if (!description || !limit) {
            alert(
                'Please fill out the description in order to create your live event.',
            );
            return;
        }
        let payload = {
            ...gwy,
            chatroomId: chatroom.id
        }

        if (isNew) {
            props.createGiveaway(payload)
        } else {
            props.updateGiveaway(payload)
        }

    };

    const _onStop = () => {
        props.deleteGiveaway({ giveawayId: currentGiveaway.id })
        setGiveaway({
            description: '',
            link: '',
            limit: 900,
            uid: 0
        })
        setIsNew(true)
    }

    useEffect(() => {
        setIsNew(!(currentGiveaway && 'id' in currentGiveaway))
        if (currentGiveaway) {
            setGiveaway(currentGiveaway)
        }
    }, [currentGiveaway])

    useEffect(() => {
        if (!isFetching && spinnerVisible) {
            // navigation.back()
        }
    }, [isFetching])

    useEffect(() => {
        setSpinnerVisible(isFetching)
    }, [isFetching])

    useEffect(() => {
        props.navigation.setOptions({
            title: isNew ? 'New Live Event' : 'Current Live Event',
            // headerRight: () => <Feather
            //     name={'check'}
            //     style={{ color: isNew ? GREEN.turquoise : PURPLE.eletricViolet }}
            //     size={25}
            //     onPress={() => _handleSubmit(giveaway)}
            // />
        })
    }, [isNew])

    const limits = [{
        id: 1,
        title: '15 minutes',
        value: 900
    }, {
        id: 2,
        title: '30 minutes',
        value: 1800
    },
    {
        id: 3,
        title: '1 hour',
        value: 3600
    }]


    return (
        <View style={styles.container}>
            {/* <SafeAreaView style={styles.safeContainer}> */}
            <KeyboardAwareScrollView
                enableOnAndroid
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                contentContainerStyle={styles.keyboardAwareScrollViewContainer}>
                {/* <View style={isAdmin ? styles.headerContainerAdmin : styles.headerContainerUser}>
                        <TouchableOpacity onPress={props.navigation.goBack} style={isAdmin ? styles.leftIcon : styles.leftIconUser}>
                            <Feather
                                style={styles.backButton}
                                name='chevron-left'
                                size={25}
                            />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>{isNew ? 'New Live Event' : 'Current Live Event'}</Text>
                        <TouchableOpacity >

                        </TouchableOpacity>
                    </View> */}
                <View style={{ paddingHorizontal: '10%', paddingVertical: '10%' }}>
                    {limits.map(l => <TouchableOpacity key={l.id} onPress={() => setGiveaway(g => ({ ...g, limit: l.value }))} style={{
                        ...styles.joinButton,
                        backgroundColor: giveaway.limit === l.value ? '#6039FE' : '#fff'
                    }}>
                        <Text style={{
                            ...styles.joinButtonTitle,
                            color: giveaway.limit !== l.value ? '#6039FE' : '#fff'
                        }}>{l.title}</Text>
                    </TouchableOpacity>)}
                </View>
                <InputLabel label="Description">
                    <TextInput
                        placeholder={
                            'Write a description for giveaway'
                        }
                        // placeholderTextColor={'#6039FE80'}
                        style={styles.input}
                        value={giveaway.description}
                        onChangeText={description => {
                            setGiveaway(g => ({ ...g, description }))
                        }}
                        maxLength={250}
                        multiline
                    />
                </InputLabel>

                {/* <View style={styles.inputSection}>
                    <Text style={styles.inputTitle}>URL</Text>
                    <TextInput
                        placeholder={'Add the url to the offer'}
                        // placeholderTextColor={'#6039FE80'}
                        style={styles.input}
                        value={giveaway.link}
                        onChangeText={link => setGiveaway(g => ({ ...g, link }))}
                    />
                </View> */}
                {currentGiveaway && <TouchableOpacity
                    style={styles.redButton}
                    onPress={_onStop}>
                    <Text style={styles.buttonText}>
                        {isAdmin ? 'Stop Live Event' : 'Error'}
                    </Text>
                </TouchableOpacity>}
                {isNew && <TouchableOpacity
                    style={styles.greenButton}
                    onPress={() => _handleSubmit(giveaway)}>
                    <Text style={styles.buttonText}>
                        {'Start Live Event'}
                    </Text>
                </TouchableOpacity>}
            </KeyboardAwareScrollView>

            {/* </SafeAreaView> */}
            <Spinner visible={spinnerVisible} />
        </View>
    );
};

export default compose(
    connectGiveaways()
)(GoLiveScreen);
