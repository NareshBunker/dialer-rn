import { ParamListBase } from '@react-navigation/native';

export const HOME_ROUTE = 'home';
export const PROFILE_ROUTE = 'profile';
export const DIAL_PAD_ROUTE = 'dial-pad';
export const CALLS_ROUTE = 'calls';
export const CALL_DETAILS_ROUTE = 'home';

export interface AppNavigation extends ParamListBase {
  home: undefined;
  calls: undefined;
  "dial-pad": undefined;
  profile: undefined;
}
