import { View, Text, TouchableOpacity, DimensionValue } from "react-native";
import { StyleSheet } from "react-native";
import colors from "@/app/conf/colors";

interface BB_Props{
    action:()=>void,
    width ?:number | string,
    height?:number | string,
    backgroundColor?:string,
    borderad?:number,
    text?:string,
    textColor?:string,
    margin?:number | string
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
        action
    })=>{
    const styles = StyleSheet.create({
        btn:{
            width: width as DimensionValue,
            minHeight:height as DimensionValue,
            height:"auto",
            backgroundColor:backgroundColor,
            borderRadius:borderad,
            margin:margin as DimensionValue,
            alignItems:"center",
            padding:"5%"
        },
        Text:{
            color:textColor, 
            fontWeight:"bold", 
            margin:0,
        },
    })

    return (
    <View>
        <TouchableOpacity style={styles.btn} onPress={action}>
          <Text style={styles.Text}>{text}</Text>
        </TouchableOpacity>
      </View>
    )
}

export default BB;