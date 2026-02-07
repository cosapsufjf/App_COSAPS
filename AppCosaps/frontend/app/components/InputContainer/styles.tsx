import { StyleSheet } from "react-native"
import colors from "@/app/conf/colors";

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:"90%",
        height:"10%",
        flexDirection:"column",
        alignItems:"flex-start",
        textAlign:"left",
    },
    TextInput:{
        backgroundColor: colors.Fundo_Claro_1,
        width:"100%",
        minHeight:"5%",
        height:"auto",
        borderRadius:30
    },
    Text:{
        color:"#fff", 
        fontWeight:"bold", 
        margin:0
    },
})

export default styles;