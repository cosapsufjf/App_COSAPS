import { StyleSheet } from "react-native";
import colors from "@/app/conf/colors";
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
    Input_txt:{
        backgroundColor:"#fff",
        width:"100%",
        minHeight:50,
    }
})

export default styles;