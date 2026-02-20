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
import RandomCode from "@/app/utils/RCG";
import { sendEmail } from "@/app/utils/EmailSender";
import api from "@/app/api/api";
import { Validation_Methods, ValidationMethodKey } from "@/app/types/form";

const ForgotPassword: React.FC = () => {
  const [FP_Page, setFP_Page] = useState(0);
  const [code, setCode] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const ForgotPassword_insert: React.FC = () => {
    const FormST = FormState(["Email", "Code"]);

    const update_password = () => {
      api.alterar_senha({
        body:{email:FormST.Form.Email,novaSenha:FormST.Form.newPswd}
      }).then(res => {
        console.log(res);
      })
    }

    const sendCode = async () => {
      setCode(RandomCode());
      try{
        await sendEmail(
        FormST.Form.Email,
        "Recuperação de senha",
        `O seu codigo de verificação é: ${code}`,
      );
      }
      catch(err)
      {

      }
      
    };

    const confirmCode = (entry: string)=>{
      console.log("????",FormST.FormValidated());
      if(FormST.FormValidated())
      {
        if(entry === code)
          setFP_Page(1);
      }
      console.log("rodou!!, entry: "+entry);
      }

    const Button1 = () => (
      <BB text="Enviar" margin={10} action={()=>setCode("12345678")}/>
    );
    const Button2 = () => (
      <BB
        text="Confirmar código"
        margin={10}
        action={confirmCode.bind(this, FormST.Form.Code)}
      />
    );

    return (
      <View style={styles_comp.content}>
        <View style={styles_comp.Inputs}>
          <InputContainer
            form={FormST.FormProp("Email", ["email","required"])}
            placeholder="Email da sua conta"
            extraComponent={Button1}
          />
          <InputContainer
            form={FormST.FormProp("Code", ["min"], undefined, 6)}
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
            form={FormST.FormProp("newPswd", ["required","min"], undefined, 8)}
            ElText="Nova Senha"
            placeholder="Pelo menos 8 dígitos"
            height={"20%"}
          />
          <InputContainer
            form={FormST.FormProp("ConfNewPswd", ["equal"], FormST.Form.newPswd)}
            ElText="Confirmar Senha"
            placeholder="As senhas devem coincidir"
            height={"20%"}
          />
        </View>
        <BB text="Alterar Senha" margin={10} action={() => navigation.navigate("CRUD")}/>
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