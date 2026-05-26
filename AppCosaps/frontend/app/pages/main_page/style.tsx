import { StyleSheet } from "react-native";
import { Colors as colors } from "@/app/MainStyle";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.Cor_2,
        width:"100%",
        height:"100%",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"flex-start",
        margin:0
  },
  infoContainer: {
    flexDirection: "row",
    flex: 0,
    width: "100%",
    height: "40%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    margin: 0,
  }
})

export default styles;