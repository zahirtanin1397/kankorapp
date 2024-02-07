import React, { useEffect, useState,useRef } from "react";
import {
  StyleSheet,
  ToastAndroid,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
  Pressable, Dimensions
} from "react-native";
import { Video } from 'expo-av';
import { useRoute } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";
import CommentContainer from "../../components/postComponent/CommentContaner";
import { Commnet, User , Replay } from "../../src/models";
import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import moment from "moment";
import "moment/locale/fa";
moment.locale("fa");
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

const CommentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const videoRef = useRef(null);
  const {
    postId,
    postTitle,
    postContent,
    postCreatedAt,
    postImage,
    postName,
    postcount,
    postVideoUri,
  } = route.params;

  const fetchReplayCount = async (commentId) => {
    try {
      const replays = await DataStore.query(Replay, (c) =>
        c.commnetID.eq(commentId)
      );
      return replays.length;
    } catch (error) {
      console.log("Error fetching replays:", error);
      return 0;
    }
  };

  const fetchComments = async () => {
    try {
      const fetchedComments = await DataStore.query(Commnet, (c) =>
        c.postID.eq(postId)
      );
      fetchedComments.sort((a, b) => {
        const createdAtA = new Date(a.createdAt);
        const createdAtB = new Date(b.createdAt);
        return createdAtB - createdAtA;
      });
      const commentsWithReplayCount = await Promise.all(
        fetchedComments.map(async (comment) => {
          const replayCount = await fetchReplayCount(comment.id);
          return { ...comment, replayCount };
        })
      );
      setComments(commentsWithReplayCount);
    } catch (error) {
      ToastAndroid.show("Error fetching comments: " + error, ToastAndroid.SHORT);
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
        setUsers(fetchUsers);
      } catch (error) {
        ToastAndroid.show("خطا در دریافت کاربران:", error, ToastAndroid.SHORT);
      }
    };
    fetchUser();
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      if (!isConnected) {
        ToastAndroid.show("خطا در حذف نظر: عدم اتصال به اینترنت", ToastAndroid.SHORT);
        return;
      }
  
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      const currentUserSub = authenticatedUser.attributes.sub;
  
      const comment = await DataStore.query(Commnet, commentId);
      if (comment && comment.userID === currentUserSub) {
        Alert.alert(
          "تأیید حذف",
          "آیا مطمئن هستید که میخواهید این نظر را حذف کنید؟",
          [
            {
              text: "انصراف",
              style: "cancel",
            },
            {
              text: "حذف",
              style: "destructive",
              onPress: async () => {
                await DataStore.delete(Commnet, commentId);
                ToastAndroid.show("نظر با موفقیت حذف شد", ToastAndroid.SHORT);
              },
            },
          ]
        );
      } else {
        ToastAndroid.show("شما مجاز به حذف این نظر نیستید", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show("خطا در حذف نظر: " + error, ToastAndroid.SHORT);
    }
  };

  const handleEditComment = async (commentId, commentContent) => {
    try {
      if (!isConnected) {
        ToastAndroid.show("خطا در در ویرایش نظر: عدم اتصال به اینترنت", ToastAndroid.SHORT);
        return;
      }
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      const currentUserSub = authenticatedUser.attributes.sub;

      const comment = await DataStore.query(Commnet, commentId);
      if (comment && comment.userID === currentUserSub) {
        navigation.navigate("EditCommentScreen", {
          commentId: commentId,
          commentContent: commentContent,
        });
      } else {
        ToastAndroid.show(
          "شما مجاز به ویرایش این نظر نیستید",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      ToastAndroid.show("خطا در ویرایش نظر:", error, ToastAndroid.SHORT);
    }
  };

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
      return ;
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.postContainer}>
          <View style={styles.imagename}>
            {postImage && (
              <Image
                source={{ uri: postImage }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
            <View style={{ flexDirection: "column" }}>
              <Text> {postName}</Text>
              <Text style={styles.timetext}>
                {" "}
                {moment(postCreatedAt).fromNow(true)}
                {" پیش"}
              </Text>
            </View>
          </View>
          <Text style={styles.title}>{postTitle}</Text>
          {/*  */}


         {postContent === null && postVideoUri && (
      <>
        {isConnected ? (
          <Video
            ref={videoRef}
            source={{ uri: postVideoUri }}
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
    {postContent !== null && (
      <Text style={styles.content}>{postContent}</Text>
    )}
          {/*  */}
          <View style={styles.rowicon}>
            <View style={styles.like}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.count}> {postcount}</Text>
                <Fontisto name="comment" size={20} color="gray" />
              </View>
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
                <View style={styles.namecontainer}>
                  <Text style={styles.nametext}>{user?.name}</Text>
                </View>
                <View style={styles.comment}>
                  <View>
                    <Text style={styles.commenttext}>{comment?.contet}</Text>
                    <Text style={styles.timetext}>
                      {" "}
                      {moment(comment.createdAt).fromNow(true)}
                      {" پیش"}
                    </Text>
                  </View>

                 { comment.replayCount >= 1 &&  (
                  <Pressable
                      onPress={() => {
                        navigation.navigate("ReplyScreen", {
                          commentId: comment.id,
                          userName: user.name,
                        });
                      }}
                    >
                  <Text style={styles.count}>{comment.replayCount}  پاسخ به نظر شما...</Text>
                    </Pressable>
                  )}

                  <View style={{ flexDirection: "row" }}>
                    <Pressable
                      onPress={() => {
                        navigation.navigate("ReplyScreen", {
                          commentId: comment.id,
                          userName: user.name,
                        });
                      }}
                    >
                      <Text style={styles.answertext}> پاسخ به </Text>
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        handleEditComment(comment.id, comment.contet)
                      }
                    >
                      <Text style={styles.answertext}> ویرایش </Text>
                    </Pressable>
                    <Pressable onPress={() => handleDeleteComment(comment.id)}>
                      <Text style={styles.answertext}> حذف </Text>
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
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  postContainer: {
    backgroundColor: "white",
    marginBottom: 10,
    // padding: 16,
    marginLeft: 0,
    marginRight: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
    marginBottom: 10,
  },
  rowicon: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  like: {
    backgroundColor: "#ededed",
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  comment: {
    margin: 5,
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    maxWidth: "60%",
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
    padding: 10,
  },
  commenttext: {
    color: "black",
    fontSize: 13,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 40,
  },
  posterImage: {
    width: 46,
    height: 46,
    borderRadius: 30,
    marginLeft: 1,
  },
  timetext: {
    color: "gray",
    marginBottom: 10,
  },
  nametext: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    color: "#092709",
  },
  answertext: {
    textAlign: "right",
    marginTop: 5,
    color: "#1c08f2",
    marginRight: 4,
  },
  namecontainer: {
    marginLeft: 1,
    borderWidth: 1,
    borderColor: "green",
    marginBottom: "auto",
    padding: 5,
    borderRadius: 5,
    margin: 1,
  },
  imagename: {
    flexDirection: "row",
    marginBottom: 10,
  },
  count: {
    color: "#0c08f8",
    marginRight: 10,
  },
  video: {
    width: Dimensions.get('window').width,
    height: 290,
    marginTop: 1,
  },
});
