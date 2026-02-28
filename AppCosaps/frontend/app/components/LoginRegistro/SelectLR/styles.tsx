import { StyleSheet } from "react-native";
import colors from "@/app/conf/colors";
const styles = ()=> {
    return{
        container : StyleSheet.create({
            st:{
            flex:1,
            backgroundColor:colors.Fundo_3,
            alignItems:"center",
            justifyContent:"center",
            borderRadius:30
            }
        }),
        center : StyleSheet.create({
            st:{
            alignItems:"center",
            justifyContent:"center",
            }
    }),
        row : StyleSheet.create({
            st:{
            flexDirection:"row",
            width:"100%",
            }
    }),
        tou_op : (background_color?:string)=>StyleSheet.create({
            st:{
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"column",
            backgroundColor:background_color??"green",
            margin:5,
            width:100,
            height:100,
            borderRadius:15
            }
    }),
        text:(text_color?:string, font_size?:number)=>StyleSheet.create({
            st:{
            fontSize:font_size??20,
            fontWeight:"normal",
            color:text_color??"#000",
            textAlign:"center"
            }
        })
    }
    
};

export default styles;
