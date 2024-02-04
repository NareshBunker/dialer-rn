import { useCallback, useState } from 'react';
import { useIsLoading } from '@hooks/use-is-loading';
import { AxiosError } from 'axios';
// import { useAuthContext } from '@/providers/auth-provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_KEY_EXPIRES_AT,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_KEY_EXPIRES_AT
} from '@components/login/constants';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { AppNavigation } from '@/routes.ts';

interface UseApiRequestProps<T> {
  callback: (...args: any[]) => Promise<T>;
  mergeData?: (prevData: T, nextData: T) => T;
  defaultValue?: any;
}

interface UseApiRequestReturnProps<T> {
  data: T | null;
  isLoading: boolean;
  moreLoading: boolean;
  error: any;
  fetchData: (...args: any[]) => Promise<T | undefined>;
  init: (...args: any[]) => Promise<T | undefined>;
  clearData: () => void;
}

const resetTokens = async () => {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY_EXPIRES_AT);
  await AsyncStorage.removeItem(REFRESH_TOKEN_KEY_EXPIRES_AT);
}

export const useApiRequest = <T>({ defaultValue = null, callback, mergeData = undefined }: UseApiRequestProps<T>): UseApiRequestReturnProps<T> => {
  const router: NavigationProp<AppNavigation> = useNavigation()
  // const { resetUser } = useAuthContext();
  const [data, setData] = useState<T | typeof defaultValue>(defaultValue);
  const { isLoading, load, loadEnd } = useIsLoading();
  const { isLoading: isMoreLoading, load: moreLoading, loadEnd: moreLoadingEnd } = useIsLoading();
  const [error, setError] = useState(null);
  
  const clearData = () => {
    setData(defaultValue);
  }
  
  const init = useCallback(async (...args: any[]) => {
    try {
      load();
      const response: Awaited<T> = await callback(...args);
      setData(response);
      return response;
    } catch (error) {
      const err = error as AxiosError;
      if (err?.response?.status === 401) {
        await resetTokens();
        // router.navigate({
        //   pathname: 'auth/login'
        // });
      }
      setError(error as any);
    } finally {
      loadEnd();
    }
  }, [callback]);
  
  const fetchData = useCallback(async (...args: any[]) => {
    moreLoading();
    try {
      const response: T = await callback(...args);
      if (mergeData) {
        setData(mergeData(data as any, response));
      } else {
        setData(response);
      }
      return response;
    } catch (error) {
      setError(error as any);
    } finally {
      moreLoadingEnd();
    }
  }, [callback]);
  
  return {
    data,
    isLoading,
    error,
    fetchData,
    moreLoading: isMoreLoading,
    clearData: clearData,
    init: init,
  };
}