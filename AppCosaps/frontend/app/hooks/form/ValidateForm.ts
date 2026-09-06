import { ValidationMethodKey, Validation_Methods,Fields, validate, ValidationState } from '@/app/types/form';
import validateCPF from "@/app/utils/cpfValidator";
import { cpf_regex, emailRegex, PhoneRegex } from "@/app/utils/regex";


const test_string = (error_message: string) => {
  return {
    func: (value: string) => {
      try {
        return value.length > 0;
      } catch(e) {
        console.error(e);
        return false;
      }
    },
    error: error_message,
  };
}
const test_regex = (regex: RegExp,error_message: string) => {
  return {
    func: (value: string) => {
      try {
        return regex.test(value);
      } catch {
        return false;
      }
    },
    error: error_message,
  };
}
const test_cpf = (error_message: string) => {
  return {
    func: (value: string) => {
      try {
        return cpf_regex.test(value) && validateCPF(value);
      } catch {
        return false;
      }
    },
    error: error_message,
  };
}
const test_compare_string = (error_message: string) => {
  return {
    func: (value1: string, value2: string) => {
      try {
        return value1.trim() === value2.trim();
      } catch {
        return false;
      }
    },
    error: error_message,
  };
}
const test_compare_value = (error_message: string, type: "leq" | "geq") => {
  return {
    func: (value: string, number: number) => {
      try {
        return type === "leq" ? value.length <= number : value.length >= number;
      } catch {
        return false;
      }
    },
    error: error_message,
  };
}

const useValidateForm = (fields: Fields, methods: { [key: keyof Fields]: validate[] }) => {
  const METHODS: Validation_Methods = {
    min: test_compare_value("Caracteres insuficientes", "geq"),
    max: test_compare_value("Caracteres Excedentes", "leq"),
    equal: test_compare_string("Os campos devem ser iguais"),
    required: test_string("Campo obrigatório"),
    email: test_regex(emailRegex,"Email inválido"),
    tel: test_regex(PhoneRegex,"Telefone inválido"),
    CPF: test_cpf("CPF inválido"),
    regex: (regex: RegExp) => test_regex(regex, "Regex inválido"),
  };

  
  const ValidateMethod = (method: ValidationMethodKey, field_name: string, param: number | RegExp | string) => {
    const value_validate = fields[field_name];

    switch(method) {
      case "equal":
        return METHODS[method].func(value_validate, fields[param as string]);
      case "regex":
        return METHODS[method](param as RegExp).func(value_validate);
      default:
        return (method !== "min" && method !== "max")
            ?
            METHODS[method].func(value_validate)
            :
            METHODS[method].func(value_validate, param as never);
    }
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
          //se der erro atribui o log de erro no método referente
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
        if (form_validated[field][method] !== "") return false;
    
    return true;
  }
  
  return {ValidateFormFields, ValidateForm};
};


export default useValidateForm;