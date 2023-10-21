// import { View, Text } from 'react-native'
// import React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MainScreen from '../screens/MainScreen';
// import Login from '../screens/Login';
// const Stack = createNativeStackNavigator();
// const AppNavigator = () => {
//   return (
//     <Stack.Navigator
//     >
//         <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{headerShown:false}}
//         />
//         <Stack.Screen
//         name="MainScreen"
//         component={MainScreen}
//         options={{headerShown:false}}
//         />
       
//     </Stack.Navigator>
//   )
// }

// export default AppNavigator

import { StatusBar } from 'react-native';
import React, { useState, useEffect, createContext } from 'react'
import auth from '@react-native-firebase/auth'
import SigninStack from './SigninStack'
import SignoutStack from './SignoutStack'

export const AuthContext = createContext(null)
const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)
  // Handle user state changes
  function onAuthStateChanged(result) {
    setUser(result)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged)

    // unsubscribe on unmount
    return authSubscriber
  }, [])

  if (initializing) {
    return
  }
  return  (
    user ?(
      <AuthContext.Provider value={user}>
      <SigninStack />
        </AuthContext.Provider>
  ) : (
    <>
    <SignoutStack />
    </>
  )
  )
}

export default AppNavigator;