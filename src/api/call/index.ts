import { getHttpInstance } from '@/api/base';
import { CallDetailsByIdResponseDto, GetCallsListRequest } from './types';
import { AxiosResponse } from 'axios';

export const callApi = {
  initCall: async (toNumber: string, shopId: string) => {
    return await getHttpInstance().post('/calls/init', {
      shopId: shopId,
      toNumber: toNumber,
      fromNumber: '+380937010009',
    });
  },
  list: async ({ filter, hideArchived, shopId, callIds, page, customerRequiresFollowUp }: GetCallsListRequest) => {
    return await getHttpInstance().post('/calls', {
      ...filter,
      hideArchived: hideArchived,
      shopId: shopId,
      callIds: callIds,
      page: page,
      perPage: 15,
      customerRequiresFollowUp: customerRequiresFollowUp,
    });
  },
  byId: async (id: string) => {
    const response = await getHttpInstance().get(`/calls/${id}`);
    return response.data;
  },
  changeFollowUp: async (customerId: string, newValue: boolean) => {
    const response = await getHttpInstance()
      .put(`/customer/${customerId}/follow-up`, { newState: newValue });
    return response.data;
  },
  aiTemplatesList: async () => {
    return getHttpInstance()
      .get('/followup/ai-templates')
      .then((response) => {
        return response.data;
      });
  },
  shopTemplates: async (shopId: string) => {
    return getHttpInstance()
      .post('/followup/shop-templates', {
        shopId: shopId,
      })
      .then((response) => {
        return response.data;
      });
  },
  generateAITemplate: async (callId: string, action: string) => {
    const response = await getHttpInstance()
      .get(`/followup/generate-template-common?action=${action}&callId=${callId}`);
    return response.data;
  }
}