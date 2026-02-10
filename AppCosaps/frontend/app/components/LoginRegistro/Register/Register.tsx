import {FormState} from "@/app/conf/Form";
import { View } from "react-native";
import InputContainer from "../../InputContainer/InputContainer";
import BB from "../../Big_Button/BB";
import styles from "../styles";

const register: React.FC = () => {
const FormST= FormState(["Nome", "Email", "CPF", "Senha", "ConfSenha"] as const) ;

  const enviar = () => {
    console.log(FormST.Form);
  };

  return (
    <View style={styles.content}>
      <View style={styles.Inputs}>
        <InputContainer
          form={FormST.FormProp("Nome","required")}
          placeholder="Nome Completo"
        />
        <InputContainer
          form={FormST.FormProp("Email","email")}
          placeholder="xxx@xxx.com"
        />
        <InputContainer
          form={FormST.FormProp("CPF","CPF")}
          placeholder="xxx.xxx.xxx-xx"
        />
        <InputContainer
          form={FormST.FormProp("Senha","min",undefined,8)}
          placeholder="Pelo menos 8 dígitos"
        />
        <InputContainer
          form={FormST.FormProp("ConfSenha","equal",FormST.Form.Senha)}
          placeholder="As senhas devem coincidir"
        />
      </View>
      <BB text="Registrar" margin={15} action={enviar}/>
    </View>
  );
};

export default register;
