import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PaddingContainer = ({children}) => {
  return (
    <View style={{flex:1,padding:'5%'}}>
      {children}
    </View>
  )
}

export default PaddingContainer

const styles = StyleSheet.create({})