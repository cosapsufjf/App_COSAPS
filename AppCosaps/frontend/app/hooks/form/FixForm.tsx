import { useState } from 'react';
import { Fields, FormProps, ValidationState, validate } from '../../types/form';
import useValidateForm from './ValidateForm';

export const useForm = (fields: string[], methods?: Record<string, validate[]>) => {
  const InitialValues: Fields = {};
  fields.forEach((field) => {
    InitialValues[field] = '';
  });
  
  const [Values, setValues] = useState<Fields>(InitialValues);
  const [showValidate, setShowValidate] = useState(false);
  
  const { ValidateFormFields, ValidateForm } = useValidateForm(Values, methods ?? {});
  
  const setField = (field_name: string, value: string) => {
    setValues({
      ...Values,
      [field_name]: value
    });
  }

  const getFormValidated = () => {
    return ValidateForm();
  }
  const getFormValidationState = () : ValidationState => {
    return ValidateFormFields();
  }
  const getFieldValidationState = (field_name: string) : Record<string, string> => {
    return getFormValidationState()[field_name] ?? {};
  }
  
  const reset_form = () => {
    setValues(InitialValues);
  }

  const FormProp = (
    field: keyof Fields,
  ) => {
    
    return {
      setFormField: setField.bind(this),
      field: field,
      showValidate: showValidate,
      setShowValidate: setShowValidate.bind(this),
      fieldValidate: getFieldValidationState(field),
    } as FormProps;
  };

  return {
    useForm,
    Values,
    FormProp,
    setShowValidate,
    setField,
    reset_form,
    getFormValidationState,
    getFormValidated,
  };
} 