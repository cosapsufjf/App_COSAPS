import { View, Text, KeyboardTypeOptions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { format_str } from "@/app/utils/regex";
import style from "./styles";
import { Colors as colors } from "../../../MainStyle";
import ManageStorage from "@/app/conf/AsyncStorage";

import { Fields, FixProps } from "@/app/types/form";

interface InputContainerProps {
    form?: FixProps,
    get_value_from_storage?: {get: boolean, item: string, field: string},

    extra_component?:any,
    format_regex?:{regex:RegExp,replace:string},
    text_state_setter?: React.Dispatch<React.SetStateAction<string>> | null,

    keyboard_type?: KeyboardTypeOptions,
    show_errors?: boolean,
    el_text?:string,
    placeholder?:string,

    width?:number | string,
    height?:number | string,
    margin?:number | string,
    margin_top?:number | string,
    background_color?:string,
}

  const FixInput : React.FC<InputContainerProps> = (
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

    const [storageValue, setStorageValue] = useState<string>("");
    const [approved, setApproved] = useState(false);
    const [ok, setOk] = useState(false);
    const styles = style(width,height,margin,margin_top,background_color,approved,ok);
    const [attValue, setAttValue] = useState<string>("");

    const getErrors = () => {
        if (form === undefined) return [];

        const errors: string[] = [];
        for(let method in form.fieldValidate)
        {
          const error = form.fieldValidate[method];
          if(error !== "")
            errors.push(error);
        }
  
        const error_free = errors.length === 0;
        setApproved(error_free);
        setOk(error_free);
      
        return errors;
    };
    const changeText = (text:string) => {
        if(form !== undefined)
        {
            if(format_regex != null)
                text = format_str(text,format_regex.regex,format_regex.replace);
            
            form.setFormField(form.field,text);
        }

        if (text_state_setter != null)
            text_state_setter(text);

      setAttValue(text);
    }

    const async_fetch_from_storage = async () => {
      if (!get_value_from_storage?.get) return;
      
      try {
        const value = await ManageStorage.get_Async_Storage_Value(get_value_from_storage.item, get_value_from_storage.field);
        setStorageValue(value);
      }
      catch(err) {
        console.log(err);
      }
    };

    if (get_value_from_storage?.get && storageValue === "") {
      async_fetch_from_storage();
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
                  <Text>
                    {
                      getErrors().map((error, index) => (
                        <Text key={index} style={styles.error}>{error}  </Text>
                      ))
                    }
                  </Text>
                </View>  
            </View>
    );
}

export default FixInput;