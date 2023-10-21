import {StyleSheet, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import AppTheme from './commonComponents/AppTheme';
import SimpleBorderedFlex from './commonComponents/SimpleBorderedFlex';
import {Colors} from '../utils/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../utils/others';
import {Avatar, Text} from 'react-native-paper';
import {useAppStateContext} from '../utils/AppsStateContext';
import AppBarCommon from './commonComponents/AppBarCommon';
import Group from './commonComponents/Group';
import PlainFlex1 from './commonComponents/PlainFlex1';
import PaddingContainer from './commonComponents/PaddingContainer';
import {Badge, Button} from 'react-native-paper';

const ProfileModal = () => {
  const {userDbDetails, setUserDbDetails} = useAppStateContext();

  return (
    <>
      <AppBarCommon
        title={'Profile'}
        backgroundColor={Colors.Primary}
        color={Colors.fontColorActive}
        enableBack={true}
        mode={'center-aligned'}
      />
      <AppTheme scroll={true}>
        <SimpleBorderedFlex borderWidth={SCREEN_WIDTH * 0.005} flex={1}>
          <Group>
            <View style={styles.picContainer}>
              <Avatar.Image
                size={SCREEN_WIDTH * 0.3}
                source={{uri: userDbDetails.UserPic}}
              />
              <TouchableOpacity
                style={{position: 'absolute', bottom: -SCREEN_HEIGHT * 0.05}}>
                <Avatar.Icon icon={'upload'} size={40} color="white" />
                <Text style={styles.generalText}>Change</Text>
              </TouchableOpacity>
            </View>
          </Group>
          <PaddingContainer>
            <Button
              buttonColor={Colors.LighterShadeOfPrimary}
              mode="contained"
              style={styles.buttonStyle}>
              +EDIT
            </Button>
            <Group>
              <PlainFlex1
                width={SCREEN_WIDTH * 0.9}
                backgroundColor={Colors.blackMatch8}>
                <Text style={styles.bodyText}>Name : </Text>
                <Text style={styles.bodyText}>{userDbDetails.name} </Text>
              </PlainFlex1>
              <PlainFlex1
                alignItems={'center'}
                width={SCREEN_WIDTH * 0.9}
                backgroundColor={Colors.blackMatch3}
                showButton={true}
                buttonTitle={'+Change'}
                buttonStyle={styles.buttonStyle}
                buttonMode={'text'}
                textColor={Colors.fontColorActive}
                onPress={() => console.log('clicked')}>
                <Text style={styles.bodyText}>Status : </Text>
                {/* <Text style={styles.bodyText}>{userDbDetails.status} </Text> */}
                <Badge
                  style={{position: 'relative'}}
                  size={SCREEN_WIDTH * 0.08}>
                  Available
                </Badge>
              </PlainFlex1>
              <PlainFlex1
                width={SCREEN_WIDTH * 0.9}
                backgroundColor={Colors.blackMatch8}
                showButton={true}
                buttonTitle={'+Change'}
                buttonStyle={styles.buttonStyle}
                buttonMode={'text'}
                textColor={Colors.fontColorActive}
                onPress={() => console.log('clicked')}>
                <Text style={styles.bodyText}>
                  SalesPitch : The quick brown fox jups over the lazy dog
                </Text>
                <Text style={styles.bodyText}>{userDbDetails.salesPitch} </Text>
              </PlainFlex1>
              <PlainFlex1
                width={SCREEN_WIDTH * 0.9}
                backgroundColor={Colors.blackMatch3}
                showButton={true}
                buttonTitle={'+Add'}
                buttonStyle={styles.buttonStyle}
                buttonMode={'text'}
                textColor={Colors.fontColorActive}
                onPress={() => console.log('clicked')}>
                <Text style={styles.bodyText}>Skills : </Text>
                <Text style={styles.bodyText}>{userDbDetails.skills} </Text>
              </PlainFlex1>
              <PlainFlex1
                width={SCREEN_WIDTH * 0.9}
                backgroundColor={Colors.blackMatch8}>
                <Text style={styles.bodyText}>Reg. Email : </Text>
                <Text style={styles.bodyText}>{userDbDetails.email} </Text>
              </PlainFlex1>
            </Group>
          </PaddingContainer>
        </SimpleBorderedFlex>
      </AppTheme>
    </>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  picContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generalText: {
    color: Colors.fontColorActive,
  },
  bodyText: {
    color: Colors.fontColorActive,
    marginVertical: 20,
    fontSize: SCREEN_WIDTH * 0.04,
    fontFamily: 'RobotoCondensed-Regular',
  },
  buttonStyle: {
    display: 'flex',
    position: 'absolute',
    right: 0,
  },
});
