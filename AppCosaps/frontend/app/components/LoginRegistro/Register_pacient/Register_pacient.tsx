import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import api from "@/app/api/api";
import { FormState } from "@/app/conf/Form";
import { cpf_replace, cpf_replace_regex } from "@/app/utils/regex";
import BB from "../../Big_Button/BB";
import InputContainer from "../../InputContainer/InputContainer";
import LR_Props from "../props";
import Select from "../SelectLR/select";
import styles from "../styles";

const register: React.FC<LR_Props> = ({ set = null }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageTxt, setMessageTxt] = useState("");
  const FormST = FormState([
    "Nome",
    "Email",
    "CPF",
    "Senha",
    "ConfSenha",
  ] as const);
  const navigation = useNavigation<NavigationProp>();

  const enviar = async () => {
    console.log("Formulário validado: ", FormST.FormValidated());

    if (!FormST.FormValidated()) {
      console.log("uai?");
      setShowMessage(true);
      setMessageTxt("Preencha todos os campos!");
      return;
    }
    else{
      try {
        await api
            .cadastrar({
              body: {
                nome: FormST.Form.Nome,
                email: FormST.Form.Email,
                CPF: FormST.Form.CPF,
                senha: FormST.Form.Senha,
              },
            })
            .then((res) => {
              console.log(res);
              FormST.resetForm();
              setShowMessage(true);
              setMessageTxt("Cadastro realizado com sucesso!");
            });
            } 
      catch (err) {}
    }
  };

  const message = (txt: string) => {
    setTimeout(() => {
      setShowMessage(false);
      //navigation.navigate("MainPage");
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
        message(messageTxt)
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
                FormST.Form.Senha,
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
