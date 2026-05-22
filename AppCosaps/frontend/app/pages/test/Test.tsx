import { useForm } from '@/app/conf/FixForm';
import useValidateForm  from '../../conf/ValidateForm';
import { Fields, validate } from '../../types/form';
import { View, Text } from 'react-native';

const Test = () => {
  const Fields: Fields = {
    "Nome": "Nome",
    "Email": "teste@teste.com",
    "CPF": "104.209.296-65",
    "Senha": "dmasdmakssda",
  }
  const methods: { [key: keyof Fields]: validate[] } = {
    "Nome": [{ method: "required"}],
    "Email": [{ method: "email" }],
    "CPF": [{ method: "CPF" }],
    "Senha": [{ method: "min", param: 8 }],
  };
 
  const { ValidateForm } = useValidateForm(Fields, methods);
  console.log(ValidateForm());
  return (
    <View>
    </View>
  );
};

export default Test;
