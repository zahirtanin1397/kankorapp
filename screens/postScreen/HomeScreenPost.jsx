import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ToastAndroid,
  Image,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import { Storage } from "aws-amplify";
import { Post, Commnet } from "../../src/models";
import { Fontisto } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";

import moment from "moment";
import "moment/locale/fa";
moment.locale("fa");

const HomeScreenPost = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const videoRef = useRef(null);

  const fetchCommentCount = async (postId) => {
    try {
      const comments = await DataStore.query(Commnet, (c) =>
        c.postID.eq(postId)
      );
      return comments.length;
    } catch (error) {
      console.log("Error fetching comments:", error);
      return 0;
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await DataStore.query(Post);
      const postsWithImageUri = await Promise.all(
        fetchedPosts.map(async (post) => {
          if (post.imageUri || post.videoUri) {
            const imageUri = await Storage.get(post.imageUri);
            const videoUri = await Storage.get(post.videoUri);
            return { ...post, imageUri, videoUri };
          }
          return post;
        })
      );

      const postsWithCommentCount = await Promise.all(
        postsWithImageUri.map(async (post) => {
          const commentCount = await fetchCommentCount(post.id);
          return { ...post, commentCount };
        })
      );

      setPosts(postsWithCommentCount);
      setLoading(false);
    } catch (error) {
      ToastAndroid.show("Error fetching posts:", error, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const navigateToCommentScreen = (post) => {
    // Pause the video before navigating to the comment screen
    if (videoRef.current) {
      videoRef.current.pauseAsync();
    }

    navigation.navigate("CommentScreen", {
      postId: post.id,
      postTitle: post.title,
      postContent: post.content,
      postVideoUri: post.videoUri,
      postImage: post.imageUri,
      postCreatedAt: post.createdAt,
      postName: post.name,
      postcount: post.commentCount,
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // Pause the video when navigating away from the current screen
      if (videoRef.current) {
        videoRef.current.pauseAsync();
      }
    });
    return unsubscribe;
  }, [navigation]);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      return;
    }
  }, [isConnected]);

 

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.container}>
      <View style={styles.imagename}>
        {item.imageUri && (
          <Image
            source={{ uri: item.imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={{ flexDirection: "column" }}>
          <Text>{item.name}</Text>
          <Text style={styles.timetext}>
            {moment(item.createdAt).fromNow(true)} پیش
          </Text>
        </View>
      </View>
      <Text style={styles.title}>{item.title}</Text>

      {item.content === null && item.videoUri && (
      <>
        {isConnected ? (
          <Video
            ref={videoRef}
            source={{ uri: item.videoUri }}
            style={styles.video}
            resizeMode="cover"
            useNativeControls
          />
        ) : (
          <View style={styles.noInternetContainer}>
            <Text style={styles.noInternetText}>عدم اتصال به اینترنت!</Text>
          </View>
        )}
      </>
    )}
    {item.content !== null && (
      <Text style={styles.content}>{item.content}</Text>
    )}

      <View style={styles.rowicon}>
        <View style={styles.like}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.count}> {item.commentCount}</Text>
            <Fontisto
              name="comment"
              onPress={() => navigateToCommentScreen(item)}
              size={20}
              color="gray"
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={loading}
        onRefresh={fetchPosts}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreenPost;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
    marginRight: 0,
  },
  container: {
    marginTop: 10,
    backgroundColor: "white",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginLeft: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  noInternetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: Dimensions.get('window').width,
    height: 290,
    marginTop: 0,
  },
  noInternetText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    fontSize: 15,
    marginLeft: 5,
    marginRight: 9,
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
    width: "100%",
  },
  imagename: {
    flexDirection: "row",
  },
  timetext: {
    color: "gray",
  },
  count: {
    color: "#565756",
    marginRight: 10,
  },
  video: {
    width: Dimensions.get("window").width,
    height: 300,
    marginTop: 0,
  },
});
