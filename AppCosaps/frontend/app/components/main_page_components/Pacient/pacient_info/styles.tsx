import { StyleSheet } from "react-native";
import { BaseStyles,Colors as colors } from "@/app/MainStyle";

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.Cor_6,
        borderRadius:10,
        width: "95%",
        height: "90%",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
      margin: 10,
      padding:"5%"
    },
    item:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        borderRadius:30,
        width:"80%",
        margin:10,
        backgroundColor:"#fff",
        padding:10
    },
    text:{
        color:"black",
        fontSize:18,
        fontWeight:"bold"
  },
  tiles_container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "50%",
    height: "10%",
    justifyContent: "space-around",
    color:"#fff",
    
  },
  tile: {
    borderRadius: 30,
    width: "60%",
    marginTop: 30,
    height: 100,
    ...BaseStyles.centerContent
  },
})


export default styles;