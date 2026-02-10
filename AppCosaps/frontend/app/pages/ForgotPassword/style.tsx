import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#beb5e5",
    alignItems: "center",
    width: "100%",
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
        width: "80%",
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
});

export default styles;
