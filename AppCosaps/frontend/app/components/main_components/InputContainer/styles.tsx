import { StyleSheet, DimensionValue } from "react-native";
import { Colors as colors } from "../../../MainStyle";


const styles = (
        width : number | string,height:number | string,margin:number | string,
        marginTop:number | string, background_color:string,approved:boolean,position: string,bottom: number | string,
    )=> StyleSheet.create({
        container:{
            flex:1,
            width:"95%",
            height:"10%",
            flexDirection:"column",
            alignItems:"flex-start",
            textAlign:"left",
            margin:margin as DimensionValue,
            marginTop:marginTop as DimensionValue,
            position: position as "static" | "relative" | "absolute" | "fixed" | "sticky" | undefined,
            bottom: bottom as DimensionValue,
        },
      TextInput: {
          color: "black",
          backgroundColor: background_color,
          width: width as DimensionValue,
          minHeight:height as DimensionValue,
          height:"auto",
          borderRadius:30,
          margin:margin as DimensionValue,
          borderWidth:1.5,
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
            visibility: approved ? "hidden" : "visible",
            marginTop:0,
            textAlign:"center"
      },
      eye_icon: {
          position: "absolute",
          right: 10,
          top: 10,
          bottom: 0,
          margin: 0,
          alignItems: "center",
          justifyContent: "center",
        }
    })

export default styles;