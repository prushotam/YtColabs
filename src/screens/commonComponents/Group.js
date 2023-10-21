import {View, Text} from 'react-native';
import React from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/others';

const Group = ({children, marginVertical}) => {
  return (
    <View
      style={{
        marginVertical: marginVertical
          ? marginVertical
          : SCREEN_WIDTH > SCREEN_HEIGHT
          ? SCREEN_HEIGHT * 0.01
          : SCREEN_WIDTH * 0.1,
      }}>
      {children}
    </View>
  );
};

export default Group;
