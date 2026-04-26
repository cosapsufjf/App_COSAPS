import { StyleSheet, useAnimatedValue } from "react-native";
import { Animated } from "react-native";

import colors from "@/app/conf/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#beb5e5",
    alignItems: "center",
    width: "100%",
    height:"100%"
  },
  imgHeader:{
    width: 350,
    height:80,
    margin:20,
  },
  content:{
        flex:1,
        flexDirection: "column",
        backgroundColor: "#f1f0f7",
        alignItems: "center",
        borderRadius:30,
    },
    Inputs:{
        width:"100%",
        minHeight:"40%",
        height:"auto",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    MessageContainer:{
        position:"absolute",
        borderRadius:30,
        backgroundColor:colors.Fundo_Claro_1,
        transform: [{translateY: -100}],
        width:"90%",  
        minHeight:"30%",
        height:"auto",
        padding:10,
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        textAlign:"justify"
    },
        Text:{
        color:"black", 
        fontWeight:"bold", 
        fontSize:25,
        margin:0,
    },
      Progress_bar:{
        position:"absolute",
        bottom:-65,
        backgroundColor:colors.Cor_4,
        height:"5%",
    },
    Buttons:{
        flexDirection:"row",
        alignItems:"center",
        position:"absolute",
        top:100

    },
});

export default styles;
