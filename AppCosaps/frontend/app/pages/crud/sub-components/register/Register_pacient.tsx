import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, View } from "react-native";

import { useForm } from "@/app/hooks/form/FixForm";
import InputContainer from "@/app/components/main_components/InputContainer/InputContainer";

import { enviar } from "@/app/firebase/create_user";
import { cpf_replace, cpf_replace_regex, MmN8d, MmNCE8d, MmNCE12d, MmNCE16d } from "@/app/utils/regex";
import BB from "../../../../components/main_components/big_button/BB";

import styles from "../styles";

import LR_Props from "../../../../types/crud";

const Register: React.FC<LR_Props> = ({
  set = null,
  elements = null,
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [nav, setNav] = useState(false);
  const [messageTxt, setMessageTxt] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const Form = useForm(["Nome", "Email", "CPF", "Senha", "ConfSenha"], {
    Nome: [{method:"required"}],
    Email: [{method:"required"},{method:"email"}],
    CPF: [{method:"required"},{method:"CPF"}],
    Senha: [{method:"required"},{method:"regex", param: MmN8d()}],
    ConfSenha: [{method:"required"},{method:"equal", param: "Senha"}],
  });
  
  const Form_content = Form.Values;
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
    if (MmNCE8d().test(password))
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
              form={Form.FormProp("Nome")}
              placeholder="Nome Completo"
              margin_top={"10%"}
              show_errors={showErrors}
            />
            <InputContainer
              form={Form.FormProp("Email")}
              placeholder="xxx@xxx.com"
              show_errors={showErrors}
            />
            <InputContainer
              form={Form.FormProp("CPF")}
              placeholder="xxx.xxx.xxx-xx"
              keyboard_type="numeric"
              format_regex={{ regex: cpf_replace_regex, replace: cpf_replace }}
              show_errors={showErrors}
            />
            <InputContainer
              form={Form.FormProp("Senha")}
              placeholder="8 dígitos, letras minúsculas, maiúsculas e números"
              secureTextEntry={true}
              show_errors={showErrors}
            />
            <InputContainer
              form={Form.FormProp("ConfSenha")}
              el_text="Confirmar Senha"
              placeholder="As senhas devem coincidir"
              secureTextEntry={true}
              show_errors={showErrors}
            />
              {passwordStrength(Form_content.Senha)}
              <View
                  style={styles.btnContainer}
              >
                <BB text="Voltar" width={150} action={() => set(elements.Select)} />
                <BB
                  text="Cadastrar"
                  width={150}
                  action={() =>
                    enviar(
                      Form.getFormValidated(),
                      Form_content.Email,
                      Form_content.Senha,
                      setShowMessage,
                      setNav,
                      setMessageTxt,
                    )
                  }
                />
              </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Register;
