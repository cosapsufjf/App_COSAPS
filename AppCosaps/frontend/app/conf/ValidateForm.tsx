import { ValidationMethodKey, Validation_Methods,Fields, validate, ValidationState } from '../types/form';
import validateCPF from '../utils/cpfValidator';
import { cpf_regex, emailRegex, PhoneRegex } from '../utils/regex';


const useValidateForm = (fields: Fields, methods: { [key: keyof Fields]: validate[] }) => {
  const METHODS: Validation_Methods = {
    regex: {func: (value: string, regex: RegExp) => regex.test(value),error: "Formato inválido",},
    min: {func: (value: string, min: number) => value.length >= min,error: "Caracteres insuficientes",},
    max: {func: (value: string, max: number) => value.length <= max,error: "Caracteres Excedentes",},
    equal: { func: (value1: string, value2: string) => value1.trim() === value2.trim(), error: "Os campos devem ser iguais", },
    required: {func: (value: string) => value.length > 0,error: "Campo obrigatório",},
    email: { func: (value: string) => emailRegex.test(value), error: "Email inválido", },
    tel: {func: (value: string) => PhoneRegex.test(value),error: "Telefone inválido",},
    CPF: {func: (value: string) => cpf_regex.test(value) && validateCPF(value),error: "CPF inválido",},
  };

  
  const ValidateMethod = (method: ValidationMethodKey, field_name: string, param: number | RegExp | string
    ) => {
    const value_validate = fields[field_name];
      return (method !== "min" && method !== "max" && method !== "regex" && method !== "equal")
        ?
        METHODS[method].func(value_validate)
        :
        METHODS[method].func(value_validate, param as never);
    }
  
  const ValidateFormFields = (): ValidationState => {
    const size = Object.keys(fields).length;
    if (size === 0) return {};
    if (methods === null) return {};
    const validatedFields: ValidationState = {};
    
    for (const method in methods) {
      const field_name = method as keyof Fields;
      const method_list = methods[field_name];
      for (const m of method_list) {
        let validated_method = ValidateMethod(m.method, field_name, m.param);
        validatedFields[field_name] = {
          ...validatedFields[field_name],
          [m.method]: validated_method ? "" : METHODS[m.method].error
        };
      }
    }
    
    return validatedFields;
  };

  const ValidateForm = () => {
    const form_validated = ValidateFormFields();

    for (const field in form_validated)
      for (const method in form_validated[field])
        if (!form_validated[field][method]) return false;
    
    return true;
  }
  
  return {ValidateFormFields, ValidateForm};
};


export default useValidateForm;