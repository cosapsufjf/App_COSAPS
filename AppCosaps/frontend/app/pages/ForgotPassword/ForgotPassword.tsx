import { useState } from "react";
import { FormState } from "@/app/conf/Form";
import { Image, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/app/types/navigation";

import BB from "@/app/components/Big_Button/BB";
import InputContainer from "@/app/components/InputContainer/InputContainer";
import styles from "./style";
import styles_comp from "@/app/components/LoginRegistro/styles";
import { Validation_Methods } from "@/app/types/form";

const ForgotPassword: React.FC = () => {
  const [FP_Page, setFP_Page] = useState(0);
  const navigation = useNavigation<NavigationProp>();
  const ForgotPassword_insert: React.FC = () => {
    const Form1 = FormState(["Email", "Code"]);

    const Button1 = () => (
      <BB text="Enviar" height={"50%"} margin={10} action={() => void 0}/>
    );
    const Button2 = () => (
      <BB
        text="Confirmar código"
        height={"50%"}
        margin={10}
        action={()=>setFP_Page(1)}
      />
    );

    return (
      <View style={styles_comp.content}>
        <View style={styles_comp.Inputs}>
          <InputContainer
            form={Form1.FormProp("Email", "email")}
            placeholder="Email da sua conta"
            extraComponent={Button1}
          />
          <InputContainer
            form={Form1.FormProp("Code", "min", undefined, 6)}
            placeholder="xxx-xxx-xxx-xxx"
            extraComponent={Button2}
          />
        </View>
      </View>
    );
  };

  const ForgotPassword_validate: React.FC = () => {
    const FormST = FormState(["newPswd", "ConfNewPswd"]);

    return (
      <View style={styles_comp.content}>
        <View style={styles_comp.Inputs}>
          <InputContainer
            form={FormST.FormProp("newPswd", "min", undefined, 8)}
            placeholder="Pelo menos 8 dígitos"
            height={"20%"}
          />
          <InputContainer
            form={FormST.FormProp("ConfNewPswd", "equal", FormST.Form.newPswd)}
            placeholder="As senhas devem coincidir"
            height={"20%"}
          />
        </View>
        <BB text="Alterar Senha" height={"28%"} margin={10} action={() => navigation.navigate("CRUD")}/>
      </View>
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Image
          style = {styles.imgHeader}
          source= {require("../../../assets/img/UFJF_extension_log_transparent.png")}/>
        
        {FP_Page === 0 && <ForgotPassword_insert/>}
        {FP_Page === 1 && <ForgotPassword_validate/>}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ForgotPassword;