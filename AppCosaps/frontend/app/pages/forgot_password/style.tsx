import { StyleSheet } from "react-native";
import { BaseStyles, Colors as colors } from "@/app/MainStyle";

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    backgroundColor: "#beb5e5",
    
  },
  imgHeader:{
    width: 350,
    height:80,
    margin:20,
  },
  content: {
    width: "90%",
    height:"90%",
    ...BaseStyles.column,
    backgroundColor: "#f1f0f7",
    borderRadius:30,
  },
  Inputs: {
    ...BaseStyles.column,
    width:"100%",
    minHeight:"40%",
    height:"auto",
  },
  popUpOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end", 
    alignItems: "center",      
    paddingBottom: 40,
    pointerEvents: "none",       
  },
  MessageContainer: {
    borderRadius: 30,
    backgroundColor: colors.Fundo_Claro_1,
    width: "90%",
    minHeight: 80,
    padding: 15,
    alignItems: "flex-start",
    justifyContent: "center",
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
