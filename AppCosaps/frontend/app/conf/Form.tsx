import { useState } from "react";
type FormFields = { [key: string]: string };

export const FormState = (initialStateFields: string[]) => {
  const InitialState = initialStateFields.reduce((acc, field) => {
    acc[field] = "";
    return acc;
  }, {} as FormFields);

  const [Form, SetForm] = useState<FormFields>(InitialState);
  const setField = (campo: string, valor: string) => {
    SetForm({
      ...Form,
      [campo]: valor,
    });
  };

  const resetForm = () => {
    SetForm(InitialState);
  };
  
  return {
    Form,
    setField,
    resetForm
    };
};
