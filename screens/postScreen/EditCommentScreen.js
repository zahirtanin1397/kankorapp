import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button,TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Commnet } from '../../src/models';
import { DataStore } from '@aws-amplify/datastore';

const EditCommentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { commentContent, commentId } = route.params;
  const [updatedCommentContent, setUpdatedCommentContent] = useState(commentContent);

  const handleSave = async () => {
    try {
      const comment = await DataStore.query(Commnet, commentId);
      if (comment) {
        const updatedComment = Commnet.copyOf(comment, (updated) => {
          updated.contet = updatedCommentContent;
        });

        await DataStore.save(updatedComment);

        navigation.goBack();
      }
    } catch (error) {
      console.log('Error saving comment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        value={updatedCommentContent}
        onChangeText={setUpdatedCommentContent}
      />
      <TouchableOpacity onPress={handleSave}  style ={styles.savebutton}>
         <Text style = {styles.savetext}> ذخیره</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  savebutton : {
    backgroundColor : "#0b1756",
   padding : 5,
   justifyContent : "center",
   alignItems : "center",
  },
  savetext :{
    color : "white",
  }
});

export default EditCommentScreen;