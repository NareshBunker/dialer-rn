import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  GestureResponderEvent,
  Alert,
} from 'react-native';

import styles from './styles';
import {Row} from '@components/common/row';
import {MutableRefObject, RefObject, useEffect, useRef, useState} from 'react';
import {DialPadButton} from '@components/dial-pad/keyboard/button';
import {KeyboardButtonEntity} from '@components/dial-pad/keyboard/types';
import {useIsLoading} from '@/hooks';
import {ToastType, useToast} from 'react-native-toast-notifications';
import {useAuthContext} from '@/providers';
import {NavigationProp, useNavigation} from '@react-navigation/core';
import {AppNavigation, DIAL_PAD_CALL_ROUTE, DIAL_PAD_ROUTE} from '@/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const rows: KeyboardButtonEntity[][] = [
  [
    {label: '1', isActive: true},
    {label: '2', isActive: true},
    {label: '3', isActive: true},
  ],
  [
    {label: '4', isActive: true},
    {label: '5', isActive: true},
    {label: '6', isActive: true},
  ],
  [
    {label: '7', isActive: true},
    {label: '8', isActive: true},
    {label: '9', isActive: true},
  ],
  [
    {label: '', isActive: false},
    {label: '0', isActive: true},
    {label: '', isActive: false},
  ],
];

const LIMIT = 13;

export const DialPadKeyboard = () => {
  const {currentShop} = useAuthContext();
  const toast: ToastType = useToast();
  const router: NavigationProp<AppNavigation> = useNavigation();
  const {user} = useAuthContext();
  const {isLoading, load, loadEnd} = useIsLoading();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const ref: RefObject<TextInput> = useRef<TextInput>(null);
  const value: MutableRefObject<string> = useRef<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const init = async () => {};
    init();
  }, []);

  const onClear = () => {
    const currValue = value.current;
    const newValue = currValue.slice(0, currValue.length - 1);
    value.current = newValue;
    ref?.current?.setNativeProps({text: newValue});
    if (!newValue || newValue === '+') {
      setError('');
    }
  };

  const onReset = () => {
    value.current = '';
    ref?.current?.setNativeProps({text: ''});
    setError('');
  };

  const onButtonClick = (btn: KeyboardButtonEntity) => {
    let currValue = value.current;
    if (!btn.isActive) {
      return;
    }
    if (currValue.length === LIMIT) {
      return;
    }
    if (!currValue) {
      currValue += '+';
    }
    const result = `${currValue}${btn.label}`;
    value.current = result;
    console.log("result ====", result);
    
    ref?.current?.setNativeProps({text: result});
  };

  const onCall = async () => {
    if (!value.current) {
      Alert.alert('Error', 'Please enter phone number');
      return;
    }
    
    router.navigate(DIAL_PAD_CALL_ROUTE,{number:value.current});
    // return;
    // if (!currentShop) {
    //   return;
    // }
    // const regex = new RegExp(/\+61[0-9]{9}/);
    // if (!regex.test(value.current)) {
    //   setError('Phone number must be in format +61XXXXXXXXX');
    //   return;
    // }
    // try {
    //   load();
    //   await callApi.initCall(value.current, currentShop?.id);
    //   toast.show('We are calling you and your callee...', {
    //     type: 'success',
    //     placement: 'top',
    //     style: {
    //       marginTop: 20,
    //     }
    //   })
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   loadEnd();
    // }
  };

  const changeNumber = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPhoneNumber((prev: string) => {
      const newChars = e.nativeEvent.text.replace(prev, '');
      if (newChars.match('0-9')) {
        return prev;
      }
      return e.nativeEvent.text;
    });
    console.log("---------", phoneNumber);
    
  };

  return (
    <View>
      <View style={styles.valueContainer}>
        <ScrollView style={{flex: 1}}>
          <TextInput
            ref={ref}
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#3b82f6',
              textAlign: 'center',
            }}
            value={phoneNumber}
            onChange={changeNumber}
          />
          <View>
            {!!error && (
              <Text style={{fontSize: 12, color: 'red', fontWeight: 'bold'}}>
                {error}
              </Text>
            )}
          </View>
        </ScrollView>
        <Pressable onPress={onClear} onLongPress={onReset}>
          <Ionicons name="backspace-outline" size={24} color={'#000000'} />
        </Pressable>
      </View>
      <View style={{height: 350, paddingHorizontal: 30}}>
        {rows.map((row, idx: number) => (
          <Row cols={3} key={`${Math.random()}`}>
            {row.map((item: KeyboardButtonEntity, idx: number) => (
              <TouchableHighlight
                style={{
                  alignItems: 'center',
                  width: 75,
                  height: 75,
                  borderRadius: 75 / 2,
                }}
                underlayColor={'#dddddd'}
                onPress={(e: GestureResponderEvent) => {
                  e.preventDefault();
                  onButtonClick(item);
                }}
                key={`${item.label}${idx}`}>
                <DialPadButton item={item} />
              </TouchableHighlight>
            ))}
          </Row>
        ))}
        <Row cols={3}>
          <View />
          <TouchableOpacity onPress={onCall}>
            <View
              style={{
                width: 75,
                height: 75,
                borderRadius: 75 / 2,
                backgroundColor: '#3b82f6',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              {isLoading && <ActivityIndicator size={24} />}
              {!isLoading && (
                <FontAwesome name={'phone'} size={24} color={'#ffffff'} />
              )}
            </View>
          </TouchableOpacity>
          <View />
        </Row>
      </View>
    </View>
  );
};
