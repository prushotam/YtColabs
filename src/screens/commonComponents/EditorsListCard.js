import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors'
import { SCREEN_HEIGHT } from '../../utils/others'
import { Text } from 'react-native-paper'

const EditorsListCard = ({editorName, editorEmail, salesPitch, status}) => {
  return (
    <View style={styles.card}>
      <Text style={{color:Colors.fontColorActive}}>{editorName}</Text>
      <Text style={{color:Colors.fontColorActive}}>{editorEmail}</Text>
      <Text style={{color:Colors.fontColorActive}}>{salesPitch}</Text>
      <Text style={{color:Colors.fontColorActive}}>{status}</Text>
    </View>
  )
}

export default EditorsListCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.SubduedBlue,
    marginVertical: SCREEN_HEIGHT * 0.01,
    borderRadius: 10,
    padding: 16,
  },
  
})