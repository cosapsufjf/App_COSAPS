import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { enviar } from "@/app/firebase/create_user";

import { FormState } from "@/app/conf/Form";
import { cpf_replace, cpf_replace_regex } from "@/app/utils/regex";
import BB from "../../big_button/BB";
import InputContainer from "../../input_container/InputContainer";
import LR_Props from "../props";
import Select from "../select_lr/select";
import styles from "../styles";

const register: React.FC<LR_Props> = ({ set = null }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageTxt, setMessageTxt] = useState("");
  const [nav, setNav] = useState(false);

  const FormST = FormState([
    { field: "Nome", validate: true },
    { field: "Email", validate: true },
    { field: "CPF", validate: true },
    { field: "NúmeroRegistro", validate: true },
    { field: "Credencial", validate: true },
    { field: "Senha", validate: true },
    { field: "ConfSenha", validate: true },
  ] as const);

  const Form_content = FormST.Form;
  const navigation = useNavigation<NavigationProp>();

  const message = (txt: string) => {
    setTimeout(() => {
      setShowMessage(false);
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
        message("Cadastro realizado com sucesso")
      ) : (
        <SafeAreaProvider>
          <SafeAreaView style={styles.content}>
            <SafeAreaView style={styles.Inputs}>
              <ScrollView>
                <InputContainer
                  form={FormST.FormProp("Nome", ["required"])}
                  placeholder="Nome Completo"
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
                  format_regex={{
                    regex: cpf_replace_regex,
                    replace: cpf_replace,
                  }}
                />
                <InputContainer
                  form={FormST.FormProp("NúmeroRegistro", ["required"])}
                  el_text="Número de Registro"
                  placeholder="Seu número de registro na plataforma"
                  keyboard_type="numeric"
                  format_regex={{
                    regex: cpf_replace_regex,
                    replace: cpf_replace,
                  }}
                />
                <InputContainer
                  form={FormST.FormProp("Credencial", ["required"])}
                  placeholder="Suas credenciais específicas"
                  keyboard_type="numeric"
                  format_regex={{
                    regex: cpf_replace_regex,
                    replace: cpf_replace,
                  }}
                />
                <InputContainer
                  form={FormST.FormProp(
                    "Senha",
                    ["min", "required"],
                    undefined,
                    8,
                  )}
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
              </ScrollView>
            </SafeAreaView>
            <SafeAreaView
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <BB text="Voltar" width={150} action={() => set(Select)} />
              <BB
                text="Cadastrar"
                width={150}
                action={() =>
                  enviar(
                    FormST.FormValidated(),
                    Form_content.CPF.field,
                    Form_content.Email.field,
                    setShowMessage,
                    setNav,
                    setMessageTxt,
                  )
                }
              />
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaProvider>
      )}
    </>
  );
};

export default register;
