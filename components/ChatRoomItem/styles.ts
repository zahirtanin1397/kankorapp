
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  maincontainer : {
    
  },
  container : {
     flexDirection : "row",
     borderWidth : 0.09,
     borderColor : "lightgray",
     marginTop : 5,
     paddingRight : 5,
     paddingLeft : 5,
     margin : 4,
     backgroundColor : "white",
     marginHorizontal : 4,
     borderRadius : 3,

    },
  image : {
    width : 50 , 
    height : 50,
    borderRadius : 50,
    margin : 5,
  },
  imgHeader :{
   flexDirection : "row",
   justifyContent: 'space-between',
  },
  name : {
      fontSize : 15,
      fontWeight : "700"
  },
  txtmessege : {
    fontSize : 13,
    color : "gray",
    paddingTop : 5,
  },
  rightContainer :{

  },
  badgeContainer : {
    backgroundColor : "#3777f0",
    width : 18,
    height : 18,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    left  : 45,
    top : 5,
    borderWidth:0.5,
    borderColor: "white",
  },
  badgeText : {
  color : "white",
  fontSize: 10,

  },
  time : {
        position : 'absolute',
        left : 100,
        color : "gray",
        
  }

})


export default styles;