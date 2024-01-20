import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import CommentContainer from "../../components/postComponent/CommentContaner";
import { Commnet, User } from "../../src/models";
import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "aws-amplify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import moment from "moment";
import "moment/locale/fa";
moment.locale("fa");
import { useNavigation,} from "@react-navigation/native";

const CommentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const { postId, postTitle, postContent } = route.params;

  const fetchComments = async () => {
    try {
      const fetchedComments = await DataStore.query(Commnet, (c) =>
        c.postID.eq(postId)
      );
      setComments(fetchedComments);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
    const subscription = DataStore.observe(Commnet).subscribe(() => {
      fetchComments();
    });
    return () => {
      subscription.unsubscribe();
    };
  
  }, [postId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchUsers = await DataStore.query(User);
        const userWithImage = await Promise.all(
          fetchUsers.map(async (userImage) => {
            const myImageUri = await Storage.get(userImage.imageUri);
            return { ...userImage, imageUri: myImageUri };
          })
        );
        setUsers(userWithImage);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.postContainer}>
          <Text style={styles.title}>{postTitle}</Text>
          <Text style={styles.content}>{postContent}</Text>
          <View style={styles.rowicon}>
            <View style={styles.like}>
              <AntDesign name="like2" size={24} color="gray" />
            </View>
            <View style={styles.like}>
              <Fontisto name="comment" size={20} color="gray" />
            </View>
          </View>
        </View>
        <View style={{ width: "100%", height: 2, backgroundColor: "gray" }} />

        {/* Display comments and users */}
        {comments.map((comment) => {
          const user = users.find((u) => u.id === comment.userID);
          if (user) {
            return (
              <View style={{ flexDirection: "row" }} key={comment.id}>
                <Image
                  source={{ uri: user?.imageUri }}
                  style={styles.posterImage}
                />
                <View style={styles.comment}>
                <View >
                  <Text style={styles.nametext}>{user.name}</Text>

                  <Text style={styles.commenttext}>{comment.contet}</Text>
                  <Text style={styles.timetext}>
                    {" "}
                    {moment(comment.createdAt).fromNow(true)}{" پیش"}
                  </Text>
                </View>
                <View>
                <Pressable onPress={() => {navigation.navigate("ReplyScreen", {commentId : comment.id, userName : user.name})}} >
                    <Text style={styles.answertext}> پاسخ به </Text>
                  </Pressable>
                </View>
                </View>
              
                
              </View>
            );
          }
          return null;
        })}
      </ScrollView>
      <View style={styles.commentContainer}>
        <CommentContainer postinfo={postId} />
      </View>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  postContainer: {
    backgroundColor: "white",
    margin: 3,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 15,
  },
  rowicon: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  like: {
    backgroundColor: "#ededed",
    width: 110,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  comment: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: "#efeeee",
  
  },
  commentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 1,
  },
  commenttext: {
    color: "black",
    fontSize : 13,
  },
  posterImage: {
    width: 46,
    height: 46,
    borderRadius: 30,
    marginLeft: 5,
  },
  timetext:{
  color :"gray",
  },
  nametext : {
    fontSize : 16,
    fontWeight : "bold",
    textAlign: 'left',
  },
  answertext :{
    textAlign: 'right',
    marginRight : -10,
    marginTop : 5,
    color : "#1c08f2"
  }
});
