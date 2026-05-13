import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, View } from "react-native";

import { FormState } from "@/app/conf/Form";
import { enviar } from "@/app/firebase/create_user";
import { cpf_replace, cpf_replace_regex, MmN8d, MmNCE8d, MmNCE12d, MmNCE16d } from "@/app/utils/regex";
import BB from "../../big_button/BB";

import InputContainer from "../../input_container/InputContainer";
import styles from "../styles";

import LR_Props from "../../../../types/crud";

const Register: React.FC<LR_Props> = ({
  set = null,
  elements = null,
}) => {
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

  const passwordStrength = (password: string) => {
    if (MmNCE16d().test(password))
      return <View style={styles.passwordStrength}>
                <Text style={{ color: "darkgreen", fontSize:18, alignSelf: "center"}}>Forte</Text>
              </View>
    if (MmNCE12d().test(password))
      return <View style={styles.passwordStrength}>
                <Text style={{ color: "yellow", fontSize:18, alignSelf: "center"}}>Média</Text>
              </View>
    if (MmN8d().test(password))
      return <View style={styles.passwordStrength}>
                <Text style={{ color: "darkred", fontSize:18, alignSelf: "center"}}>Fraca</Text>
              </View>

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
              form={FormST.FormProp("Senha", ["regex", "required"], undefined, MmN8d())}
              placeholder="8 dígitos, letras minúsculas, maiúsculas e números"
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
              {passwordStrength(Form_content.Senha.field)}
          </View>
          <View
              style={styles.btnContainer}
          >
            <BB text="Voltar" width={150} action={() => set(elements.Select)} />
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
