import React, { useState, useEffect, useRef } from 'react';
import { compose } from 'redux';
import { View, Share, ActivityIndicator, Dimensions, PermissionsAndroid } from 'react-native';
import { NodeCameraView } from 'react-native-nodemediaclient'
import Video from 'react-native-video';
import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcEngineContext,
  RtcLocalView,
  VideoFrameRate,
  VideoOutputOrientationMode,
  VideoRenderMode,
  AudienceLatencyLevelType,
  RtcRemoteView,
} from 'react-native-agora';
import {
  connectAuth,
  connectGlobal,
  connectGiveaways,
  connectLiveVideo,
  connectChat
} from '../../../redux';
import styles from './LiveVideoScreen.style';
import { CountdownTimer } from '../components/CountdownTimer';
import LiveVideoChat from '../components/LiveVideoChat/LiveVideoChat';
import { ConfirmModal } from '../components/ConfirmModal';
import ToggleIcon from '../components/ToggleIcon/ToggleIcon';
import { toast } from '../../../utilities/toast';
import { navigate } from '../../../utilities/navigation';
import BalanceTag from '../components/BalanceTag/BalanceTag';
import KeepAwake from 'react-native-keep-awake';
import { IconTag } from '../components/IconTag';
import { AGORA_APP_ID } from '@env'

const LiveVideoScreen = props => {
  const {
    route: {
      params: {
        isAdmin,
        giveaway
      }
    },
    liveVideoState: {
      currentView,
      isFetching
    }
  } = props;

  const [engine, setEngine] = useState(null)
  const [remoteUid, setRemoteUid] = useState(0)
  const [didJoin, setDidJoin] = useState(false)
  // const [isHiden, setIsHidden] = useState(true)
  const [isChatHidden, setIsChatHidden] = useState(false)
  const [isEnding, setIsEnding] = useState(false)
  const [loading, setLoading] = useState(isFetching)

  useEffect(() => {
    requestCameraAndAudioPermission()
    return () => {
      //have to keep this to clear the token and the
      //live saga reducer for an admin
      props.stopVideo();
    }
  }, [])

  useEffect(() => {
    if (giveaway) {
      props.getLiveToken({
        giveawayId: giveaway.objectId
      })
    }
  }, [giveaway])

  useEffect(() => {
    if (!isAdmin && props.liveVideoState.token) {
      props.startCountdown({
        giveaway,
        startDate: Date.now()
      })
    }
    if (!didJoin && props.liveVideoState.token) {
      initEngine()
    }
    // props.userJoined()
  }, [props.liveVideoState.token])

  useEffect(() => {
    setLoading(isFetching)
  }, [isFetching])

  const requestCameraAndAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ])
      if (
        granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
        && granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the cameras & mic')
      } else {
        console.log('Permission denied')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const initEngine = async () => {
    let e = await RtcEngine.createWithContext(
      new RtcEngineContext(AGORA_APP_ID)
    );
    setEngine(e)

    eng = e

    addListeners(eng)

    await eng.enableVideo();

    await eng.setChannelProfile(ChannelProfile.LiveBroadcasting);

    let option, role;
    if (isAdmin) {
      role = ClientRole.Broadcaster
      await eng.setVideoEncoderConfiguration({
        dimensions: {
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        },
        frameRate: VideoFrameRate.Fps30,
        orientationMode: VideoOutputOrientationMode.Adaptative,
      });
      // enable camera/mic, this will bring up permission dialog for first time
      await eng.enableLocalAudio(true);
      await eng.enableLocalVideo(true);
    } else {
      role = ClientRole.Audience
      // You have to provide client role options if set to audience
      option = {
        audienceLatencyLevel: AudienceLatencyLevelType.LowLatency
      };
    }
    await eng.setClientRole(role, option);

    await eng.setDefaultAudioRoutetoSpeakerphone(true);

    await eng.joinChannel(
      props.liveVideoState.token,
      giveaway.objectId,
      null,
      0,
      undefined
    );
  }

  const addListeners = (eng) => {
    eng.addListener('Warning', (warningCode) => {
      console.info('Warning', warningCode);
    });
    eng.addListener('Error', (errorCode) => {
      console.info('Error', errorCode);
    });
    eng.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.info('JoinChannelSuccess', channel, uid, elapsed);
      // RtcLocalView.SurfaceView must render after engine init and channel join
      setDidJoin(true)
    });
    eng.addListener('UserJoined', async (uid, elapsed) => {
      console.info('UserJoined', uid, elapsed);
      setRemoteUid(uid)
    });
    eng.addListener('UserOffline', (uid, reason) => {
      console.info('UserOffline', uid, reason);
      setRemoteUid(undefined)
    });
  }
  const destroyEngine = async () => {
    if (engine) {
      await engine.destroy()
    }
  }

  const onDelete = async () => {
    props.leaveGiveaway({
      giveawayId: giveaway.objectId
    })
    await destroyEngine()
    setIsEnding(false)
  }

  const onClose = async () => {
    if (isAdmin) {
      setIsEnding(true);
    } else {
      await destroyEngine()
      //do this cuz stop video is being called
      // inside stop countdown
      props.stopCountdown({
        currentView,
        isAdmin
      });
      navigate('Home');
    }
  };

  const switchCamera = async () => {
    // if (engine) {
    //   await engine.switchCamera()
    // }
    engine.switchCamera()
  }

  const onSendButtonPress = (data) => {
    props.sendMessage(data)
  }


  const onShare = async message => {
    try {
      const result = await Share.share({
        message: 'Join this exclusive live right now!',
        url: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          toast('Shared link successfully');
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  // console.log(liveGiveaway)
  return (
    <View style={styles.container}>
      {didJoin && (
        isAdmin
          ? <RtcLocalView.SurfaceView
            style={styles.surfaceView}
            renderMode={VideoRenderMode.Hidden}
          /> :
          remoteUid ? <RtcRemoteView.SurfaceView
            style={styles.surfaceView}
            uid={remoteUid}
          /> : <View />
      )}
      {loading && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <ActivityIndicator color="#fff" size={22} animating />
      </View>}
      <View style={styles.topBar}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'flex-end',
          }}>
          <View style={{ alignItems: 'flex-start', flex: 1, marginBottom: 10 }}>
            <ToggleIcon
              canToggle={false}
              activeIcon="x"
              onToggle={() => onClose()}
            />
          </View>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <IconTag
              icon='users'
              text={props.chatState.numUsers}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5
              }}
            />
          </View>
          <View style={{ alignItems: 'flex-end', paddingBottom: 20, flex: 1 }}>
            {/* {
              isLive
            }
             */}
            {isAdmin
              ? <CountdownTimer giveaway={giveaway} />
              : <BalanceTag inverted size="small" />
            }
            {isAdmin && <>
              {/* <ToggleIcon
                style={{ marginTop: 20 }}
                activeIcon='mic'
                inactiveIcon='mic-off'
                switchColor
                onToggle={toggled => setIsMuted(toggled)}
              /> */}
              {/* <ToggleIcon
                initialValue={isLive}
                style={{ marginTop: 30 }}
                activeIcon='pause'
                inactiveIcon='play'
                switchColor
                onToggle={setIsLive}
              /> */}
              <ToggleIcon
                style={{ marginTop: 30 }}
                activeIcon='refresh-ccw'
                canToggle={false}
                onToggle={() => switchCamera()}
              />
            </>}

            <ToggleIcon
              style={{ marginTop: 30 }}
              activeIcon="share"
              canToggle={false}
              onToggle={() =>
                onShare(`https://4fm8o.app.link/${giveaway.objectId}`)
              }
            />
            <ToggleIcon
              style={{ marginTop: 30 }}
              activeIcon="message-square"
              inactiveIcon="message-square"
              switchColor
              onToggle={toggled => setIsChatHidden(toggled)}
            />
          </View>
        </View>
      </View>

      {!isChatHidden && (
        <LiveVideoChat
          currentUser={props.authState.currentUser}
          currentChat={props.chatState.messages}
          onSendButtonPress={onSendButtonPress}
          giveaway={giveaway}
        />
      )}
      <ConfirmModal
        title={`Are you sure you want to end the live ?`}
        isVisible={isEnding}
        onBackdropPress={() => setIsEnding(false)}
        onCancel={() => setIsEnding(false)}
        onConfirm={() => onDelete()}
      />
      <KeepAwake />
    </View>
  );
};

export default compose(
  connectGlobal(),
  connectAuth(),
  connectChat(),
  connectGiveaways(),
  connectLiveVideo(),
)(LiveVideoScreen);
