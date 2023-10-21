import {View, StatusBar} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideScreen from './SideScreen';
import HomeScreen from './HomeScreen';
const Drawer = createDrawerNavigator();
const MainScreen = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar hidden />
      <Drawer.Navigator drawerContent={props => <SideScreen {...props}/>}>
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default MainScreen;
