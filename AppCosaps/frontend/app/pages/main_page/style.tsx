import { StyleSheet } from "react-native";
import { BaseStyles, Colors as colors } from "@/app/MainStyle";

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
    }
})

export default styles;