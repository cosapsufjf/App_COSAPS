import { StyleSheet, DimensionValue } from "react-native";
import colors from "@/app/conf/colors";

const styles = (width : number | string,height:number | string,margin:number | string,
    marginTop:number | string, background_color:string,approved:boolean,ok:boolean)=> StyleSheet.create({
        container:{
            flex:1,
            width:"90%",
            height:"10%",
            flexDirection:"column",
            alignItems:"flex-start",
            textAlign:"left",
            margin:margin as DimensionValue,
            marginTop:marginTop as DimensionValue
        },
        TextInput:{
            backgroundColor: background_color,
            width: width as DimensionValue,
            minHeight:height as DimensionValue,
            height:"auto",
            borderRadius:30,
            margin:margin as DimensionValue,
            borderWidth:3,
            borderColor:approved ? "green" : colors.Fundo_Claro_1,
        },
        Text:{
            color:"#fff", 
            fontWeight:"bold", 
            margin:0,
            fontSize:20
        },
        ErrorMessage:{
            alignContent:"center",
            justifyContent:"center",
            marginTop:0,
            width:"100%",
        },
        error:{
            color:"red",
            fontSize:15,
            visibility: ok ? "hidden" : "visible",
            marginTop:0,
            textAlign:"center"
        }
    })

export default styles;