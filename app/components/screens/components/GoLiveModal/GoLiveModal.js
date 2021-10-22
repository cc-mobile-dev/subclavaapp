import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './GoLiveModal.style';
import { ClavaModal } from '../ClavaModal';
import { InputLabel } from '../InputLabel';
import { TextInput } from 'react-native';
import { useEffect, useState } from 'reactn';
import { compose } from 'recompose';
import { connectGiveaways, connectLiveVideo } from '../../../../redux';
import { toast } from '../../../../utilities/toast';
import { FetchLoader } from '../FetchLoader';
import { KeyboardAvoidingView } from 'react-native';
import Clipboard from '@react-native-community/clipboard';

const GoLiveModal = props => {
  const {
    chatroom,
    currentGiveaway,
    giveawaysState: {
      isFetching,
      all
    },
    onDone
  } = props;

  const [description, setDescription] = useState('')
  const [hide, setHide] = useState(false)
  const [isNew, setIsNew] = useState(false)

  const _handleSubmit = () => {
    // createFakeChatrooms();
    // return;

    if (!description) {
      toast('Please fill out a description');
      return;
    }
    let payload = {
      description,
      limit: 900,
      uid: 0,
      chatroomId: chatroom.objectId,
    };

    props.createGiveaway(payload);
  };

  const _copyShareURL = () => {
    Clipboard.setString(`https://4fm8o.app.link/${chatroom.objectId}`);
    toast('Link copied');
    if (props.onBackdropPress) {
      props.onBackdropPress();
    }
  };

  useEffect(() => {
    if (currentGiveaway) {
      setHide(true);
    }
  }, [currentGiveaway]);

  useEffect(() => {
    if (all) {
      // setHide(true)
      onDone()
    }
  }, [all])

  return (
    <ClavaModal
      {...props}
      isVisible={props.isVisible && !hide}
      onBackdropPress={() => {
        if (!isFetching) {
          props.onBackdropPress()
        }
      }}
    >
      <KeyboardAvoidingView behavior={'padding'}>
        <View style={styles.container}>
          <FetchLoader loading={isFetching}>
            {!currentGiveaway
              ? <>
                <Text style={styles.description}>{'Create your exclusive Live.'}</Text>
                <InputLabel>
                  <TextInput
                    autoCapitalize={'none'}
                    style={styles.input}
                    value={description}
                    onChangeText={title => setDescription(title)}
                    placeholder="Describe your Live..."
                    placeholderTextColor="#797979"
                  />
                </InputLabel>
                <TouchableOpacity onPress={() => _handleSubmit()} style={styles.joinButton}>
                  <Text style={styles.joinButtonTitle}>{'Go Live'}</Text>
                </TouchableOpacity>
              </>
              : <TouchableOpacity onPress={() => _copyShareURL()} style={styles.joinButton}>
                <Text style={styles.joinButtonTitle}>{'Copy Share Url'}</Text>
              </TouchableOpacity>}
          </FetchLoader>
        </View>
      </KeyboardAvoidingView>
    </ClavaModal>
  );
};

export default compose(connectGiveaways())(GoLiveModal);
