import { useEffect, useMemo, useRef, useState } from 'react';
import { useIsLoading } from '@/hooks';
import { ActivityIndicator, Text, TouchableOpacity, View, Platform } from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Row } from '@components/common/row';
import { twilioApi } from '@/api';
import { AccessTokenDto } from '@/api/twilio/types';
import { NavigationProp, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/core';
import { Voice } from '@twilio/voice-react-native-sdk';
import { ParamListBase } from '@react-navigation/native';
import { AppNavigation, DIAL_PAD_ROUTE } from '@/routes.ts';
import { voice } from "@/utils";

interface RouteParams extends RouteProp<ParamListBase> {
  params: {
    number: string;
  }
}


export const DialPadCall: React.FC= ()  => {
  const router: NavigationProp<AppNavigation> = useNavigation();
  const { params: { number: phoneQuery } } = useRoute<RouteParams>();
  const route = useRoute();
  const getParam = route?.params
  const phoneNumber: string = useMemo(() => {
    return '';
  }, []);
  const seconds = useRef<number>(0);
  const { isLoading, load, loadEnd } = useIsLoading(false);
  const [deviceData, setDevice] = useState<any | null>(null);
  const currentCall = useRef<any>();
  const currentDevice = useRef<any>();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeakerEnabled, setIsSpeakerEnabled] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const displayTime = () => {
    const minutes = Math.floor(seconds.current / 60);
    const secondsLeft = seconds.current % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  }

  const speakerHandler = () => {
    setIsSpeakerEnabled(!isSpeakerEnabled);
  }

  const muteHandler = () => {
    setIsMuted(!isMuted);
  }

  const connect = async () => {

  }

  const cancelHandler = () => {
    router.navigate(DIAL_PAD_ROUTE);
  }

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    const init = async () => {
      let i = getParam?.number.toString()
      console.log(i);

      try {
        load();
        const tokenRes: AccessTokenDto = await twilioApi.getVoiceToken();
        const token = tokenRes.accessToken;

        voice.on(Voice.Event.AudioDevicesUpdated, (data: any) => {
          console.log('device update', data);
        });
        voice.on(Voice.Event.Unregistered, (data: any) => {
          console.log('unregistered', data);
        });
        voice.on(Voice.Event.Registered, (data: any) => {
          console.log('registered', data);
        });
        voice.on(Voice.Event.Error, (data) => {
          console.log('voice error', data);
        });

        // voice.on(Voice.Event.CancelledCallInvite)
        loadEnd();
        voice.connect(token, {
          params: {
            To: i,
            // To: '+16592087485',
            // To: '+918003080679',
            recipientType: 'number',
          },
          contactHandle: 'some_contact_name_123',
        })
          .then((d) => {
            console.log('call=======================', JSON.stringify(d));
          })
          .catch((e) => {
            console.log('error', e);
          })
        // console.log(222);
        // console.log(call);
      } catch (e) {
        console.log(444);
        console.log(e);
      } finally {
        loadEnd();
      }

      // setDevice(device);
      // console.log('device', device);
      // await connect(device);
      // device.addListener('registered', (data: any) => {
      //   console.log('registered', data);
      // });
    }

    init();

    return () => {
      if (deviceData) {
        deviceData.destroy();
      }
      voice.removeAllListeners();

    };
   
  }, [isFocused]);

  // if (isLoading) {
  //   return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Text>Initializing call...</Text>
  //   </View>
  // }

  return (<View style={styles.container}>
    <View style={styles.calleeContainer}>
      <Text style={styles.calleeText}>Dave, {phoneNumber}</Text>
      <Text style={styles.callTime}>{displayTime()}</Text>
    </View>
    <View style={styles.avatarContainer}>
      <View style={styles.calleeAvatar}></View>
    </View>
    <View style={styles.buttonsContainer}>
      <Row cols={3}>
        <TouchableOpacity style={{
          ...styles.btnContainer,
          ...(isMuted ? { backgroundColor: '#ffffff' } : {}),
        }} onPress={muteHandler}>
          {!isMuted ? <FontAwesome name={'microphone-slash'} size={24} color={'#fff'} /> :
            <FontAwesome name={'microphone'} size={24} color={'#606060'} />}
        </TouchableOpacity>
        <View style={styles.btnContainer}>
          <MaterialIcons name={'dialpad'} size={24} color={'#fff'} />
        </View>
        <TouchableOpacity
          style={{
            ...styles.btnContainer,
            ...(isSpeakerEnabled ? { backgroundColor: '#ffffff' } : {}),
          }}
          onPress={speakerHandler}
        >
          <AntDesign
            name={'sound'}
            size={24}
            color={`${isSpeakerEnabled ? '#606060' : '#ffffff'}`}
          />
        </TouchableOpacity>
      </Row>
    </View>
    <View style={{
      ...styles.buttonsContainer,
      alignItems: 'center',
      marginTop: 40,
    }}>
      {isLoading && <View style={{ height: 80, width: 80 }}>
        <ActivityIndicator size={40} />
      </View>}
      {!isLoading && <TouchableOpacity
        onPress={cancelHandler}
        style={{
          ...styles.btnContainer,
          backgroundColor: '#ff0000',
          borderWidth: 0,
        }}>
        <MaterialCommunityIcons name={'phone-hangup'} size={24} color={'#ffffff'} />
      </TouchableOpacity>}
    </View>
  </View>);
}