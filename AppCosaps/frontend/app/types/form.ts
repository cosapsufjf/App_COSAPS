export type validate = {method: ValidationMethodKey, param?: any};
export type Fields = Record<string, string>;
export type ValidationState = Record<keyof Fields, Record<string, string>>;

export type FormProps = {
  field : keyof Fields,
  setFormField:(field:string, value:string)=>void,
  fieldValidate?: Record<string,string>;
}


export type FormFields = { [key: string]: { field: string, validate: boolean } };
export type ValidatedFields = { [key: string]: boolean};

export type Validation_Methods = {
    required : {func:(value: string) => boolean,error:string}
    equal    : {func:(value1: string, value2:string) => boolean,error:string}
    min      : {func:(value: string, min: number) => boolean,error:string}
    max      : {func:(value: string, max: number) => boolean,error:string}
    email    : {func:(value: string) => boolean,error:string}
    tel      : {func:(value: string) => boolean,error:string}
    CPF      : {func: (value: string) => boolean, error: string }
    regex    : (regex: RegExp) => {func: (value: string) => boolean, error: string }
}

export const ValidationMethodKeys = [
    "required",
    "equal",
    "min",
    "max",
    "email",
    "tel",
    "CPF",
    "regex",
] as const;

export type ValidationMethodKey = typeof ValidationMethodKeys[number];
