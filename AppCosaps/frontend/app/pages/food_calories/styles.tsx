import { StyleSheet } from "react-native";
import { Colors as colors, BaseStyles } from "@/app/MainStyle";


const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.Cor_2,
        height: "100%",
        width: "100%",
        ...BaseStyles.centerContent,
        margin: 0,
        justifyContent:"flex-start"
    },
    Input_txt:{
        backgroundColor:"#fff",
        width:"100%",
        minHeight:50,
    },
  list_item_container: {
    backgroundColor: colors.Fundo_Claro_2,
    flexDirection: "column",
    padding: 10,
    borderRadius: 30,
    height: "55%",
    width: "95%",
    alignSelf: "center",
    margin:0
  },
})

export default styles;