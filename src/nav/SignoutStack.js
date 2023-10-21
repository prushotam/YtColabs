import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import FlashMessage from 'react-native-flash-message';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const SignoutStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
  );
};

export default SignoutStack;
