import { StyleSheet, Image,ToastAndroid, Text, View, Pressable } from 'react-native';
import React from 'react';

const EpisodeItem = (props) => {
  const { episode, onPress } = props;


  return (
    <Pressable onPress={() => onPress(episode)}>
      <View style={styles.row}>
        {episode?.posterUri && (
          <Image source={{ uri: episode?.posterUri }} style={styles.posterImage} />
        )}
        <View style={styles.titleContainer}>
          <View style={styles.textContainer}>
            <View style = {{flexDirection:"column"}}>
            <Text style={styles.title}>{episode?.name}</Text>
            <Text style={styles.duration}>{episode?.duration}</Text>
            </View>
          
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default EpisodeItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 0,
    marginTop: 2,
    marginBottom: 1,
    backgroundColor: '#f1eded',
    padding: 2,
    borderWidth: 0.4,
    borderColor: "#e7e1e1",
  },
  titleContainer: {
    flex: 1,
    padding: 4,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "flex-start",
    marginHorizontal: 7,
  },
  duration: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'right',
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '200',
    textAlign: 'right',
  },
  posterImage: {
    width: "50%",
    height: 80,
    resizeMode: 'cover',
    borderRadius: 5,
    marginLeft: 10,
  },
});