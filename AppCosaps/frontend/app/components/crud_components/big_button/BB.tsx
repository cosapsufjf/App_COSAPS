import { View, Text, TouchableOpacity, DimensionValue } from "react-native";
import { StyleSheet } from "react-native";
import { Colors as colors} from "../../../MainStyle";

interface BB_Props{
    action:()=>void,
    width ?:number | string,
    height?:number | string,
    backgroundColor?:string,
    borderad?:number,
    text?:string,
    textColor?:string,
    margin?: number | string,
    right?: number | string,
    position?: "absolute" | "relative",
    inline?: boolean,
}

const BB : React.FC<BB_Props> = (
    {
        width=250,
        height="5%",
        backgroundColor=colors.Cor_4,
        borderad=30,
        textColor="#fff",
        margin=0,
        text,
        action,
        position="relative",
        right = 0,
        inline = false,
  }) => {
  
    const styles = StyleSheet.create({
        btn:{
            width: width as DimensionValue,
            minHeight:height as DimensionValue,
            height:"auto",
            backgroundColor:backgroundColor,
            borderRadius:borderad,
            margin:margin as DimensionValue,
            alignItems:"center",
            justifyContent:"center",
            padding:"5%",
            position,
            right: right as DimensionValue,
        },
        Text:{
            color:textColor, 
            fontWeight:"bold", 
            margin:0,
      },
      inline: {
        position: "absolute",
        right: -40,
        top: 0,
        bottom: 0,
        margin: 0,
        height:70,
        alignItems: "center",
        justifyContent: "center",
        }
        
    })

    return (
        <TouchableOpacity style={inline ? [styles.btn,styles.inline] : styles.btn} onPress={action}>
          <Text style={styles.Text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default BB;