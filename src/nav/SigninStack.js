import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import FlashMessage from 'react-native-flash-message';
import React from 'react';
import MainScreen from '../screens/MainScreen';
import ProfileModal from '../screens/ProfileModal';
import Settings from '../screens/Settings';
import YtLinkChannel from '../screens/YtLinkChannel';

const Stack = createNativeStackNavigator();
const SigninStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileModal}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="YtLinking"
          component={YtLinkChannel}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      {/* <FlashMessage position="top" /> */}
    </>
  );
};
export default SigninStack;
