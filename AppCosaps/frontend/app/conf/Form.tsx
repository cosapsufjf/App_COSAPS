import { useState } from "react";
import { FormFields } from "@/app/types/form";
import { Validation_Methods, ValidationMethodKey, FormProps } from "@/app/types/form";

import { CpfRegex, emailRegex } from "../utils/regex";
import validateCPF from "../utils/cpfValidator";
import { PhoneRegex } from "../utils/regex";
//TODO: REESTRUTURAR COM REACT HOOK FORM

export const FormState = <T extends readonly string[]>(initialStateFields: T) => {
  const InitialState = initialStateFields.reduce((acc, field) => {
    acc[field] = "";
    return acc;
  }, {} as FormFields);

  type Fields = T[number];
  const [Form, SetForm] = useState<FormFields>(InitialState);
  const setField = (campo: string, valor: string) => {
    SetForm({
      ...Form,
      [campo]: valor,
    });
  };

  const Methods : Validation_Methods = {
    required : {func:(value: string) => value.length > 0,error:"Campo obrigatório"},
    equal    : {func:(value1: string, value2:string) => value1.trim() === value2.trim(), error:"Os campos devem ser iguais"},
    min      : {func:(value: string, min: number) => value.length >= min,error:"Caracteres insuficientes"},
    max      : {func:(value: string, max: number) => value.length <= max,error:"Caracteres Excedentes"},
    regex    : {func:(value: string, regex: RegExp) => regex.test(value),error:"Formato inválido"},
    email    : {func:(value: string) => emailRegex.test(value),error:"Email inválido"},
    tel      : {func:(value: string) => PhoneRegex.test(value),error:"Telefone inválido"},
    CPF      : {func:(value: string) => CpfRegex.test(value) && validateCPF(value),error:"CPF inválido"},
  };

  const ValidateMethod = (method: ValidationMethodKey, params : {value:string[], param?: number | RegExp | string | null})=>{    
    if(method == "equal")
      return Methods[method].func(params.value[0], params.value[1]);

    if(method != "min" && method != "max" && method != "regex")
      return Methods[method].func(params.value[0]);
    
    return Methods[method].func(params.value[0], params.param as any);
  }

  const ValidateField = (method: ValidationMethodKey, params : {value:string[], param?: number | RegExp})=>{
    const result = ValidateMethod(method, params);
    if (result) 
      return {result:true, error:"",message:console.log(method+" Válido!!") };
    else
      return {result:false, error: Methods[method].error,message:"" };
  }

  const resetForm = () => {
    SetForm(InitialState);
  };

  const FormProp = (field:Fields ,method:keyof Validation_Methods,valueC?:string,param?:number | RegExp)=> {
    return {
        setFormField : setField,
        field : field,
        ValidateField : ValidateField,
        method : method,
        valueC : valueC,
        param : param
    } as FormProps
  }
  return {
    Form,
    Methods,
    setField,
    ValidateMethod,
    ValidateField,
    resetForm,
    FormProp
    };
};

export default FormState;