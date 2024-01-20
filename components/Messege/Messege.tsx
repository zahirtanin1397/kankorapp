import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

      const blue = "#3777f0";
      const gray = "#bd4949";
      const myID = "u1";

const Messege = ({ messege }) => {
    
       const  isMe = messege.user.id === myID;

  return (
    <View style = {[
        styles.container , isMe ?styles.rightContainer : styles.leftContianer ]}>
      <Text style = {[ {color : isMe? "black" : "white"}]}>{messege.content} </Text>
    </View>
  )
}

export default Messege

const styles = StyleSheet.create({
container  : {
   padding: 10,
   margin : 10,
   borderRadius : 10,
   maxWidth : "70%",
  marginRight : "auto",
},
leftContianer : {
 backgroundColor: "#4c6dab",
 marginLeft : 10,
 marginRight : "auto",

},
rightContainer : {
  backgroundColor: "#b8b2b2",
 marginLeft : "auto",
 marginRight : 10,
}


})