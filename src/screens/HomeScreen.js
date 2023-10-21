import {
  TouchableOpacity,
  Alert,
  ToastAndroid,
  StyleSheet,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Colors} from '../utils/colors';
import DrawerHandler from './commonComponents/DrawerHandler';
import AppTheme from './commonComponents/AppTheme';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import AppBarCommon from './commonComponents/AppBarCommon';
import PlainFlex1 from './commonComponents/PlainFlex1';
import {SCREEN_HEIGHT, SCREEN_WIDTH, tvScreen} from '../utils/others';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from '../utils/keys';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../nav/AppNavigator';
import {useAppStateContext} from '../utils/AppsStateContext';
import firestore from '@react-native-firebase/firestore';
import {Text, Avatar} from 'react-native-paper';
import MenuOpen from './commonComponents/MenuOpen';
import RadialButton from './commonComponents/RadialButton';
import SimpleBorderedFlex from './commonComponents/SimpleBorderedFlex';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import SkiaGradientbackground from './commonComponents/SkiaGradientbackground';
import { useNavigation } from '@react-navigation/native';
import WorkspaceModal from './WorkspaceModal';

const HEIGHT = SCREEN_HEIGHT * 0.6;
const WIDTH = SCREEN_WIDTH * 0.9;

const HomeScreen = () => {
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const menuItems = [
    {
      id: '1',
      label: 'Profile',
      onPress: () => {
        navigation.navigate("Profile")
      },
    },
    {
      id: '2',
      label: 'Editors',
      onPress: () => {
        navigation.openDrawer();
      },
    },
    {
      id: '3',
      label: 'Logout',
      onPress: () => {
        handleLogout();
      },
    },
    {
      id: '4',
      label: 'Help',
      onPress: () => {
        console.log('Item 2 pressed');
      },
    },
  ];

  const user = useContext(AuthContext);
  const {userDbDetails, setUserDbDetails} = useAppStateContext();
  const handleLogout = async () => {
    try {
      GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
        offlineAccess: false,
      });
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      ToastAndroid.showWithGravity(
        `${user.displayName} Logged Out Successfully`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    } catch (error) {
      Alert.alert('Something else went wrong... ', error.toString());
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userSnapshot = await firestore()
          .collection('users') // Replace with your Firestore collection name
          .doc(user.uid) // Filter by role "editor"
          .get();
        const userData = userSnapshot.data();
        setUserDbDetails(userData);
      } catch (error) {
        ToastAndroid.show(
          'Error fetching users data:',
          error,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      }
    };
    // Call the fetchEditors function
    fetchUser();
  }, []);
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(event => {
      rotateX.value = withTiming(
        interpolate(event.y, [0, HEIGHT], [5, -5], Extrapolate.CLAMP),
      );
      rotateY.value = withTiming(
        interpolate(event.x, [0, WIDTH], [-10, 10], Extrapolate.CLAMP),
      );
    })
    .onUpdate(event => {
      // topLeft (10deg, -10deg)
      // topRight (10deg, 10deg)
      // bottomRight (-10deg, 10deg)
      // bottomLeft (-10deg, -10deg)

      rotateX.value = interpolate(
        event.y,
        [0, HEIGHT],
        [10, -10],
        Extrapolate.CLAMP,
      );
      rotateY.value = interpolate(
        event.x,
        [0, WIDTH],
        [-10, 10],
        Extrapolate.CLAMP,
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const rStyle = useAnimatedStyle(() => {
    const rotateXvalue = `${rotateX.value}deg`;
    const rotateYvalue = `${rotateY.value}deg`;
    return {
      transform: [
        {
          perspective: SCREEN_WIDTH * 0.8,
        },
        {rotateX: rotateXvalue},
        {rotateY: rotateYvalue},
      ],
    };
  }, []);

  const createWorkspace = () => {
    setVisible1(true)
  }
  return (
    <AppTheme>
      <AppBarCommon
        backgroundColor={Colors.Primary}
        title={`Howdy! ${userDbDetails.name}`}
        color={Colors.Secondary}
        fontFamily={'RobotoCondensed-Bold'}
        mode={'small'}
        >
          <Avatar.Image size={SCREEN_WIDTH*0.08} source={{ uri: user.photoURL }}/>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <PlainFlex1 justifyContent={'center'} width={SCREEN_WIDTH * 0.1}>
            <Icon2
              name="navicon"
              size={tvScreen ? SCREEN_HEIGHT * 0.07 : SCREEN_WIDTH * 0.07}
              color={Colors.fontColorActive}
            />
          </PlainFlex1>
        </TouchableOpacity>
            
      </AppBarCommon>
      <SkiaGradientbackground width={WIDTH-5} height={HEIGHT-5} />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              width: WIDTH,
              position: 'absolute',
              top: SCREEN_HEIGHT * 0.12,
              alignSelf: 'center',
            },
            rStyle,
          ]}>
          <SimpleBorderedFlex
            height={HEIGHT}
            width={WIDTH}
            backgroundColor={'black'}
            borderRadius={SCREEN_WIDTH * 0.05}>
            <SimpleBorderedFlex justifyContent={'center'} alignItems={'center'}>
              <Text style={styles.bodyHeader}>
                Welcomes you in {userDbDetails.role}'s Space
                <Icon
                  name="rocket1"
                  size={tvScreen ? SCREEN_HEIGHT * 0.01 : SCREEN_WIDTH * 0.05}
                  color={Colors.Secondary}
                />
              </Text>
            </SimpleBorderedFlex>
            <SimpleBorderedFlex
              borderWidth={SCREEN_WIDTH * 0.005}
              borderColor={Colors.Secondary}
              justifyContent={'center'}
              alignItems={'center'}>
              <PlainFlex1
                width={SCREEN_WIDTH}
                justifyContent={'center'}
                alignItems={'center'}>
                <Text
                  style={{...styles.bodyHeader, fontSize: SCREEN_WIDTH * 0.05,fontFamily:'Quicksand-Regular'}}>
                  YOUR SPACE AT GLANCE
                </Text>
              </PlainFlex1>
            </SimpleBorderedFlex>
            <SimpleBorderedFlex justifyContent={'center'} alignItems={'center'}>
              <PlainFlex1
                width={SCREEN_WIDTH}
                justifyContent={'center'}
                alignItems={'center'}>
                <SimpleBorderedFlex
                  justifyContent={'center'}
                  alignItems={'center'}
                  width={SCREEN_WIDTH * 0.5}
                  height={SCREEN_HEIGHT * 0.2}>
                  <Text style={styles.summaryText}>Linked Channels</Text>
                  <Text style={styles.summaryText}>Linked Channels</Text>
                </SimpleBorderedFlex>
                <SimpleBorderedFlex
                  justifyContent={'center'}
                  alignItems={'center'}
                  width={SCREEN_WIDTH * 0.5}
                  height={SCREEN_HEIGHT * 0.2}>
                  <Text style={styles.summaryText}>Active Workspaces</Text>
                  <Text style={styles.summaryText}>Active Workspaces</Text>
                </SimpleBorderedFlex>
              </PlainFlex1>
              <PlainFlex1
                width={SCREEN_WIDTH}
                justifyContent={'center'}
                alignItems={'center'}>
                <SimpleBorderedFlex
                  justifyContent={'center'}
                  alignItems={'center'}
                  width={SCREEN_WIDTH * 0.5}
                  height={SCREEN_HEIGHT * 0.2}>
                  <Text style={styles.summaryText}>Approved Uploads</Text>
                  <Text style={styles.summaryText}>Successful Uploads</Text>
                </SimpleBorderedFlex>
                <SimpleBorderedFlex
                  justifyContent={'center'}
                  alignItems={'center'}
                  width={SCREEN_WIDTH * 0.5}
                  height={SCREEN_HEIGHT * 0.2}>
                  <Text style={styles.summaryText}>All available Editors</Text>
                  <Text style={styles.summaryText}>All available Editors</Text>
                </SimpleBorderedFlex>
              </PlainFlex1>
            </SimpleBorderedFlex>
          </SimpleBorderedFlex>
        </Animated.View>
      </GestureDetector>
      <DrawerHandler />
      <MenuOpen
        visible={visible}
        onClose={() => setVisible(false)}
        menuItems={menuItems}
      />
      <WorkspaceModal
      visible={visible1}
      onClose={()=>setVisible1(false)}
      />
      <RadialButton 
      onPress3={()=> navigation.navigate('Settings')}
      onPress2={()=> createWorkspace()}
      onPress1={()=> navigation.navigate('YtLinking')}
      />
    </AppTheme>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  bodyHeader: {
    maxWidth: SCREEN_WIDTH,
    fontFamily: 'GreatVibes-Regular',
    letterSpacing: 5,
    fontSize: SCREEN_WIDTH * 0.07,
    textAlign: 'center',
    color: Colors.Secondary,
  },
  summaryText: {
    maxWidth: SCREEN_WIDTH,
    fontFamily: 'Quicksand-Regular',
    fontSize: SCREEN_WIDTH * 0.03,
    textAlign: 'center',
    color: Colors.fontColorActive,
  },
  summaryConatainer: {
    display: 'flex',
    borderWidth: SCREEN_WIDTH * 0.01,
    borderColor: Colors.Secondary,
    borderRadius: SCREEN_WIDTH * 0.01,
  },
});
