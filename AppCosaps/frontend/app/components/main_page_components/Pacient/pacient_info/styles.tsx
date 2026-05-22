import { StyleSheet } from "react-native";
import { Colors as colors } from "@/app/MainStyle";

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.Cor_6,
        borderRadius:10,
        width:"100%",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        margin:10
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
    }
})


export default styles;