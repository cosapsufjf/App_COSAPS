import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import InputContainer from "../../InputContainer/InputContainer";
import styles from "../styles";

const login: React.FC = () => {
  const [Form, setForm] = useState({
    CPF: "",
    Senha: "",
  });

  const setFormField = (text: string, value: string) => {
    setForm({
      ...Form,
      [text]: value,
    });
  };

  return (
    <View style={styles.content}>
      <View style={styles.Inputs}>
        <InputContainer
          setFormField={setFormField}
          field="CPF"
          placeholder="xxx.xxx.xxx-xx"
        />
        <InputContainer
          setFormField={setFormField}
          field="Senha"
          placeholder="Senha da sua conta"
        />
      </View>
      <View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.Text}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default login;
