import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {Colors} from '../../utils/colors';
import {Text} from 'react-native-paper';
import {SCREEN_WIDTH} from '../../utils/others';

const RadialButton = ({onPress1, onPress2, onPress3}) => {
  const [icon_1] = useState(new Animated.Value(40));
  const [icon_2] = useState(new Animated.Value(40));
  const [icon_3] = useState(new Animated.Value(40));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 40,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Animated.View style={[styles.circle, {bottom: icon_1}]}>
        <TouchableOpacity style={styles.centeredContent} onPress={onPress1}>
          <Icon name="sc-youtube" size={25} color="#FFFF" />
          <Text style={styles.buttonText}>Link YT</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, {bottom: icon_2, right: icon_2}]}>
        <TouchableOpacity style={styles.centeredContent} onPress={onPress2}>
          <Icon name="plus" size={25} color="#FFFF" />
          <Text style={styles.buttonText}>New Workspace</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, {right: icon_3}]}>
        <TouchableOpacity style={styles.centeredContent} onPress={onPress3}>
          <Icon name="gear" size={25} color="#FFFF" />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}>
        <Icon name="archive" size={25} color="#FFFF" />
        <Text style={styles.buttonText}>Actions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RadialButton;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: Colors.yt,
    width: SCREEN_WIDTH*0.16,
    height: SCREEN_WIDTH*0.16,
    position: 'absolute',
    bottom: 40,
    right: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: SCREEN_WIDTH * 0.02,
    color: Colors.fontColorActive,
    fontFamily: 'RobotoCondensed-Regular',
    textAlign:'center',
    maxWidth:'52%'
  },
  centeredContent:{
    justifyContent:'center',
    alignItems:'center'
  }
});
