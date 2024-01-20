import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { useNavigation } from "@react-navigation/native";
import { Storage, Auth } from "aws-amplify";
import { Post ,Postlike} from "../../src/models";
import CommentContainer from "../../components/postComponent/CommentContaner";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const HomeScreenPost = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await DataStore.query(Post);
        setPosts(fetchedPosts);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const navigateToCommentScreen = (post: Post) => {
    navigation.navigate("CommentScreen", {
      postId: post.id,
      postTitle: post.title,
      postContent: post.content,
    });
  };

  return (
    <ScrollView style={styles.mainContainer}>
      {posts.map((post) => (
        <View key={post.id} style={styles.container}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.content}>{post.content}</Text>
          <View style={styles.rowicon}>
            <View style={styles.like}>
              <AntDesign name="like2" size={24} color="gray" 
                onPress={() => {}}
              />
            </View>
            <View style={styles.like}>
              <Fontisto
                name="comment"
                onPress={() => navigateToCommentScreen(post)}
                size={20}
                color="gray"
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreenPost;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "lightgray",
  },
  container: {
    margin: 3,
    backgroundColor: "white",
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
});
