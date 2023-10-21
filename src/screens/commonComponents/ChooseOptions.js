import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SCREEN_WIDTH } from '../../utils/others';
import { useAppStateContext } from '../../utils/AppsStateContext';
import { Colors } from '../../utils/colors';

const ChooseOption = ({ isVisible, options, header, onClose }) => {
    const { selectedOption, setSelectedOption } = useAppStateContext();
  return (
    <Modal visible={isVisible} statusBarTranslucent={true} presentationStyle="overFullScreen" transparent={true} animationType='fade'>
      <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
      <Text style={styles.header}>{header}</Text>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionContainer}
            onPress={() => {
              setSelectedOption(option.label)
              onClose();
            }}
          >
            <Text style={styles.optionLabel}>{option.label}</Text>
            {selectedOption === option.label ? 
            <Icon name="radio-button-checked" size={24} color="#007AFF" />
            :
            <Icon name="radio-button-unchecked" size={24} color= {Colors.blackMatch6} />
            }
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </View>
    </Modal>
  );
};

export default ChooseOption;
const styles = StyleSheet.create({
    header: {
        alignSelf:'center',
        fontSize:20,
        color: Colors.blackMatch6,
        fontWeight:700
    },
    modalContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colors.shadow
    },
    modalContent: {
        width: SCREEN_WIDTH * 0.8,
        backgroundColor: Colors.fontColorActive,
        borderRadius: 8,
        paddingVertical: 20,
        elevation: 10, // Adjust this value to your preference
        shadowColor: Colors.shadow,
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
      },
      optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.SubduedBlue,
      },
      optionLabel: {
        fontSize: 18,
        color:Colors.blackMatch6
      },
      cancelButton: {
        alignItems: 'center',
        marginTop: 10,
      },
      cancelText: {
        fontSize: 18,
        color: Colors.blackMatch6,
      },
})