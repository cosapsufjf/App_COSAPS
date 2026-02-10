import { View, Text, StyleSheet, DimensionValue } from "react-native";
import colors from "@/app/conf/colors";
import { TextInput } from "react-native-gesture-handler";
import { FormProps } from "@/app/types/form";
import { useState } from "react";

interface InputContainerProps {
    form ?: FormProps,
    ElText?:string,
    placeholder?:string,
    extraComponent?:any,
    extraAction?:any,
    width?:number | string,
    height?:number | string,
    margin?:number | string
}

const InputContainer : React.FC<InputContainerProps> = (
    {
        form,
        ElText=null, 
        placeholder="",
        extraComponent=null,
        extraAction=null,
        width="100%",
        height="10%",
        margin=0
    }
    )=>{
    const [approved, setApproved] = useState(false);
    const [ok, setOk] = useState(false);
    const [ErrorTxt, setErrorTxt] = useState("");

    const styles = StyleSheet.create({
        container:{
            flex:1,
            width:"90%",
            height:"10%",
            flexDirection:"column",
            alignItems:"flex-start",
            textAlign:"left",
            margin:0,
        },
        TextInput:{
            backgroundColor: colors.Fundo_Claro_1,
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

    const changeText = (text:string) => {
        if(form != undefined)
        {
            form.setFormField(form.field,text);
            let res = {result: true, error: "", message: ""};

            if(form.ValidateField!=null)
                if(form.method != null)
                    res = form.ValidateField(
                    form.method,
                    {value: form.valueC != null ? [form.valueC, text] : [text], param:form.param}
                    );

            setApproved(res.result)       
            setErrorTxt(res.error)
            setOk(!res.result)

            if(extraAction != null && res.result)
                extraAction(text);
        }
    }

    return (
            <View style={styles.container}>
                <Text style={styles.Text}>{ElText??form?.field}</Text>
                <TextInput style={styles.TextInput} onChangeText={(text:string)=>changeText(text)} placeholder={placeholder} />
                {extraComponent && extraComponent()}
                <View style={styles.ErrorMessage}>
                    <Text style={styles.error}>{ErrorTxt}</Text>
                </View>
            </View>
    );
}

export default InputContainer;