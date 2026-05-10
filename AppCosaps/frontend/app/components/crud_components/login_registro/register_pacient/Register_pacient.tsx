import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { FormState } from "@/app/conf/Form";
import { enviar } from "@/app/firebase/create_user";
import { cpf_replace, cpf_replace_regex } from "@/app/utils/regex";
import BB from "../../big_button/BB";
import InputContainer from "../../input_container/InputContainer";
import LR_Props from "../props";
import Select from "../select_lr/select";
import styles from "../styles";

const Register: React.FC<LR_Props> = ({ set = null }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [nav, setNav] = useState(false);
  const [messageTxt, setMessageTxt] = useState("");
  const FormST = FormState([
    { field: "Nome", validate: false },
    { field: "Email", validate: true },
    { field: "CPF", validate: true },
    { field: "Senha", validate: true },
    { field: "ConfSenha", validate: true },
  ] as const);

  const Form_content = FormST.Form;
  const navigation = useNavigation<NavigationProp>();

  const message = (txt: string, navigate_to?: boolean) => {
    setTimeout(() => {
      setShowMessage(false);
      if (navigate_to) navigation.navigate("MainPage");
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
            <BB
              text="Cadastrar"
              width={150}
              action={() =>
                enviar(
                  FormST.FormValidated(),
                  Form_content.Email.field,
                  Form_content.Senha.field,
                  setShowMessage,
                  setNav,
                  setMessageTxt,
                )
              }
            />
          </View>
        </View>
      )}
    </>
  );
};

export default Register;
