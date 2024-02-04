export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface TokensDto {
  access: {
    token: string;
    expiresIn: number;
  };
  refresh: {
    token: string;
    expiresIn: number;
  };
}

export interface LoginResponseDto {
  tokens: TokensDto;
}

export interface FetchMeResponseDto {
  user: {
    email: string;
    firstName: string;
    id: string;
    isEmailVerified: boolean;
    lastName: string;
    role: {
      alias: string;
      name: string;
    };
  };
  shopsList: ShopDto[];
}

export interface ShopDto {
  name: string;
  physicalAddress: string;
  id: string;
  phoneNumbers: { number: string }[];
}