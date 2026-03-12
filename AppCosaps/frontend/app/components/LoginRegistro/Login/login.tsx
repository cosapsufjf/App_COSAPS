import React from "react";
import { FormState } from "@/app/conf/Form";

import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/app/types/navigation";

import { Text, TouchableOpacity, View } from "react-native";
import InputContainer from "../../InputContainer/InputContainer";
import BB from "../../Big_Button/BB";

import api from "@/app/api/api";
import { getAuth, signInWithEmailAndPassword } from "@react-native-firebase/auth";

import styles from "../styles";
import LR_Props from "../props";
import Select from "../SelectLR/select";
const login: React.FC<LR_Props> = (
  {
  set=null
}) => {
  const Form = FormState([{field:"Email",validate:true}, {field:"Senha", validate:true}] as const);
  const Form_content = Form.Form;
  const navigation = useNavigation<NavigationProp>();
  const forgotPassword = ()=>{

      return <TouchableOpacity onPress={()=>navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>
    }

    const enviar = ()=>{
      if(!Form.FormValidated())
        return;
      
      signInWithEmailAndPassword(getAuth(),Form_content.Email.field, Form_content.Senha.field)
      .then(()=>{
        navigation.navigate("MainPage");
      })
      .catch((err)=>{
        console.log(err);
      })

      // try{
      //     api.login({
      //     body:{CPF:Form_content.CPF.field,senha:Form_content.Senha.field}
      //   }).then(res => {
      //     console.log(res);
      //     navigation.navigate("MainPage");
      //   });
      //   }
      // catch(err)
      // {

      // }
      
    }
    
    return(
      <View style={styles.content}>
        <View style={styles.Inputs}>
          <InputContainer
          //TODO: ALTERAR PARA CPF, EMAIL APENAS PARA TESTE FIREBASE 
            form={Form.FormProp("Email",["email"])}
            placeholder=""
            height={"15%"}
          />
          <InputContainer
              form={Form.FormProp("Senha",["min"],undefined,8)}
              placeholder="Senha da sua conta"
              height={"15%"}
              extra_component={forgotPassword}
            />
        </View>
        <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between"}}>
          <BB text="Voltar" width={150} action={()=>set(Select)}/>
          <BB text="Login"  width={150}  action={enviar} />
        </View>
      </View>
    )
}

export default login;
