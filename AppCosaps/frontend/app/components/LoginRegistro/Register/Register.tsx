import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import {NavigationProp} from "@/app/types/navigation";

import {FormState} from "@/app/conf/Form";
import { View, Text } from "react-native";
import InputContainer from "../../InputContainer/InputContainer";
import BB from "../../Big_Button/BB";
import styles from "../styles";
import api from "@/app/api/api";

const register: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageTxt, setMessageTxt] = useState("");
  const FormST= FormState(["Nome", "Email", "CPF", "Senha", "ConfSenha"] as const) ;
  const navigation = useNavigation<NavigationProp>();

  const enviar = async() => {
    console.log("Rodando agora: ");
    await api.cadastrar({
        body:{nome:FormST.Form.Nome,email:FormST.Form.Email,CPF:FormST.Form.CPF,senha:FormST.Form.Senha}
      }).then(res => {
        console.log(res);
        setShowMessage(true);
        setMessageTxt("Cadastro realizado com sucesso!");
      });
    
  };

  const message = (txt:string) => {
    setTimeout(() => {
      setShowMessage(false);
      navigation.navigate("MainPage");
    }, 2000)


    return(
      <View>
        <Text>{txt}</Text>
      </View>
    )
  }

  const CRUD_Content = (FormST:any)=>{
    return(
      <View style={styles.content}>
        <View style={styles.Inputs}>
          <InputContainer
            form={FormST.FormProp("Nome","required")}
            placeholder="Nome Completo"
          />
          <InputContainer
            form={FormST.FormProp("Email","email")}
            placeholder="xxx@xxx.com"
          />
          <InputContainer
            form={FormST.FormProp("CPF","CPF")}
            placeholder="xxx.xxx.xxx-xx"
          />
          <InputContainer
            form={FormST.FormProp("Senha","min",undefined,8)}
            placeholder="Pelo menos 8 dígitos"
          />
          <InputContainer
            form={FormST.FormProp("ConfSenha","equal",FormST.Form.Senha)}
            placeholder="As senhas devem coincidir"
          />
        </View>
      <BB text="Registrar" margin={15} action={enviar}/>
    </View>
    )
  }

  return (
    <>
    {showMessage ? message("Cadastro realizado com sucesso") : CRUD_Content(FormST)}
    </>
  );
};

export default register;
