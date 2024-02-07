import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DataStore } from '@aws-amplify/datastore';
import { Replay } from '../../src/models';
import { Auth } from "aws-amplify";

const ReplayContainer = ({commentinfo}) => {
  const [replay, setreplay] = useState('');

  const now = new Date();
  const timeStump = now.getTime();

  const handleReplayChange = (text) => {
    setreplay(text);
  };

  const handleReplaySubmit = async () => {
    if (replay.trim() === '') {
      return;
    }
  
    try {
      const user = await Auth.currentAuthenticatedUser();
      const AuthUserId = user.attributes.sub;

      const newReplay = new Replay({
        commnetID: commentinfo, 
        userID:AuthUserId, 
        content: replay,
      });
  
      // Save the comment to the data store
      await DataStore.save(newReplay);
  
      // Clear the comment input field
      setreplay('');
    } catch (error) {
      ToastAndroid.show('Error saving replay:', ToastAndroid.SHORT);
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
          onPress={handleReplaySubmit} // Call the submit handler when the send icon is pressed
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your replay"
          value={replay}
          onChangeText={handleReplayChange}
        />
      </View>
    </View>
  );
};

export default ReplayContainer;

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