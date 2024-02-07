import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DataStore } from '@aws-amplify/datastore';
import { Commnet } from '../../src/models';
import { Auth } from "aws-amplify";
import NetInfo from '@react-native-community/netinfo';

const CommentContainer = ({ postinfo }) => {
  const [comment, setComment] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleCommentSubmit = async () => {
    if (!isConnected) {
      ToastAndroid.show('برای ثبت نظر ویرایش و حذف ان به انترنیت متصل باشید', ToastAndroid.SHORT);
      return;
    }

    if (comment.trim() === '') {
      return;
    }

    try {
      const user = await Auth.currentAuthenticatedUser();
      const AuthUserId = user.attributes.sub;

      const newComment = new Commnet({
        postID: postinfo,
        userID: AuthUserId,
        contet: comment,
      });
      // Save the comment to the data store
      await DataStore.save(newComment);
      // Clear the comment input field
      setComment('');
    } catch (error) {
      ToastAndroid.show('Error saving comment', ToastAndroid.SHORT);
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
          editable={isConnected} // Disable the input field if offline
        />
      </View>
      {!isConnected && (
        <Text style={styles.offlineText}>برای ثبت نظر ویرایش و حذف ان به انترنیت متصل باشید</Text>
      )}
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
  offlineText: {
    marginTop: 10,
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
});