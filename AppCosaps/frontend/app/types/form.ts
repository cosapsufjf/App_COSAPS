export type FormFields = { [key: string]: string };

export type Validation_Methods = {
    required : {func:(value: string) => boolean,error:string}
    equal    : {func:(value1: string, value2:string) => boolean,error:string}
    min      : {func:(value: string, min: number) => boolean,error:string}
    max      : {func:(value: string, max: number) => boolean,error:string}
    email    : {func:(value: string) => boolean,error:string}
    tel      : {func:(value: string) => boolean,error:string}
    CPF      : {func:(value: string) => boolean,error:string}
    regex    : {func:(value: string, regex: RegExp) => boolean,error:string}
}

export type FormProps = {
    setFormField:(field:string, value:string)=>void,
    field : string,
    ValidateField?:((method: ValidationMethodKey, params: { value: string[]; param?: number | RegExp; }) => { result: boolean; error: string; message: string;}) | null,
    method:keyof Validation_Methods,
    param?:number | RegExp,
    valueC?:string,
}

export const ValidationMethodKeys = [
    "required",
    "equal",
    "min",
    "max",
    "email",
    "tel",
    "CPF",
    "regex"
] as const;

export type ValidationMethodKey = typeof ValidationMethodKeys[number];
