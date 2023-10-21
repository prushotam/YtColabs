import {StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_HEIGHT, SCREEN_WIDTH, tvScreen} from '../../utils/others';
import {Colors} from '../../utils/colors';
import {Gesture, GestureDetector, PanGestureHandler} from 'react-native-gesture-handler';
import {
    runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/EvilIcons';
import { getDrawerStatusFromState } from '@react-navigation/drawer';


const DrawerHandler = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.openDrawer();
  };
  const translateY = useSharedValue(SCREEN_HEIGHT * 0.46);
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue(Colors.Secondary);
  const borderRadius = useSharedValue(SCREEN_WIDTH*0.01);
  const isDrawerOpen = getDrawerStatusFromState(navigation.getState()) === 'open';

  const tapGesture = Gesture.Tap()
  .onBegin((event) => {})
  .onEnd((event) => {
    if (isDrawerOpen) {
      navigation.closeDrawer();
    } else {
      runOnJS(onPress)();
    }
  });

  const gesture = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startY = translateY.value;
      scale.value = withTiming(1)
        backgroundColor.value = withTiming(Colors.Secondary, {duration:100})
        borderRadius.value = withTiming(SCREEN_WIDTH*0.01)
    },
    onActive: (event, context) => {
      translateY.value = context.startY + event.translationY;
      translateY.value = Math.max(
        SCREEN_HEIGHT * 0.2,
        Math.min(context.startY + event.translationY, SCREEN_HEIGHT * 0.7),
      );
      scale.value = withTiming(1.8)
      backgroundColor.value = withTiming(Colors.yt, {duration:100})
      borderRadius.value= withTiming(SCREEN_WIDTH*0.1)
    },
    onEnd: (event) => {
        scale.value = withTiming(1)
        backgroundColor.value = withTiming(Colors.Secondary, {duration:100})
        borderRadius.value = withTiming(SCREEN_WIDTH*0.01)
    },
  });
  const animatedTouchable = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(translateY.value, { stiffness: 80 }) },
        { scaleX: scale.value },
        { scaleY: scale.value },
      ],
      backgroundColor: backgroundColor.value,
      borderRadius: borderRadius.value
    };
  });
  return (
    <PanGestureHandler onGestureEvent={gesture}>
      <Animated.View style={[styles.dragBall, animatedTouchable]}>
        <GestureDetector gesture={tapGesture}>
        <Icon
        name={"chevron-right"}
        size= {SCREEN_WIDTH*0.08}
        color={Colors.fontColorActive}
        />
        </GestureDetector>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default DrawerHandler;

const styles = StyleSheet.create({
  dragBall: {
    height: SCREEN_WIDTH * 0.08,
    width: SCREEN_WIDTH * 0.08,
    justifyContent:'center',
    position:'absolute'
  },
});
