import { FormState } from "@/app/conf/Form";
import React from "react";

import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "@react-navigation/native";

import { Text, TouchableOpacity, View } from "react-native";
import BB from "../../big_button/BB";
import InputContainer from "../../input_container/InputContainer";

import {
    getAuth,
    signInWithEmailAndPassword,
} from "@react-native-firebase/auth";

import LR_Props from "../props";
import Select from "../select_lr/select";
import styles from "../styles";
const login: React.FC<LR_Props> = ({ set = null }) => {
  const Form = FormState([
    { field: "Email", validate: true },
    { field: "Senha", validate: true },
  ] as const);
  
  const Form_content = Form.Form;
  const navigation = useNavigation<NavigationProp>();
  const forgotPassword = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>
    );
  };

  const enviar = () => {
    if (!Form.FormValidated()) return;

    signInWithEmailAndPassword(
      getAuth(),
      Form_content.Email.field,
      Form_content.Senha.field,
    )
      .then(() => {
        navigation.navigate("MainPage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.content}>
      <View style={styles.Inputs}>
        <InputContainer
          //TODO: ALTERAR PARA CPF, EMAIL APENAS PARA TESTE FIREBASE
          form={Form.FormProp("Email", ["email"])}
          placeholder=""
          height={"15%"}
        />
        <InputContainer
          form={Form.FormProp("Senha", ["min"], undefined, 8)}
          placeholder="Senha da sua conta"
          height={"15%"}
          extra_component={forgotPassword}
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
        <BB text="Login" width={150} action={enviar} />
      </View>
    </View>
  );
};

export default login;
