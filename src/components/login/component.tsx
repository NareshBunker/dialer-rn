import { View, Image } from 'react-native';
import { Input } from '@components/common/input';
import { Button } from '@components/common/button';
import styles from './styles';
import { Controller, useForm } from 'react-hook-form';
import { useIsLoading } from '@/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '@/api';
import { LoginResponseDto } from '@/api/auth/types';
import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_KEY_EXPIRES_AT,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_KEY_EXPIRES_AT
} from '@components/login/constants';
import { useToast } from 'react-native-toast-notifications';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { AppNavigation, HOME_ROUTE } from '@/routes.ts';

interface LoginForm {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const toast = useToast();
  const { isLoading, loadEnd, load} = useIsLoading();
  const router: NavigationProp<AppNavigation> = useNavigation();
  const { control, handleSubmit, formState: { errors }, reset} = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const onLogin = async (data: LoginForm) => {
    try {
      await new Promise((resolve) => {
        load();
        setTimeout(resolve, 2000);
      });
      const response: LoginResponseDto = await authApi.login({
        email: data.email,
        password: data.password,
      });
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, response.tokens.access.token);
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, response.tokens.refresh.token);
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY_EXPIRES_AT, `${response.tokens.access.expiresIn}`);
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY_EXPIRES_AT, `${response.tokens.refresh.expiresIn}`);
      toast.show('Welcome! Glad you see you!', {
        type: 'default',
        placement: 'top',
        style: {
          marginTop: 20,
        }
      })
      router.navigate(HOME_ROUTE);
      reset();
    } catch (e) {
      const error = e as any;
      console.error(error);
    } finally {
      loadEnd();
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logoImg} source={require('@assets/images/app_logo.png')} />
      </View>
      <View style={styles.formContainer}>
        <View style={{ marginBottom: 20 }}>
          <Controller
            control={control}
            rules={{
              required: { value: true, message: 'E-mail is required' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={'E-mail'}
                placeholder={'Your E-mail'}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.email?.message}
                textContentType={'emailAddress'}
              />
            )}
            name={'email'}
          />
        </View>
        
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'Password is required' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secureTextEntry
              label={'Password'}
              placeholder={'Your password'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
              textContentType={'password'}
            />
          )}
          name={'password'}
        />
        
        <View style={{ marginTop: 20 }}>
          <Button
            title={'Log in'}
            onPress={handleSubmit(onLogin)}
            isFull
            isLoading={isLoading}
          />
        </View>
      </View>
    </View>
  );
}