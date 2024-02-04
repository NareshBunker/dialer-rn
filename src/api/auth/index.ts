import { FetchMeResponseDto, LoginRequestDto, LoginResponseDto } from '@/api/auth/types';
import { getHttpInstance } from '@/api/base';
import { AxiosResponse } from 'axios';

export const authApi = {
  login: async (data: LoginRequestDto): Promise<LoginResponseDto> => {
    const response: AxiosResponse<LoginResponseDto> = await getHttpInstance().post('/auth/login/mobile', data);
    return response.data;
  },
  logout: async (): Promise<void> => {
    await getHttpInstance().post('/auth/logout');
  },
  me: async (): Promise<FetchMeResponseDto> => {
    const response: AxiosResponse<FetchMeResponseDto> = await getHttpInstance().get('/auth/me');
    return response.data;
  }
}