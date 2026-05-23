import { useEffect } from 'react';

import { useForm } from '@/app/conf/FixForm';
import FixInput from '@/app/components/general_components/fix_Input/Fix_Input';
import { Fields, validate } from '../../types/form';
import { View, TextInput, Button } from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const Test = () => {
  const Fields = ["Nome", "Email", "CPF", "Senha"];
  const methods: { [key: keyof Fields]: validate[] } = {
    "Nome": [{ method: "required"},{ method: "email"},{ method: "min", param: 32}],
    "Email":[{ method: "email" }],
    "CPF":  [{ method: "CPF" }],
    "Senha":[{ method: "min", param: 8 }],
  };
  
  const Form = useForm(Fields, methods);

  useEffect(() => {
    console.log(Form.Values)
    console.log(Form.getFormValidationState())
  }, [Form]);
  
  return (
    <View style={{
      backgroundColor: 'black', justifyContent: 'center',
      alignItems: 'center', height: 850
    }}>
      <Button title="Submit" onPress={() => { }} />
      
      <FixInput form={Form.FormProp("Nome")}
        placeholder="Nome Completo"
        margin_top={"10%"} />
    </View>
  );
};

export default Test;
