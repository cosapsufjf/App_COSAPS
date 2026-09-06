import { View, Text, KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

import { format_str } from "@/app/utils/regex";
import style from "./styles";
import { Colors as colors } from "../../../MainStyle";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { InputContainerProps } from "@/app/interfaces/input_container/InputContainerProps";

  const InputContainer : React.FC<InputContainerProps> = (
    {
      form,
      get_value_from_storage=null,
      el_text=null, 
      placeholder = "",
      value="",
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
    
    const changeText = (text: string) => {
      if (form !== undefined)
        {
            if(format_regex != null)
                text = format_str(text,format_regex.regex,format_regex.replace);
            
            form.setFormField(form.field, text);
            
        }

        if (text_state_setter != null)
            text_state_setter(text);
        
        setAttValue(text);
    }
    
    if(attValue === "" && value !== "")
        setAttValue(value);
    
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