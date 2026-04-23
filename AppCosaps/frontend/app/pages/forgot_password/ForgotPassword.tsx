import { FormState } from "@/app/conf/Form";
import { useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "@react-navigation/native";

import api from "@/app/api/api";
import BB from "@/app/components/crud_components/big_button/BB";
import InputContainer from "@/app/components/crud_components/input_container/InputContainer";
import styles_comp from "@/app/components/crud_components/login_registro/styles";
import styles from "./style";

const ForgotPassword: React.FC = () => {
  const [FP_Page, setFP_Page] = useState(0);
  const [code, setCode] = useState<string | null>("1234567");
  const navigation = useNavigation<NavigationProp>();
  const ForgotPassword_insert: React.FC = () => {
    const FormST = FormState([
      { field: "Email", validate: true },
      { field: "Code", validate: true },
    ]);

    const sendCode = async () => {
      if (FormST.Form.Email.field === "" || FormST.Validated.Email === false)
        return;

      setCode("1234567");
    };

    const confirmCode = (entry: string) => {
      if (FormST.FormValidated() && entry == code) setFP_Page(1);
    };

    const Button1 = () => <BB text="Enviar" margin={10} action={sendCode} />;
    const Button2 = () => (
      <BB
        text="Confirmar código"
        margin={10}
        action={confirmCode.bind(this, FormST.Form.Code.field)}
      />
    );

    return (
      <View style={styles_comp.content}>
        <View style={styles_comp.Inputs}>
          <InputContainer
            form={FormST.FormProp("Email", ["email", "required"])}
            placeholder="Email da sua conta"
            extra_component={Button1}
          />
          <InputContainer
            form={FormST.FormProp("Code", ["min", "equal"], code as string, 7)}
            placeholder="xxx-xxx-xxx-xxx"
            extra_component={Button2}
            show_errors={false}
          />
        </View>
      </View>
    );
  };

  const ForgotPassword_validate: React.FC = () => {
    const FormPST = FormState([
      { field: "newPswd", validate: true },
      { field: "ConfNewPswd", validate: true },
    ]);

    const update_password = () => {
      console.log("Formulário validado: ", FormPST.FormValidated());

      if (!FormPST.FormValidated()) return;

      api
        .alterar_senha({
          body: {
            email: FormPST.Form.Email.field,
            novaSenha: FormPST.Form.newPswd.field,
          },
        })
        .then((res) => {
          console.log(res);
        });

      navigation.navigate("CRUD");
    };

    return (
      <View style={styles_comp.content}>
        <View style={styles_comp.Inputs}>
          <InputContainer
            form={FormPST.FormProp(
              "newPswd",
              ["required", "min"],
              undefined,
              8,
            )}
            el_text="Nova Senha"
            placeholder="Pelo menos 8 dígitos"
            height={"20%"}
          />
          <InputContainer
            form={FormPST.FormProp(
              "ConfNewPswd",
              ["equal"],
              FormPST.Form.newPswd.field,
            )}
            el_text="Confirmar Senha"
            placeholder="As senhas devem coincidir"
            height={"20%"}
          />
        </View>
        <BB text="Alterar Senha" margin={10} action={update_password} />
      </View>
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.imgHeader}
          source={require("../../../assets/images/UFJF_extension_log_transparent.png")}
        />

        {FP_Page === 0 && <ForgotPassword_insert />}
        {FP_Page === 1 && <ForgotPassword_validate />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ForgotPassword;
