import { ParamListBase } from '@react-navigation/native';

export const HOME_ROUTE = 'home';
export const PROFILE_ROUTE = 'profile';
export const DIAL_PAD_ROUTE = 'dial-pad';
export const DIAL_PAD_CALL_ROUTE = 'dial-pad-call';
export const CALLS_ROUTE = 'calls';
export const CALL_DETAILS_ROUTE = 'home';

export interface AppNavigation extends ParamListBase {
  home: undefined;
  calls: {number : string};
  "dial-pad": {number: string};
  profile: undefined;
  "dial-pad-call": {number: string};
}
