// hooks/useForm.ts
import { useState, useCallback } from 'react';
import { Fields } from '../types/form';

// Definição simplificada de regras

export const useForm = (fields: Fields) => {
  const [Values, setValues] = useState<Fields>(fields);
  const InitialState = fields;
  const setField = (field_name: string, value: string) => {
    setValues({
      ...Values,
      [field_name]: value
    });
  }
  const reset_form = () => {
    setValues(InitialState);
  }

  return {
    useForm,
    setField,
    reset_form,
  };
} 