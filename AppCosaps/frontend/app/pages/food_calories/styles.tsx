import { StyleSheet } from "react-native";
import { Colors as colors, BaseStyles } from "@/app/MainStyle";


const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.Cor_2,
        ...BaseStyles.fullScreen,
        ...BaseStyles.column,
        ...BaseStyles.centerContent,
        margin:0
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
    height: "70%",
    width: "95%",
    alignSelf: "center",
    margin:0
  },
})

export default styles;