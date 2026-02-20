import { View, Text, StyleSheet, DimensionValue } from "react-native";
import colors from "@/app/conf/colors";
import { TextInput } from "react-native-gesture-handler";
import { FormProps } from "@/app/types/form";
import { useState } from "react";
import style from "./styles";

interface InputContainerProps {
    form ?: FormProps,
    ElText?:string,
    placeholder?:string,
    extraComponent?:any,
    returnText?:any,
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
        returnText=null,
        width="100%",
        height="10%",
        margin=0
    }
    )=>{
    const [approved, setApproved] = useState(false);
    const [ok, setOk] = useState(false);
    const [ErrorTxt, setErrorTxt] = useState("");

    const styles = style(width,height,margin,approved,ok);
    const changeText = (text:string) => {
        if(form != undefined)
        {
            form.setFormField(form.field,text);

            if(form.ValidateField)
            {   
                const res = form.valueC ? 
                    form.ValidateField(form.method,form.field,{value:[text,form.valueC],param:form.param})
                    : 
                    form.ValidateField(form.method,form.field,{value:[text],param:form.param});

                setErrorTxt(res.message);
                setOk(!res.result);
                setApproved(res.result);
            }
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