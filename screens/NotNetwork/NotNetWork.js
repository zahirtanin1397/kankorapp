import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import notnetwork from "../../assets/images/notnetwork.jpg";

const NotNetWork = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NotNetWork</Text>
      <Image source={notnetwork} style={styles.image} />
    </View>
  );
};

export default NotNetWork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});