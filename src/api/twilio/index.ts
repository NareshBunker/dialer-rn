import { getHttpInstance } from '@/api/base';
import { AccessTokenDto } from '@/api/twilio/types';

export const twilioApi = {
  getVoiceToken: async (): Promise<AccessTokenDto> => {
    const response = await getHttpInstance().get('/calls/access-token/mobile');
    return response.data as AccessTokenDto;
  }
}