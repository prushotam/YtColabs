import {StyleSheet} from 'react-native';
import React from 'react';
import AppTheme from './commonComponents/AppTheme';
import {Colors} from '../utils/colors';
import PlainFlex1 from './commonComponents/PlainFlex1';
import SimpleBorderedFlex from './commonComponents/SimpleBorderedFlex';
import {SCREEN_WIDTH} from '../utils/others';
import AppBarCommon from './commonComponents/AppBarCommon';
import {Text, Switch} from 'react-native-paper';

const Settings = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <>
      <AppBarCommon
        title={'Settings'}
        backgroundColor={Colors.Primary}
        color={Colors.fontColorActive}
        enableBack={true}
        mode={'center-aligned'}
      />
      <AppTheme>
        <PlainFlex1 height={'11%'}>
          <SimpleBorderedFlex
            width={SCREEN_WIDTH * 0.5}
            justifyContent={'center'}>
            <Text style={styles.bodyText}>Day/Night Theme</Text>
          </SimpleBorderedFlex>
          <SimpleBorderedFlex
            width={SCREEN_WIDTH * 0.5}
            justifyContent={'center'}
            alignItems={'center'}>
            <Switch
              value={isSwitchOn}
              onTouchStart={() => onToggleSwitch()}
              color={Colors.blackMatch7}
            />
          </SimpleBorderedFlex>
        </PlainFlex1>
        <PlainFlex1 height={'11%'}>
          <SimpleBorderedFlex
            width={SCREEN_WIDTH * 0.5}
            justifyContent={'center'}>
            <Text style={styles.bodyText}>
              Disable workspace list on homescreen{' '}
            </Text>
          </SimpleBorderedFlex>
          <SimpleBorderedFlex
            width={SCREEN_WIDTH * 0.5}
            justifyContent={'center'}
            alignItems={'center'}>
            <Switch
              value={isSwitchOn}
              onTouchStart={() => onToggleSwitch()}
              color={Colors.blackMatch7}
            />
          </SimpleBorderedFlex>
        </PlainFlex1>
        <PlainFlex1 height={'11%'}>
          <SimpleBorderedFlex
            width={SCREEN_WIDTH * 0.5}
            justifyContent={'center'}>
            <Text style={styles.bodyText}>
              Turn On/Off summary on Homescreen{' '}
            </Text>
          </SimpleBorderedFlex>
          <SimpleBorderedFlex
            width={SCREEN_WIDTH * 0.5}
            justifyContent={'center'}
            alignItems={'center'}>
            <Switch
              value={isSwitchOn}
              onTouchStart={() => onToggleSwitch()}
              color={Colors.blackMatch7}
            />
          </SimpleBorderedFlex>
        </PlainFlex1>
        <PlainFlex1 height={'11%'}>
          <SimpleBorderedFlex
            width={SCREEN_WIDTH * 0.5}
            justifyContent={'center'}>
            <Text style={styles.bodyText}>
              Turn On/Off showing drawer handler icon{' '}
            </Text>
          </SimpleBorderedFlex>
          <SimpleBorderedFlex
            width={SCREEN_WIDTH * 0.5}
            justifyContent={'center'}
            alignItems={'center'}>
            <Switch
              value={isSwitchOn}
              onTouchStart={() => onToggleSwitch()}
              color={Colors.blackMatch7}
            />
          </SimpleBorderedFlex>
        </PlainFlex1>
        <PlainFlex1 height={'11%'}>
          <SimpleBorderedFlex
            width={SCREEN_WIDTH * 0.5}
            justifyContent={'center'}>
            <Text style={styles.bodyText}>
              Turn On/Off showing profile pic on homescreen{' '}
            </Text>
          </SimpleBorderedFlex>
          <SimpleBorderedFlex
            width={SCREEN_WIDTH * 0.5}
            justifyContent={'center'}
            alignItems={'center'}>
            <Switch
              value={isSwitchOn}
              onTouchStart={() => onToggleSwitch()}
              color={Colors.blackMatch7}
            />
          </SimpleBorderedFlex>
        </PlainFlex1>
        <PlainFlex1 height={'11%'}>
          <SimpleBorderedFlex
            width={SCREEN_WIDTH * 0.5}
            justifyContent={'center'}>
            <Text style={styles.bodyText}>Turn On/Off vibration feedback </Text>
          </SimpleBorderedFlex>
          <SimpleBorderedFlex
            width={SCREEN_WIDTH * 0.5}
            justifyContent={'center'}
            alignItems={'center'}>
            <Switch
              value={isSwitchOn}
              onTouchStart={() => onToggleSwitch()}
              color={Colors.blackMatch7}
            />
          </SimpleBorderedFlex>
        </PlainFlex1>
      </AppTheme>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  bodyText: {
    color: Colors.fontColorActive,
    fontSize: SCREEN_WIDTH * 0.03,
  },
});
