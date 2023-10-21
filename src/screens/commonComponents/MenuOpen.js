import React, { useState } from 'react';
import { View, Modal, Text, TouchableHighlight, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/others';
import { Colors } from '../../utils/colors';

const MenuOpen = ({ visible, onClose, menuItems }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
      presentationStyle="overFullScreen"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
        <View style={styles.menuContainer}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item,index }) => (
            <TouchableHighlight
              onPress={() => {
                item.onPress(); // Execute the onPress function
                onClose(); // Close the menu
              }}
              underlayColor="black"
            >
              <Text  style={[
          styles.menuItem,
          {
            borderBottomWidth: index === menuItems.length - 1 ? 0 : 0.5,
            // Add any other styles you want here
          },
        ]}>{item.label}</Text>
            </TouchableHighlight>
          )}
        />
      </View>
        </View>
      </TouchableWithoutFeedback>
      
    </Modal>
  );
};

export default MenuOpen;

const styles = StyleSheet.create({
  overlay: {
    flex:1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent:'flex-start'
  },
  menuContainer: {
    width:SCREEN_WIDTH*0.4,
    justifyContent: 'flex-end',
    backgroundColor: Colors.Secondary, // Semi-transparent background
    alignSelf: 'flex-end',
    borderRadius: SCREEN_HEIGHT * 0.01,
  },
  menuItem: {
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    fontSize: 18,
    color: Colors.fontColorActive,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.fontColorActive,
  },
});
