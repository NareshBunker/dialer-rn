export interface GetCallsListRequest {
  filter: {
    startDate: string | Date | null;
    endDate: string | Date | null;
  };
  hideArchived: boolean;
  shopId: string;
  callIds: string[];
  page: number,
  customerRequiresFollowUp?: boolean | null;
}

export interface CallsListResponseDto {
  data: CallDto[];
  hasNextPage: boolean;
}

export interface CallDto {
  id: string;
  fromNumber: string;
  toNumber: string;
  direction: 'SHOP_TO_CUSTOMER' | 'CUSTOMER_TO_SHOP';
  startTime: Date;
  endTime: Date;
  duration: number;
  shopId: string;
  customerId: string;
  createdAt: Date;
  summary: string | null;
  transcription: string | null;
  transcriptionSpeakers: string | null;
  tags: string | null;
  carName: string | null;
  title: string | null;
  recordingUrl: string;
  processingStatus: string;
  isArchived: boolean;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    isRequiresFollowUp: boolean;
  } | null;
  callTypeId: string;
  answeredByUserId: string;
  scoreData: string | null;
  answeredByUser: any;
  callType: any;
}

export interface CallDetailsByIdResponseDto {
  data: CallDto;
}

export interface AiTemplateDto {
  id: string;
  name: string;
  alias: string;
}

export interface ShopTemplateDto {
  id: string;
  name: string;
  template: string;
}