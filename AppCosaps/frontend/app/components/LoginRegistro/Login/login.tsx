import React from "react";
import { FormState } from "@/app/conf/Form";

import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/app/types/navigation";

import { Text, TouchableOpacity, View } from "react-native";
import InputContainer from "../../InputContainer/InputContainer";
import BB from "../../Big_Button/BB";
import api from "@/app/api/api";

import styles from "../styles";

const login: React.FC = () => {
  const Form = FormState(["CPF", "Senha"] as const);
 
  const navigation = useNavigation<NavigationProp>();
  const forgotPassword = ()=>{

      return <TouchableOpacity onPress={()=>navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>
    }

    const enviar = ()=>{
      if(!Form.FormValidated())
        return;
      
      try{
          api.login({
          body:{CPF:Form.Form.CPF,senha:Form.Form.Senha}
        }).then(res => {
          console.log(res);
          navigation.navigate("MainPage");
        });
        }
      catch(err)
      {

      }
      
    }
    
    return(
      <View style={styles.content}>
        <View style={styles.Inputs}>

          <InputContainer
            form={Form.FormProp("CPF",["CPF"])}
            placeholder="xxx.xxx.xxx-xx"
            height={"15%"}
          />
          <InputContainer
              form={Form.FormProp("Senha",["min"],undefined,8)}
              placeholder="Senha da sua conta"
              height={"15%"}
              extraComponent={forgotPassword}
            />
        </View>
        <BB text="Login" action={enviar} />
      </View>
    )
}

export default login;
