import React from 'react';
import { StyleSheet, Text,ToastAndroid, View,ScrollView, TouchableOpacity} from 'react-native';
import { useRoute,useNavigation  } from '@react-navigation/native';

const ExamDescription = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, name , description, grade,time} = route.params;

  return (
    <ScrollView>
   <View style={styles.container}>
     <View style={styles.contentContainer}>
      <Text style = {styles.headername}>  معلومات در مورد امتحان  {" "} {name} </Text>
       <Text style={styles.descriptionText}>{description}</Text>
     </View>

     <TouchableOpacity onPress={() => navigation.navigate("QuestionCodeScreen", {quizID : id, grade,time })}>
       <View style={styles.buttonContainer}>
         <Text style={styles.buttonText}>شروع امتحان</Text>
       </View>
     </TouchableOpacity>
   </View>
   </ScrollView>
 );
};

export default ExamDescription;


const styles = StyleSheet.create({
  container: {
    marginTop : 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  contentContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#0b1756',
    width: 120,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headername:{
    fontSize : 20,
    fontWeight : "900",
  }
});