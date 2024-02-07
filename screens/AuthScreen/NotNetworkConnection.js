import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NotNetworkConnection = () => {
  return (
    <View style = {styles.container}>
      <Text style ={{color:"white"}}> NotNetworkConnection </Text>
    </View>
  )
}

export default NotNetworkConnection

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#090b70",
    }
})