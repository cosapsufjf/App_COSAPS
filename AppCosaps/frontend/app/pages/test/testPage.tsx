import InputContainer from "@/app/components/crud_components/input_container/InputContainer";
import FormState from "@/app/conf/Form";
import { cpf_replace, cpf_replace_regex } from "@/app/utils/regex";
import { Button, StyleSheet, View } from "react-native";
const style = StyleSheet.create({
  center: {
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "green",
  },
});

const TestPage: React.FC = () => {
  const testForm = FormState(["Teste"] as const);

  return (
    <View style={style.center}>
      <InputContainer
        form={testForm.FormProp("Teste", ["required", "min"], undefined, 8)}
        placeholder="testando"
        keyboard_type="numeric"
        format_regex={{ regex: cpf_replace_regex, replace: cpf_replace }}
      />
      <Button title="testar" onPress={() => console.log(testForm.Form)} />
    </View>
  );
};

export default TestPage;
