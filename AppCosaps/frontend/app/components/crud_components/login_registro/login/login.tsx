import { FormState } from "@/app/conf/Form";
import { Text, TouchableOpacity, View } from "react-native";
import React, {useState, useEffect} from "react";
import { NavigationProp } from "@/app/types/navigation";
import { useNavigation } from "@react-navigation/native";
import BB from "../../big_button/BB";
import InputContainer from "../../input_container/InputContainer";
import LR_Props from "../../../../types/crud";
import ManageStorage from "@/app/conf/AsyncStorage";
import Checkbox from "../../checkbox/Checkbox";

import {
    getAuth,
    signInWithEmailAndPassword,
} from "@react-native-firebase/auth";

import styles from "../styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login: React.FC<LR_Props> = ({
  set = null,
  elements = null,
}) => {
  const Form = FormState([
    { field: "Email", validate: true },
    { field: "Senha", validate: true },
  ] as const);

  const [checked, setChecked] = useState(false);
  const [loginInfo, setLoginInfo] = useState<{ email: string; senha: string }>({ email: "", senha: "" });
  
  const Form_content = Form.Form;
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    AsyncStorage.getItem("LoginInfo").then((value) => {
      if (value !== null) {
        setLoginInfo(JSON.parse(value));
      }
    });
    AsyncStorage.getItem("StoreInfo").then((value) => {
      if (value !== null) {
        if (value === "true") {
          setChecked(value === "true");          
        }
        else {
          setChecked(false);
          AsyncStorage.removeItem("LoginInfo");
        }
      }
    });
    
  }, []);
  
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
        ManageStorage.Save_In_Async_Storage("StoreInfo", checked.toString());
        ManageStorage.Save_In_Async_Storage("LoginInfo", JSON.stringify(
          { email: Form_content.Email.field, senha: Form_content.Senha.field })
        )
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
          form={Form.FormProp("Email", ["email"])}
          get_value_from_storage={{get:checked, item: "LoginInfo", field: "email"}}
          placeholder=""
          height={"15%"}
        />
        <InputContainer
          form={Form.FormProp("Senha", ["min"], undefined, 8)}
          get_value_from_storage={{get:checked, item: "LoginInfo", field: "senha"}}
          placeholder="Senha da sua conta"
          height={"15%"}
          extra_component={forgotPassword}
        />
        <Checkbox txt="Salvar informações" StorageItem="StoreInfo" checked={checked} setChecked={setChecked} />
      </View>
      <View
          style={styles.btnContainer}
      >
        <BB text="Voltar" width={150} action={() => set(elements.Select)} />
        <BB text="Login" width={150} action={enviar} />
      </View>
    </View>
  );
};

export default Login;
