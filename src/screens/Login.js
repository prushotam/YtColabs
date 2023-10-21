import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppTheme from './commonComponents/AppTheme';
import {Text, TextInput} from 'react-native-paper';
import {Colors} from '../utils/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH, tvScreen} from '../utils/others';
import PlainFlex1 from './commonComponents/PlainFlex1';
import BorderedFlex1 from './commonComponents/BorderedFlex1';
import Group from './commonComponents/Group';
import logo from '../../assets/images/logo.png';
import flag from '../../assets/images/bharat.png';
import ChooseOption from './commonComponents/ChooseOptions';
import {useAppStateContext} from '../utils/AppsStateContext';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {WEB_CLIENT_ID} from '../utils/keys';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import firestore from '@react-native-firebase/firestore';
import PaddingContainer from './commonComponents/PaddingContainer';
import Icon from 'react-native-vector-icons/EvilIcons';
const Login = () => {
  const {selectedOption, setSelectedOption, setTempState, tempState} =
    useAppStateContext();
  const [openChoose, setOpenChoose] = useState(false);
  const [selection, setSelection] = useState();
  const options = [{label: 'Youtuber'}, {label: 'Editor'}];
  const rotation = useSharedValue(0);

  function configureGoogleSign() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false,
    });
  }

  useEffect(() => {
    configureGoogleSign(); // responsible for initial configuration initiate
  }, []);

  async function signIn() {
    if (selectedOption != undefined && tempState != undefined) {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        ToastAndroid.showWithGravity(
          `Welcome!${userInfo.user.name}, account created successfully`,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // when user cancels sign in process,
          ToastAndroid.showWithGravity(
            'You cancelled the Sign-In',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // when in progress already
          ToastAndroid.showWithGravity(
            'Sign-In Process in progress',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // when play services not available
          Alert.alert('Play services are not available');
        } else {
          // some other error
          Alert.alert('Something else went wrong... ', error.toString());
        }
      }
      const {accessToken, idToken} = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      // login with credential
      await auth()
        .signInWithCredential(credential)
        .then(() => {
          const currentUser = auth().currentUser;
          firestoreDb(currentUser);
        });
    } else {
      ToastAndroid.show(
        'Choose options first',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      handlePress();
    }
  }

  const firestoreDb = currentUser => {
    // Check if email, tempState, and selectedOption have valid values
    if (tempState && selectedOption) {
      firestore()
        .collection('users')
        .doc(currentUser.uid) // Replace 'uid' with the actual user's UID
        .set({
          name: tempState,
          role: selectedOption,
          email: currentUser.email,
          availability: 'available',
          salesPitch: 'salesPitch',
          UserPic: currentUser.photoURL,
        })
        .then(() => {
          ToastAndroid.showWithGravity(
            'Database registration is successful',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
          setTempState(undefined), setSelectedOption(undefined);
        })
        .catch(error => {
          Alert.alert(
            'Something went wrong with registration',
            error.message, // Access the error message
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: false},
          );
        });
    } else {
      // Handle the case where one or more variables have undefined or falsy values
      Alert.alert(
        'Something went wrong with Database connection',
        error.message, // Access the error message
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: false},
      );
    }
  }; // Include all relevant dependencies in the dependency array

  useEffect(() => {
    setSelection(selectedOption);
  }, [selectedOption]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotation.value}deg`}],
  }));

  const handlePress = () => {
    const ANGLE = 5;
    const TIME = 30;
    const EASING = Easing.elastic(2);
    rotation.value = withSequence(
      // deviate left to start from -ANGLE
      withTiming(-ANGLE, {duration: TIME / 2, easing: EASING}),
      // wobble between -ANGLE and ANGLE 7 times
      withRepeat(
        withTiming(ANGLE, {
          duration: TIME,
          easing: EASING,
        }),
        7,
        true,
      ),
      // go back to 0 at the end
      withTiming(0, {duration: TIME / 2, easing: EASING}),
    );
  };
  return (
    <AppTheme backgroundColor={Colors.yt} scroll={true}>
      <PlainFlex1
        justifyContent={'space-between'}
        alignItems={'center'}
        width={SCREEN_WIDTH}>
        <View style={styles.textContainer}>
          <Image
            source={logo}
            style={{
              width: tvScreen ? SCREEN_HEIGHT * 0.5 : SCREEN_WIDTH * 0.5,
              alignSelf: 'center',
              height: tvScreen ? SCREEN_HEIGHT * 0.3 : SCREEN_HEIGHT * 0.35,
            }}
          />
        </View>
        <Text style={{...styles.heading, right: SCREEN_WIDTH * 0.1}}>
          Login
        </Text>
      </PlainFlex1>
      <PaddingContainer>
        <Animated.View style={animatedStyle}>
          <Group marginVertical={SCREEN_WIDTH * 0.05}>
            <Text style={styles.bodyText}>Your display name?</Text>
            <TextInput
              value={tempState}
              onChangeText={value => setTempState(value)}
              style={{
                backgroundColor: 'transparent',
              }}
            />
          </Group>
          <Group marginVertical={SCREEN_WIDTH * 0.05}>
            <PlainFlex1 flexDirection={'column'}>
              <Text style={styles.bodyText}>What defines you best?</Text>
              <TouchableOpacity onPress={() => setOpenChoose(true)}>
                <Text style={styles.responseTexts}>
                  {selection ? selection : 'Choose options...'}
                </Text>
              </TouchableOpacity>
            </PlainFlex1>
          </Group>
        </Animated.View>
      </PaddingContainer>
      <PlainFlex1>
        <Group>
          <PlainFlex1
            alignItems={'flex-end'}
            justifyContent={'flex-end'}
            width={SCREEN_WIDTH}>
            <BorderedFlex1
              backgroundColor={Colors.Primary}
              height={SCREEN_WIDTH * 0.15}
              width={SCREEN_WIDTH * 0.5}>
              <TouchableOpacity
                onPress={() => signIn()}
                style={styles.tocahbleOpacityHor}>
                <Text
                  style={{
                    ...styles.bodyText,
                    color: Colors.fontColorActive,
                    fontSize: SCREEN_WIDTH * 0.038,
                  }}>
                  Sign-in with gmail |{' '}
                <Icon
                  name="sc-google-plus"
                  size={SCREEN_WIDTH * 0.07}
                  color={Colors.fontColorActive}
                />
                </Text>
              </TouchableOpacity>
            </BorderedFlex1>
          </PlainFlex1>
        </Group>
      </PlainFlex1>
      <PlainFlex1 width={SCREEN_WIDTH} justifyContent={'center'} alignItems={'center'} flexDirection={'column-reverse'}>
      <Text style={styles.bodyText}> MADE IN INDIA</Text>
        <Image
            source={flag}
            style={{
              width: tvScreen ? SCREEN_HEIGHT * 0.1 : SCREEN_WIDTH * 0.1,
              alignSelf: 'center',
              height: tvScreen ? SCREEN_HEIGHT * 0.1 : SCREEN_WIDTH * 0.1,
            }}
          />
      </PlainFlex1>

      <ChooseOption
        onClose={() => {
          setOpenChoose(false);
        }}
        options={options}
        isVisible={openChoose}
        header={'Choose one'}
      />
    </AppTheme>
  );
};

export default Login;

const styles = StyleSheet.create({
  tocahbleOpacityHor: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  responseTexts: {
    color: Colors.shadow,
    fontSize: tvScreen ? SCREEN_HEIGHT * 0.05 : SCREEN_WIDTH * 0.05,
  },
  heading: {
    fontSize: tvScreen ? SCREEN_HEIGHT * 0.05 : SCREEN_WIDTH * 0.05,
    color: Colors.fontColorActive,
  },
  bodyText: {
    fontSize:
      SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_HEIGHT * 0.06 : SCREEN_WIDTH * 0.04,
    color: Colors.fontColorActive,
    fontFamily: 'Nunito-Regular',
    
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Primary,
    height: SCREEN_HEIGHT * 0.35,
    width: SCREEN_WIDTH * 0.6,
    borderBottomRightRadius: SCREEN_WIDTH * 0.5,
    borderBottomLeftRadius: SCREEN_WIDTH * 0.5,
  },
});
