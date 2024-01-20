import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DataStore } from '@aws-amplify/datastore';
import { Commnet } from '../../src/models';
import { Auth } from "aws-amplify";

const CommentContainer = ({postinfo}) => {
  const [comment, setComment] = useState('');


  console.log("post id " , postinfo);
  const now = new Date();
  const timeStump = now.getTime();

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === '') {
      return;
    }
  
    try {
      const user = await Auth.currentAuthenticatedUser();
      const AuthUserId = user.attributes.sub;

      const newComment = new Commnet({
        postID: postinfo, 
        userID:AuthUserId, 
        contet: comment,
      });
  
      // Save the comment to the data store
      await DataStore.save(newComment);
  
      console.log('Submitted comment:', newComment);
  
      // Clear the comment input field
      setComment('');
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="send"
          size={24}
          color="black"
          style={styles.sendIcon}
          onPress={handleCommentSubmit} // Call the submit handler when the send icon is pressed
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your comment"
          value={comment}
          onChangeText={handleCommentChange}
        />
      </View>
    </View>
  );
};

export default CommentContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    width: '95%',
    paddingHorizontal: 10,
  },
  sendIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 7,
  },
});