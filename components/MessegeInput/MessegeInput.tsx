import { StyleSheet, Text, View, TextInput, Pressable,KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react'
import { SimpleLineIcons, Feather, MaterialCommunityIcons, AntDesign, Ionicons} from "@expo/vector-icons"
const MessegeInput = () => {

    const [messege , setMessege] = useState("");

    const sendMessege = () => {
      // send messege 
      console.warn("seding " , messege);

      setMessege('');
    }

    const onPlusClick = () => {
        console.warn("plus cliked ")
    }
    const onPress = () => {
      if(messege){
        sendMessege();
      }else{
       onPlusClick();
      }
    }

  return (
    <KeyboardAvoidingView style = {styles.root}>
     <View style = {styles.inputContianer}>
        <SimpleLineIcons name='emotsmile' size={29} color ="#595959" />
       <TextInput style = {styles.input} 
       value = {messege}
       onChangeText = {setMessege}
        placeholder ="Signal Messege...."
         
       />
       <Feather name='camera'  size={23} color ="#595959" style = {styles.camera} />
       <MaterialCommunityIcons name='microphone-outline'  size={25} color ="#595959" /> 
     </View>
     <Pressable onPress={onPress} style = {styles.buttonContainer}>
       { messege ? <Ionicons name='send' size={17} color = "white" /> :  <AntDesign name='plus' size={20} color = "white" /> }
     </Pressable>
    </KeyboardAvoidingView>
  )
}

export default MessegeInput

const styles = StyleSheet.create({
 root :{
    flexDirection : "row",
    padding: 5,
 },
 inputContianer : {
    backgroundColor : "#f2f2f2",
    flex : 1,
    borderRadius : 20,
    marginRight : 10,
    borderWidth : 1,
    borderColor : "#dedede",
    flexDirection : "row",
    alignItems : "center",
    padding  :3,

 },
 input  :{
      flex : 1,
      padding :3,

 },
 buttonContainer : {
   width : 40,
   height: 40,
   backgroundColor : "#3777e0",
   borderRadius : 25,
   justifyContent: 'center',
   alignItems:'center',

 },
 buttonText : {
        color : "white",
        fontSize : 30,
 },
  camera : {
        marginRight :3,
  }
})