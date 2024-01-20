import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import ReplayContainer from "../../components/postComponent/ReplayContaner";
import { Replay, User } from "../../src/models";
import { DataStore } from "@aws-amplify/datastore";
import { Storage } from "aws-amplify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import moment from "moment";
import "moment/locale/fa";
moment.locale("fa");
import { useNavigation,} from "@react-navigation/native";

const ReplayScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [replays, setReplays] = useState([]);
  const [users, setUsers] = useState([]);
  const { commentId , userName} = route.params;

console.log("comment id is " , commentId);


  const fetchReplay = async () => {
    try {
      const fetchedReplay = await DataStore.query(Replay, (c) =>
        c.commnetID.eq(commentId)
      );
      setReplays(fetchedReplay);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchReplay();
    const subscription = DataStore.observe(Replay).subscribe(() => {
      fetchReplay();
    });
    return () => {
      subscription.unsubscribe();
    };
  
  }, [commentId]);

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
        {replays.map((replay) => {
          const user = users.find((u) => u.id === replay.userID);
          if (user) {
            return (
              <View style={{ flexDirection: "row" }} key={replay.id}>            
                <Image
                  source={{ uri: user?.imageUri }}
                  style={styles.posterImage}
                />
                <View style={styles.comment}>
                <Text style = {styles.commentusername}>{"@"}{userName}</Text>
                <View >
                  <Text style={styles.nametext}>{user.name}</Text>

                  <Text style={styles.commenttext}>{replay.content}</Text>
                  <Text style={styles.timetext}>
                    {" "}
                    {moment(replay.createdAt).fromNow(true)}{" پیش"}
                  </Text>
                </View>
                </View>
              
                
              </View>
            );
          }
          return null;
        })}
      </ScrollView>
      <View style={styles.commentContainer}>
        <ReplayContainer commentinfo={commentId} />
      </View>
    </View>
  );
};

export default ReplayScreen;

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
    fontWeight : "500",
    textAlign: 'left',
  },
  answertext :{
    textAlign: 'right',
    marginRight : -10,
    marginTop : 5,
    color : "#1c08f2"
  },
  commentusername : {
    color :"#1523e6",
    fontWeight : "900",
    textAlign: 'left',
  }
});
