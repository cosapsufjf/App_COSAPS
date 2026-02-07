import {FormState} from "@/app/conf/Form";
import { Text, TouchableOpacity, View } from "react-native";
import InputContainer from "../../InputContainer/InputContainer";
import styles from "../styles";

const register: React.FC = () => {

  const {Form, setField, resetForm} = FormState(
    ["Nome", "Email", "CPF", "Senha"]);


  const enviar = () => {
    console.log(Form);
  };

  return (
    <View style={styles.content}>
      <View style={styles.Inputs}>
        <InputContainer
          setFormField={setField}
          field="Nome"
          placeholder="Nome Completo"
        />
        <InputContainer
          setFormField={setField}
          field="Email"
          placeholder="Email"
        />
        <InputContainer
          setFormField={setField}
          field="CPF"
          placeholder="xxx.xxx.xxx-xx"
        />
        <InputContainer
          setFormField={setField}
          field="Senha"
          placeholder="Senha da sua conta"
        />
      </View>
      <View>
        <TouchableOpacity style={styles.btn} onPress={enviar}>
          <Text style={styles.Text}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default register;
