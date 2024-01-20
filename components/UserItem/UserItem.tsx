import { Text, View, Image, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, ChatRoomUser, User } from "../../src/models";
import { useNavigation } from "@react-navigation/native";

const UserItem = ({ user }) => {
  const navigation = useNavigation();
  const onPress = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      console.log("click user" , user.id);
      console.log("auth user " , authUser.attributes.sub);
      const chatRooms = await DataStore.query(ChatRoomUser, (c) =>
        c.userId.eq(authUser.attributes.sub)
      );
      const existingChatRoom = chatRooms.find(
        (chatRoom) => chatRoom.userId === user.id && 
        chatRoom.chatRoomId === user.chatRoomId
      );
  
      if (existingChatRoom) {
        
        console.log("A chat room with this user exists!");
      } else {
        console.log("A new chat room will be created!");
        // Add code to create a new chat room and navigate to it
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

   
  return (
    <Pressable>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={{ uri: user.imageUri }} style={styles.image} />

        <View style={styles.rightContainer}>
          <View style={styles.imgHeader}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.status}>{user.status}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Pressable>
  );
};

export default UserItem;






