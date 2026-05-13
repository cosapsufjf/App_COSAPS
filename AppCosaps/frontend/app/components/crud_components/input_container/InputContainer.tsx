import { View, Text, KeyboardTypeOptions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { FormProps } from "@/app/types/form";
import { useState, useEffect } from "react";
import { format_str } from "@/app/utils/regex";
import style from "./styles";
import colors from "@/app/conf/colors";
import ManageStorage  from "@/app/conf/AsyncStorage";

interface InputContainerProps {
    form?: FormProps,
    get_value_from_storage?: {get: boolean, item: string, field: string},
    el_text?:string,
    placeholder?:string,
    extra_component?:any,
    format_regex?:{regex:RegExp,replace:string},
    keyboard_type?:KeyboardTypeOptions,
    width?:number | string,
    height?:number | string,
    margin?:number | string,
    margin_top?:number | string,
    background_color?:string,
    show_errors?: boolean,
    text_state_setter?: React.Dispatch<React.SetStateAction<string>> | null,
}

const InputContainer : React.FC<InputContainerProps> = (
    {
        form,
        get_value_from_storage=null,
        el_text=null, 
        placeholder="",
        extra_component=null,
        format_regex=null,
        width="100%",
        height="10%",
        keyboard_type="default",
        background_color=colors.Fundo_Claro_1,
        margin=0,
        margin_top=0,
        show_errors=true,
        text_state_setter=null,
    }
) => {
  
    const [approved, setApproved] = useState(false);
    const [ok, setOk] = useState(false);
    const [ErrorTxt, setErrorTxt] = useState("");
    const styles = style(width,height,margin,margin_top,background_color,approved,ok);
    const [attValue, setAttValue] = useState<string>("");
  
    useEffect(() => {
      let mounted = true;
    
      async function load() {
        if (!get_value_from_storage?.get) return;
        try {
          const parsed = await ManageStorage.get_Parsed_Async_Storage(get_value_from_storage.item);
          const fieldValue = parsed?.[get_value_from_storage.field] ?? "";
          if (mounted) setAttValue(fieldValue);
        } catch{
          if (mounted) setAttValue("");
        }
      }
    
      load();
      return () => { mounted = false; };
    }, [get_value_from_storage]);
  
    const changeText = (text:string) => {
        if(form !== undefined)
        {
            if(format_regex != null)
            {
                console.log("tentando formatar: ",text)
                text = format_str(text,format_regex.regex,format_regex.replace);
                console.log("formatado: ",text)
            }
            form.setFormField(form.field,text);

            if(form.ValidateField && form.need_validation)
            {   
                const res = form.valueC ? 
                    form.ValidateField(form.method,form.field,{value:[text,form.valueC],param:form.param})
                    : 
                    form.ValidateField(form.method,form.field,{value:[text],param:form.param});

                if(show_errors)
                    setErrorTxt(res.message);
                
                setOk(!res.result);
                setApproved(res.result);
            }
        }

        if (text_state_setter != null)
            text_state_setter(text);

      
      setAttValue(text);
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