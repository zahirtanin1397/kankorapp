import { StyleSheet, Text, View , Button , Pressable} from 'react-native'
import React from 'react'

const CustomeButton = ({onPress , text , type = "PRIMARY", bgcolor , fgColor }) => {
  return (
    <Pressable onPress={onPress}
      style = {[styles.container , 
        styles[`container_${type}`],
        bgcolor ? {backgroundColor : bgcolor} : {}
      ]}>
      <Text style = {[styles.text ,
         styles[`text_${type}`],
         fgColor ? {color : fgColor} : {}
         ]}> {text} </Text>
    </Pressable>
  )
}

export default CustomeButton

const styles = StyleSheet.create({
   
    container : {
    
        width : "100%",
        padding : 15,
        marginVertical : 5,
        borderRadius : 5,
        alignItems : "center",
    },

    container_PRIMARY : {
        backgroundColor : "green",
    },
    container_TERTIARY :{
        
    },
    container_SECONDARY :{
        borderColor : "green",
        borderWidth : 2,
        
    },
    text : {
        fontWeight : "bold",
        color : "white",
    },
    text_TERTIARY : {
        color : "gray",
    },
    text_SECONDARY : {
      color : "green",
  }


})