import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH, tvScreen} from '../utils/others';
import {Colors} from '../utils/colors';
import AppBarCommon from './commonComponents/AppBarCommon';
import PlainFlex1 from './commonComponents/PlainFlex1';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import SimpleBorderedFlex from './commonComponents/SimpleBorderedFlex';
import {Button, TextInput} from 'react-native-paper';
import PaddingContainer from './commonComponents/PaddingContainer';

const WorkspaceModal = ({visible, onClose}) => {
  const [textInput, setTextInput] = useState({
    Title: '',
    RequirementInstructions: '',
  });

  return (
    <Modal
      visible={visible}
      statusBarTranslucent={true}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <AppBarCommon title={'+CREATE WORKSPACE'} mode={'center-aligned'}>
            <TouchableOpacity onPress={onClose}>
              <PlainFlex1 justifyContent={'center'} width={SCREEN_WIDTH * 0.1}>
                <Icon2
                  name="close"
                  size={tvScreen ? SCREEN_HEIGHT * 0.07 : SCREEN_WIDTH * 0.07}
                  color={Colors.Primary}
                />
              </PlainFlex1>
            </TouchableOpacity>
          </AppBarCommon>
          <>
            <PaddingContainer>
              <TextInput
                style={styles.textInputStyle}
                mode="outlined"
                textColor={Colors.fontColorActive}
                placeholder="Title*"
                placeholderTextColor={Colors.fontColorActive}
                cursorColor={Colors.fontColorActive}
                value={textInput.Title}
                onChangeText={value =>
                  setTextInput({...textInput, Title: value})
                }
              />

              <TextInput
                style={styles.textInputStyle}
                mode="outlined"
                textColor={Colors.fontColorActive}
                placeholder="Requirements Instructions*"
                placeholderTextColor={Colors.fontColorActive}
                cursorColor={Colors.fontColorActive}
                value={textInput.RequirementInstructions}
                onChangeText={value =>
                  setTextInput({...textInput, RequirementInstructions: value})
                }
              />
              <SimpleBorderedFlex marginVertical={SCREEN_WIDTH * 0.1}>
                <Button mode="contained">Upload Video</Button>
                <Button mode="text">Assign Editor +</Button>
              </SimpleBorderedFlex>
              <SimpleBorderedFlex marginVertical={SCREEN_WIDTH * 0.1}>
              <Button mode="outlined">CREATE </Button>
              </SimpleBorderedFlex>
            </PaddingContainer>
          </>
        </View>
      </View>
    </Modal>
  );
};

export default WorkspaceModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.93,
    height: SCREEN_HEIGHT * 0.9,
    backgroundColor: Colors.blackMatch7,
    borderRadius: 10,
    elevation: 10, // Adjust this value to your preference
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  textInputStyle: {
    fontSize: SCREEN_WIDTH * 0.05,
    fontFamily: 'RobotoCondensed-Bold',
    padding: 10,
    backgroundColor: 'transparent',
  },
});
