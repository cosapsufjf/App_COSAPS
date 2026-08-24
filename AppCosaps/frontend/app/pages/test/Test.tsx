import { useState,useEffect } from 'react';

import { useForm } from '@/app/hooks/form/FixForm';
import FixInput from '@/app/components/main_components/InputContainer/InputContainer';
import { Fields, validate } from '../../types/form';
import { View, TextInput, Button } from 'react-native';
import BB from '@/app/components/main_components/big_button/BB';
import { cpf_replace, cpf_replace_regex } from '@/app/utils/regex';
const Test = () => {
  const Fields = ["Nome", "Email", "CPF", "Senha"];
  const [ShowErrors, setShowErrors] = useState(false);
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

  const Enviar = () => {
    if(Form.getFormValidated()) {
      setShowErrors(false);
    }
    else {
      setShowErrors(true);
    }
  }
  
  return (
    <View style={{
      backgroundColor: 'black', justifyContent: 'center',
      alignItems: 'center', height: 850
    }}>
      <Button title="Submit" onPress={() => { }} />
      
      <FixInput form={Form.FormProp("Nome")}
        placeholder="Nome Completo"
        margin_top={"10%"}
        show_errors={ShowErrors}
      />
      <FixInput form={Form.FormProp("Email")}
        placeholder="Email"
        margin_top={"10%"}
        show_errors={ShowErrors}
      />
      <FixInput form={Form.FormProp("CPF")}
        placeholder="CPF"
        margin_top={"10%"}
        format_regex={{ regex: cpf_replace_regex, replace: cpf_replace }}
        show_errors={ShowErrors}
      />
      <FixInput form={Form.FormProp("Senha")}
        placeholder="Senha"
        margin_top={"10%"}
        show_errors={ShowErrors}
      />
      <BB text='Enviar' action={Enviar}/>
    </View>
  );
};

export default Test;
