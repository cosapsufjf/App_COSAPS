import {
  FormFields,
  ValidatedFields,
  FormProps,
  Validation_Methods,
  ValidationMethodKey,
} from "@/app/types/form";
import { useState } from "react";

import validateCPF from "../utils/cpfValidator";
import { cpf_regex, emailRegex, PhoneRegex } from "../utils/regex";
//TODO: REESTRUTURAR COM REACT HOOK FORM

export const FormState = <T extends readonly {field: string, validate: boolean}[]>(
  initialStateFields: T,
) => {
  const InitialState = initialStateFields.reduce((acc, Field) => {
    acc[Field.field] = {field:"",validate: Field.validate};
    return acc;
  }, {} as FormFields);

  const InitialValidated = initialStateFields.reduce((acc, Field) => {
    acc[Field.field] = !Field.validate;
    return acc;
  }, {} as ValidatedFields);

  type Fields = T[number]["field"];
  const [Form, SetForm] = useState<FormFields>(InitialState);
  const [Validated, SetValidated] = useState<ValidatedFields>(InitialValidated);

  const setField = (campo: string, valor: string) => {
    SetForm({
      ...Form,
      [campo]: {field:valor,validate:Form[campo].validate},
    });
  };
  const setValidateField = (campo: string, valor: boolean) => {
    SetValidated(prev=>({...prev,[campo]:valor}));
  };

  const Methods: Validation_Methods = {
    required: {
      func: (value: string) => value.length > 0,
      error: "Campo obrigatório",
    },
    equal: {
      func: (value1: string, value2: string) => value1.trim() === value2.trim(),
      error: "Os campos devem ser iguais",
    },
    min: {
      func: (value: string, min: number) => value.length >= min,
      error: "Caracteres insuficientes",
    },
    max: {
      func: (value: string, max: number) => value.length <= max,
      error: "Caracteres Excedentes",
    },
    regex: {
      func: (value: string, regex: RegExp) => regex.test(value),
      error: "Formato inválido",
    },
    email: {
      func: (value: string) => emailRegex.test(value),
      error: "Email inválido",
    },
    tel: {
      func: (value: string) => PhoneRegex.test(value),
      error: "Telefone inválido",
    },
    CPF: {
      func: (value: string) => cpf_regex.test(value) && validateCPF(value),
      error: "CPF inválido",
    },
  };

  const ValidateMethod = (
    method: keyof Validation_Methods,
    params: { value: string[]; param?: number | RegExp | string | null },
  ) => {
    if (method == "equal")
      return Methods[method].func(params.value[0], params.value[1]);

    if (method != "min" && method != "max" && method != "regex")
      return Methods[method].func(params.value[0]);

    return Methods[method].func(params.value[0], params.param as any);
  };

  const ValidateField = (
    methods: ValidationMethodKey[],
    field: string,
    params: { value: string[]; param?: number | RegExp },
  ) => {
    const results: { result: boolean; message: string }[] = [];
    let errors: string = "";
    let final: boolean = true;

    if(Form[field].validate)
    {
        for (let i of methods) {
        let method = i as keyof Validation_Methods;
        const res = ValidateMethod(method, params);

        if (res) results.push({ result: true, message: "Método válidado!" });
        else results.push({ result: false, message: Methods[method].error });
      }

      for (let i in results) {
        if (!results[i].result) {
          errors += results[i].message + " ";
          final = false;
        }
      }

      setValidateField(field, final);
      return { result: final, message: errors };
    }
  };

  const resetForm = () => {
    SetForm(InitialState);
  };

  const FormValidated = () => {
    console.log("Campos:",Validated);
    const keys = Object.keys(Validated);
   
    return keys.every((key)=>Validated[key] === true);
  };

  const FormProp = (
    field: Fields,
    method?: ValidationMethodKey[],
    valueC?: string,
    param?: number | RegExp,
  ) => {
    return {
      setFormField: setField.bind(this),
      setValidateField: setValidateField.bind(this),
      ValidateField: ValidateField,
      field: field,
      method: method,
      need_validation: Form[field].validate,
      valueC: valueC,
      param: param,
    } as FormProps;
  };

  return {
    Form,
    Validated,
    FormValidated,
    Methods,
    setField,
    ValidateMethod,
    ValidateField,
    resetForm,
    FormProp,
  };
};

export default FormState;
