import { StyleSheet } from "react-native"
import colors from "@/app/conf/colors";

const styles = StyleSheet.create({
    content:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:colors.Fundo_3,
        height:"80%",
        width: "100%",
        borderRadius:30,
    },
    Inputs:{
        width:"100%",
        minHeight:"60%",
        height:"auto",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    Text:{
        color:"#fff", 
        fontWeight:"bold", 
        margin:0,
    },
    forgotPassword:{
      fontSize:14,
      fontWeight:"bold",
      color:"#0003c9ff"  
    },
    btn:{
        width:250,
        height:"30%",
        backgroundColor:colors.Cor_4,
        borderRadius:30,
        alignItems:"center",
        padding:"5%"
    }
})

export default styles;