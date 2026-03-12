import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Platform, Text, View } from "react-native";

import api from "@/app/api/api";
import {getAuth, createUserWithEmailAndPassword} from "@react-native-firebase/auth";

import { FormState } from "@/app/conf/Form";
import { cpf_replace, cpf_replace_regex } from "@/app/utils/regex";
import BB from "../../Big_Button/BB";
import InputContainer from "../../InputContainer/InputContainer";
import LR_Props from "../props";
import Select from "../SelectLR/select";
import styles from "../styles";

const register: React.FC<LR_Props> = ({ set = null }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [nav, setNav] = useState(false);
  const [messageTxt, setMessageTxt] = useState("");
  const FormST = FormState([
    {field:"Nome",validate:false},
    {field:"Email",validate:true},
    {field:"CPF",validate:true},
    {field:"Senha",validate:true},
    {field:"ConfSenha",validate:true},
  ] as const);

  const Form_content = FormST.Form;
  const navigation = useNavigation<NavigationProp>();

  const enviar = async () => {
    console.log("Formulário validado: ", FormST.FormValidated());

    if (!FormST.FormValidated()) {
      console.log("uai?");
      setShowMessage(true);
      setNav(false);
      setMessageTxt("Preencha todos os campos!");
      return;
    }
    else{
      createUserWithEmailAndPassword(getAuth(),Form_content.Email.field, Form_content.Senha.field)
      .then(()=>{
        setShowMessage(true);
        setNav(true);
        setMessageTxt("Cadastro realizado com sucesso!");
      })
      .catch((err)=>console.log(err));
    }
    // else{
    //   try {
    //     await api
    //         .cadastrar({
    //           body: {
    //             nome: Form_content.Nome.field,
    //             email: Form_content.Email.field,
    //             CPF: Form_content.CPF.field,
    //             senha: Form_content.Senha.field,
    //           },
    //         })
    //         .then((res) => {
    //           console.log(res);
    //           FormST.resetForm();
    //           setShowMessage(true);
    //           setNav(true);
    //           setMessageTxt("Cadastro realizado com sucesso!");
    //         });
    //         } 
    //   catch (err) {}
    // }
  };

  const message = (txt: string, navigate_to?: boolean) => {
    setTimeout(() => {
      setShowMessage(false);
      if(navigate_to)
        navigation.navigate("MainPage");
    }, 2000);

    return (
      <View>
        <Text>{txt}</Text>
      </View>
    );
  };

  return (
    <>
      {showMessage ? (
        message(messageTxt, nav)
      ) : (
        <View style={styles.content}>
          <View style={styles.Inputs}>
            <InputContainer
              form={FormST.FormProp("Nome")}
              placeholder="Nome Completo"
              margin_top={"10%"}
            />
            <InputContainer
              form={FormST.FormProp("Email", ["email", "required"])}
              placeholder="xxx@xxx.com"
              keyboard_type="email-address"
            />
            <InputContainer
              form={FormST.FormProp("CPF", ["CPF", "required"])}
              placeholder="xxx.xxx.xxx-xx"
              keyboard_type="numeric"
              format_regex={{ regex: cpf_replace_regex, replace: cpf_replace }}
            />
            <InputContainer
              form={FormST.FormProp("Senha", ["min", "required"], undefined, 8)}
              placeholder="Pelo menos 8 dígitos"
            />
            <InputContainer
              form={FormST.FormProp(
                "ConfSenha",
                ["equal", "required"],
                Form_content.Senha.field,
              )}
              el_text="Confirmar Senha"
              placeholder="As senhas devem coincidir"
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <BB text="Voltar" width={150} action={() => set(Select)} />
            <BB text="Cadastrar" width={150} action={enviar} />
          </View>
        </View>
      )}
    </>
  );
};

export default register;
