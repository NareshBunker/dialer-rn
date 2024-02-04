import { ShopDto } from '@/api/auth/types';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export interface AuthProviderProps {
  user: UserData;
  isLoaded: boolean;
  isLoading: boolean;
  setUser: (data: UserData) => void;
  resetUser: () => Promise<void>;
  loadUserData: () => Promise<void>;
  logout: () => Promise<void>;
  currentShop: ShopDto | null;
  shops: ShopDto[];
  setCurrentShop: (item: ShopDto) => void;
}