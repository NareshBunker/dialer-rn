import { createContext, ReactNode, useContext, useState } from 'react';
import { AuthProviderProps, UserData } from '@/providers/auth-provider/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsLoading } from '@/hooks';
import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_KEY_EXPIRES_AT,
  REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_KEY_EXPIRES_AT
} from '@components/login/constants';
import { authApi } from '@/api';
import { FetchMeResponseDto, ShopDto } from '@/api/auth/types';
import { AxiosError } from 'axios';
import { useToast } from 'react-native-toast-notifications';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { AppNavigation } from '@/routes.ts';

const initialUser: UserData = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
};

const AuthContext = createContext<AuthProviderProps>({
  user: initialUser,
  isLoaded: false,
  isLoading: false,
  currentShop: null,
  shops: [],
  setUser: () => {},
  resetUser: async () => {},
  loadUserData: async () => {},
  logout: async () => {},
  setCurrentShop: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();
  const { isLoading, load, loadEnd } = useIsLoading();
  const router: NavigationProp<AppNavigation> = useNavigation();
  const [shops, setShops] = useState<ShopDto[]>([]);
  const [currentShop, setCurrentShop] = useState<ShopDto | null>(null);
  const [user, setUser] = useState<UserData>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  const updateUser = (data: UserData) => {
    setUser(data);
  };
  
  const resetUser = async () => {
    setUser(initialUser);
    setIsLoaded(false);
    setShops([]);
    setCurrentShop(null);
    await resetTokens();
  }
  
  const loadUserData = async () => {
    load();
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      const accessToken: string | null = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

      if (!accessToken) {
        await resetUser();
        // router.navigate()
      }
      if (accessToken && !isLoaded) {
        const meResponse: FetchMeResponseDto = await authApi.me();
        const shops: ShopDto[] = meResponse.shopsList;
        const currShop: ShopDto = shops[0];
        setCurrentShop(currShop);
        setShops(shops);
        
        setUser(meResponse.user);
        setIsLoaded(true);
      }
    } catch (e) {
      const err: AxiosError<any> = e as AxiosError;
      const errorStatusCode = err.response?.status;
      if (errorStatusCode === 401) {
        await resetTokens();
        // router.push('/auth/login');
        toast.show('Your session has expired. Please log in again.', {
          placement: 'top',
          style: {
            marginTop: 20,
          },
          type: 'error',
        })
      }
    } finally {
      loadEnd();
    }
  }
  const resetTokens = async () => {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY_EXPIRES_AT);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY_EXPIRES_AT);
  }
  
  const logout = async () => {
    await authApi.logout();
    await resetUser();
    // router.push('/auth/login');
    setIsLoaded(false);
  }
  
  return (
    <AuthContext.Provider value={{
      currentShop: currentShop,
      user: user,
      setUser: updateUser,
      isLoaded,
      resetUser,
      loadUserData,
      isLoading,
      logout,
      shops: shops,
      setCurrentShop: setCurrentShop,
    }}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);