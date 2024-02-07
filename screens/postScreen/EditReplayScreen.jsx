import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native';
import { useNavigation ,useRoute} from '@react-navigation/native';
import { Replay } from '../../src/models';
import { DataStore } from '@aws-amplify/datastore';
const EditReplayScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { replayId, replayContent } = route.params;
  const [updatedReplayContent, setUpdatedReplayContent] = useState(replayContent);
  const handleSave = async () => {
    try {
      const replay = await DataStore.query(Replay, replayId);
      if (replay) {
        const updatedRepaly = Replay.copyOf(replay, (updated) => {
          updated.content = updatedReplayContent;
        });
        await DataStore.save(updatedRepaly);
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
        value={updatedReplayContent}
        onChangeText={setUpdatedReplayContent}
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

export default EditReplayScreen;