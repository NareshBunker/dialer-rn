import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_KEY_EXPIRES_AT,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_KEY_EXPIRES_AT
} from '@components/login/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
// import { API_URL} from '@env';
import { TokensDto } from '@/api/auth/types';

// const API_URL= 'https://a1260c16c672.ngrok.app/api';
const API_URL= "https://4145fc7c46be.ngrok.app/api"

const createInstance = () => {
  return axios.create({
    baseURL: API_URL,
  });
}


const saveTokens = async ({ access, refresh }: TokensDto) => {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, access.token);
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY_EXPIRES_AT, `${access.expiresIn}`);
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refresh.token);
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY_EXPIRES_AT, `${refresh.expiresIn}`);
}

const clearTokens = async () => {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY_EXPIRES_AT);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY_EXPIRES_AT);
}

export const getHttpInstance = (): AxiosInstance => {
  const instance: AxiosInstance = createInstance();
  instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const newConfig: InternalAxiosRequestConfig = config;
    const token: string | null = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      newConfig.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log(newConfig);
    return newConfig;
  });
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.error(error);
      const errorStatusCode = error?.response?.status;
      if (errorStatusCode !== 401) {
        return Promise.reject(error);
      }
      try {
        const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
        const refreshResponse: AxiosResponse<TokensDto> = await axios
          .create({
            baseURL: API_URL,
            headers: {
              'CCAI_REFRESH_TOKEN': refreshToken,
            }
          })
          .post('/auth/refresh-tokens/mobile');
        const { access, refresh} = refreshResponse.data;
        const newAccessToken = access.token as string;
        await saveTokens({ access, refresh });
        const config = {
          ...error.config,
          headers: {
            ...error?.config?.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        };
        return instance.request(config as any);
      } catch (e) {
        const err: AxiosError<any> = e as AxiosError;
        const errStatusCode = err?.response?.status;
        if (errStatusCode === 401) {
          await clearTokens();
        }
      }
      return Promise.reject(error);
    }
  )
  return instance;
}