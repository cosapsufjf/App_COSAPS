export interface ApiError{
    erro?:string;
    message?:string;
}

export interface requestInterface {
    body:{nome?:string,email?:string,cpf:string,senha:string,novaSenha?:string}
}