import React from 'react'
import AppNavigator from './src/nav/AppNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { MD3LightTheme as DefaultTheme, PaperProvider,configureFonts } from 'react-native-paper';
import { Colors } from './src/utils/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppStateProvider } from './src/utils/AppsStateContext';



const fontConfig = {
  fontFamily: 'Poppins-Regular',
};
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.Primary,
    secondary: Colors.fontColorActive,
  },
  fonts: configureFonts({config: fontConfig}),
};

const App = () => {

 
 
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <NavigationContainer>
      <AppStateProvider>
      <PaperProvider theme={theme}>
      <AppNavigator/>
      </PaperProvider>
      </AppStateProvider>
    </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App