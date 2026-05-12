import { StyleSheet } from "react-native";
import colors from "@/app/conf/colors";
const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.Cor_2,
        width:"100%",
        minHeight:"100%",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"flex-start",
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
    height: "50%",
    width: "85%",
    alignSelf: "center",
    margin:0
  },
})

export default styles;