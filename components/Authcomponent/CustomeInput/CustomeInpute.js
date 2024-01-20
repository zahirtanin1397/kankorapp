import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const CustomeInpute = ({value , setValue , placeholder , secureTextEntry }) => {
  return (
    <View style = {styles.container}>
      <TextInput placeholder= {placeholder} 
         style = {styles.input}
         value={value}
         onChangeText={setValue}
         secureTextEntry = {secureTextEntry}
      />
    </View>
  )
}

export default CustomeInpute

const styles = StyleSheet.create({
    container : {
        backgroundColor : "white",
        width  :"100%",
        borderColor : "#e8e8e8",
        borderWidth : 1,
        borderRadius : 3,
        paddingHorizontal : 7,
        marginVertical : 5,
    },
    input :  {
          padding : 6,
          
    }
})