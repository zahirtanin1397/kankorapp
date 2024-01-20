import React, { useState, useEffect } from "react";
import { Text, Image, View, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ChatRoom, ChatRoomUser } from "../../src/models";
import { DataStore } from "@aws-amplify/datastore";
import styles from "./styles";

export default function ChatRoomItem({ chatRoom }) {
  const navigation = useNavigation();
  const chatId = chatRoom.otherUser.id; // Use chatRoom.id instead of chatRoom.otherUser.id
  console.log("Hello id:", chatId);

  const deleteChatRoom = async (toDeleteChatId) => {
    try {
      console.log("User ID is ", toDeleteChatId);
      
      // Find the ChatRoomUser entry associated with the user ID
      const userChatRoom = await DataStore.query(ChatRoomUser, (c) =>
        c.userId.eq(toDeleteChatId)
      );
      
      if (userChatRoom.length === 0) {
        console.log("No chat room found for the user.");
        return;
      }
      // Get the chat room ID from the userChatRoom entry
      const chatRoomId = userChatRoom[0]?.chatRoomId ;
      console.log("it is " , chatRoomId)
      // Delete the ChatRoomUser entry
      await DataStore.delete(ChatRoomUser, userChatRoom[0]?.id);
      // Delete the ChatRoom
      await DataStore.delete(ChatRoom, chatRoomId);
      console.log("Deletion was successful");
    } catch (error) {
      console.error("Error deleting chat room:", error);
    }
  };

  const handleLongPress = () => {
    Alert.alert(
      "حذف این چت",
      "آیا مطمئن هستید که میخواهید این چت را حذف کنید؟",
      [
        { text: "منصرف", style: "cancel" },
        {
          text: "حذف",
          style: "destructive",
          onPress: () => deleteChatRoom(chatId), // Pass deleteChatRoom(chatId) as a callback function
        },
      ]
    );
  };

  return (

   <Pressable
      onPress={() => navigation.navigate("ChatRoom")}
      style={styles.container}
      onLongPress={handleLongPress} // Remove the arrow function from onLongPress
     >
      <Image source={{ uri: chatRoom.otherUser?.imageUri }} style={styles.image} />
       {chatRoom.otherUser.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.otherUser?.newMessages}</Text>
        </View>
      )}
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{chatRoom.otherUser?.name}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
         {chatRoom.otherUser?.LastMessage}
        </Text>
    </View>
   </Pressable>
  );
}