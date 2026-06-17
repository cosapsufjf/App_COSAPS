import { View, Text, KeyboardTypeOptions, KeyboardAvoidingView, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

import { format_str } from "@/app/utils/regex";
import style from "./styles";
import { Colors as colors } from "../../../MainStyle";
import ManageStorage from "@/app/conf/AsyncStorage";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FormProps } from "@/app/types/form";

interface InputContainerProps {
    form?: FormProps,
    get_value_from_storage?: {get: boolean, item: string, field: string},

    extra_component?: any,
    inline_extra_component?: boolean,
    format_regex?:{regex:RegExp,replace:string},
    text_state_setter?: React.Dispatch<React.SetStateAction<string>> | null,

    keyboard_type?: KeyboardTypeOptions,
    secureTextEntry?: boolean,

    show_errors?: boolean,
    el_text?:string,
    placeholder?:string,
    
    width?:number | string,
    height?:number | string,
    margin?:number | string,
    margin_top?:number | string,
    background_color?: string,
    position?: string,
    bottom?: number | string,
}

  const InputContainer : React.FC<InputContainerProps> = (
    {
      form,
      get_value_from_storage=null,
      el_text=null, 
      placeholder = "",
      
      inline_extra_component = false,
      extra_component = null,
      
      format_regex=null,
      keyboard_type = "default",
      secureTextEntry = false,
      background_color=colors.Fundo_Claro_1,
      show_errors=false,
      text_state_setter = null,

      width = "100%",
      height= "10%",
      position = "relative",
      bottom = 0,
      margin=0,
      margin_top=0,
    }
) => {

    const [storageValue, setStorageValue] = useState<string>("");
    const [approved, setApproved] = useState(false);
    const [attValue, setAttValue] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    
    const styles = style(width,height,margin,margin_top,background_color,approved,position,bottom);

    
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

    useEffect(() => {
      const async_fetch_from_storage = async () => {
        if (!get_value_from_storage?.get) return;
        
        try {
          const value = await ManageStorage.get_Async_Storage_Value(get_value_from_storage.item, get_value_from_storage.field);
          setStorageValue(value);
          changeText(value);
        }
        catch(err) {
          console.log(err);
        }
      };
  
      if (get_value_from_storage?.get && storageValue === "") {
        async_fetch_from_storage();
      }
    })
    
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.Text}>{el_text??form?.field}</Text>
        <View style={[styles.container, {flexDirection: "row"}]}>
          <TextInput style={styles.TextInput}
            secureTextEntry={showPassword}
            keyboardType={keyboard_type} 
            onChangeText={(text:string)=>changeText(text)}
            value={attValue}
            placeholder={placeholder} 
            placeholderTextColor={"gray"}
          />
          {inline_extra_component && extra_component && extra_component()}
          {
            secureTextEntry &&
            <MaterialCommunityIcons name={showPassword ? "eye" : "eye-off"} style={styles.eye_icon} size={24} onPress={() => setShowPassword(!showPassword)} />
          } 
        </View>
        {!inline_extra_component && extra_component && extra_component()}
        {
          show_errors ?
          <View style={styles.ErrorMessage}>
            <Text>
            {
              getErrors().map((error, index) => (
                <Text key={index} style={styles.error}>{error}  </Text>
              ))
            }
            </Text>
            </View>
            : null
        }

      </KeyboardAvoidingView>
    );
}

export default InputContainer;