import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { enviar } from "@/app/firebase/create_user";

import { useForm } from "@/app/conf/FixForm";
import InputContainer from "@/app/components/general_components/fix_Input/InputContainer";
import { cpf_replace, cpf_replace_regex } from "@/app/utils/regex";
import BB from "../../big_button/BB";

import LR_Props from "../../../../types/crud";

import styles from "../styles";

const Register: React.FC<LR_Props> = ({
  set = null,
  elements = null
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageTxt, setMessageTxt] = useState("");
  const [nav, setNav] = useState(false);

  const Form = useForm(["Nome", "Email", "CPF", "NúmeroRegistro", "Credencial", "Senha", "ConfSenha"], {
    Nome: [{ method: "required" }],
    Email: [{ method: "required" }, { method: "email" }],
    CPF: [{ method: "required" }, { method: "CPF" }],
    NúmeroRegistro: [{ method: "required" }],
    Credencial: [{ method: "required" }],
    Senha: [{ method: "required" }],
    ConfSenha: [{ method: "required" }],
  });

  const Form_content = Form.Values;
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
          <View style={styles.content}>
            <SafeAreaView style={styles.Inputs}>
              <ScrollView>
                <InputContainer
                  form={Form.FormProp("Nome")}
                  placeholder="Nome Completo"
                />
                <InputContainer
                  form={Form.FormProp("Email")}
                  placeholder="xxx@xxx.com"
                  keyboard_type="email-address"
                />
                <InputContainer
                  form={Form.FormProp("CPF")}
                  placeholder="xxx.xxx.xxx-xx"
                  keyboard_type="numeric"
                  format_regex={{
                    regex: cpf_replace_regex,
                    replace: cpf_replace,
                  }}
                />
                <InputContainer
                  form={Form.FormProp("NúmeroRegistro")}
                  el_text="Número de Registro"
                  placeholder="Seu número de registro na plataforma"
                  keyboard_type="numeric"
                  format_regex={{
                    regex: cpf_replace_regex,
                    replace: cpf_replace,
                  }}
                />
                <InputContainer
                  form={Form.FormProp("Credencial")}
                  placeholder="Suas credenciais específicas"
                  keyboard_type="numeric"
                  format_regex={{
                    regex: cpf_replace_regex,
                    replace: cpf_replace,
                  }}
                />
                <InputContainer
                  form={Form.FormProp("Senha")}
                  placeholder="Pelo menos 8 dígitos"
                />
                <InputContainer
                  form={Form.FormProp("ConfSenha")}
                  el_text="Confirmar Senha"
                  placeholder="As senhas devem coincidir"
                />

                <View
                    style={styles.btnContainer}
                >
                  <BB text="Voltar" width={200} margin={2} action={() => set(elements.Select)} />
                  <BB
                    text="Cadastrar"
                    width={200}
                    margin={2}
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
                
              </ScrollView>
            </SafeAreaView>
          </View>
      )}
    </>
  );
};

export default Register;
