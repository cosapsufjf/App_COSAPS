import { View, Text, StyleSheet, DimensionValue, KeyboardTypeOptions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { FormProps } from "@/app/types/form";
import { useState } from "react";
import { format_str } from "@/app/utils/regex";
import style from "./styles";
import colors from "@/app/conf/colors";

interface InputContainerProps {
    form ?: FormProps,
    el_text?:string,
    placeholder?:string,
    extra_component?:any,
    format_regex?:{regex:RegExp,replace:string},
    keyboard_type?:KeyboardTypeOptions,
    width?:number | string,
    height?:number | string,
    margin?:number | string,
    background_color?:string
}

const InputContainer : React.FC<InputContainerProps> = (
    {
        form,
        el_text=null, 
        placeholder="",
        extra_component=null,
        format_regex=null,
        width="100%",
        height="10%",
        keyboard_type="default",
        background_color=colors.Fundo_Claro_1,
        margin=0
    }
    )=>{
    const [approved, setApproved] = useState(false);
    const [ok, setOk] = useState(false);
    const [ErrorTxt, setErrorTxt] = useState("");
    const [attValue, setAttValue] = useState("");
    const styles = style(width,height,margin,background_color,approved,ok);
    const changeText = (text:string) => {
        if(form != undefined)
        {
            if(format_regex != null)
            {
                console.log("tentando formatar: ",text)
                text = format_str(text,format_regex.regex,format_regex.replace);
                console.log("formatado: ",text)
            }
            setAttValue(text);
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
                <Text style={styles.Text}>{el_text??form?.field}</Text>
                <TextInput style={styles.TextInput} keyboardType={keyboard_type} 
                onChangeText={(text:string)=>changeText(text)}
                value={attValue}
                placeholder={placeholder} 
                />
                {extra_component && extra_component()}
                <View style={styles.ErrorMessage}>
                    <Text style={styles.error}>{ErrorTxt}</Text>
                </View>
            </View>
    );
}

export default InputContainer;