import { useState } from "react";
import { FormFields } from "@/app/types/form";
import { Validation_Methods, ValidationMethodKey,FormProps } from "@/app/types/form";

import { cpf_regex, emailRegex } from "../utils/regex";
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
  const [Validated, SetValidated] = useState<{[key:string]:boolean}>({});

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
    CPF      : {func:(value: string) => cpf_regex.test(value) && validateCPF(value),error:"CPF inválido"},
  };

  const ValidateMethod = (method: keyof Validation_Methods, params : {value:string[], param?: number | RegExp | string | null})=>{    
    if(method == "equal")
      return Methods[method].func(params.value[0], params.value[1]);

    if(method != "min" && method != "max" && method != "regex")
      return Methods[method].func(params.value[0]);
    
    return Methods[method].func(params.value[0], params.param as any);
  }

  const ValidateField = (methods: ValidationMethodKey[],field:string, params : {value:string[], param?: number | RegExp})=>{

    const results : {result: boolean, message: string}[] = [];
    let errors : string = "";
    let final : boolean = true;

    for(let i of methods)
    {
      let method = i as keyof Validation_Methods;
      const res = ValidateMethod(method, params);

      if (res)
        results.push({result:true,message:"Método válidado!"});
      else
        results.push({result:false, message: Methods[method].error});
    }
    
    for(let i in results)
    {
      if(!results[i].result)
      {
        errors+=results[i].message+" ";
        final = false;
      }
    }

    SetValidated(prev=>({...prev, [field]:final}));
    //console.log("Validated: ",Validated);
    
    return {result:final,message:errors };
    }

  const resetForm = () => {
    SetForm(InitialState);
  };

  const FormValidated = () => {
      const keys = Object.keys(Validated);
      const formKeys = Object.keys(Form);
      if (formKeys.length === 0) return false;
      //console.log("Validated: ",Validated);
      if (keys.length === 0) return false;
      return formKeys.every((key) => Validated[key] === true);
  };

  const FormProp = (field:Fields ,method:ValidationMethodKey[],valueC?:string,param?:number | RegExp)=> {
    return {
        setFormField : setField.bind(this),
        field : field,
        ValidateField : ValidateField,
        method : method,
        valueC : valueC,
        param : param
    } as FormProps
  }

  return {
    Form,
    FormValidated,
    Methods,
    setField,
    ValidateMethod,
    ValidateField,
    resetForm,
    FormProp
    };
};

export default FormState;