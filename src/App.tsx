import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@screens/home';
import { DialPadScreen } from '@screens/dialpad';
import { CallsScreen } from '@screens/calls';
import { ProfileScreen } from '@screens/profile';
import {
  AppNavigation,
  CALLS_ROUTE,
  DIAL_PAD_CALL_ROUTE,
  DIAL_PAD_ROUTE,
  HOME_ROUTE,
  PROFILE_ROUTE
} from './routes.ts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ToastProvider } from 'react-native-toast-notifications';
import { DialPadCallScreen } from '@screens/dial-pad-call';

import './utils';

const Tab = createBottomTabNavigator<AppNavigation>();

function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <NavigationContainer>
          <Tab.Navigator initialRouteName={HOME_ROUTE}>
            <Tab.Screen
              name={HOME_ROUTE}
              options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <AntDesign size={24} name={'home'} color={color} />,
                headerShown: false,
              }}
              component={HomeScreen}
            />
            <Tab.Screen
              name={CALLS_ROUTE}
              options={{
                title: 'Calls',
                tabBarIcon: ({ color }) => <Entypo size={24} name={'list'} color={color} />
              }}
              component={CallsScreen}
            />
            <Tab.Screen
              name={DIAL_PAD_ROUTE}
              options={{
                title: 'Dial Pad',
                tabBarIcon: ({ color }) => <Entypo size={24} name={'dial-pad'} color={color} />,
                headerShown: false,
              }}
              component={DialPadScreen}
            />
            <Tab.Screen
              name={PROFILE_ROUTE}
              component={ProfileScreen}
              options={{
                title: 'Profile',
                tabBarIcon: ({ color }) => <FontAwesome size={24} name={'user'} color={color} />
              }}
            />
            <Tab.Screen
              name={DIAL_PAD_CALL_ROUTE}
              component={DialPadCallScreen}
              options={{
                title: 'Call',
                tabBarIcon: ({ color }) => <FontAwesome size={24} name={'user'} color={color} />
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </SafeAreaProvider>
  );
}


export default App;
