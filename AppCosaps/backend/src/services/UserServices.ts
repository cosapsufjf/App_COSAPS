import UserModel from "../models/UserModel.ts";

export const UserServices = {
    async create_user(search: "nome" | "email" | "cpf",userData:{nome:string,email:string,cpf:string,senha:string}){
        const [existingUser] = await UserModel.get_user(search, userData.cpf);
        if(existingUser.length > 0)
            throw new Error("Usuário já cadastrado");
        
        return await UserModel.create_user(userData.nome, userData.email, userData.cpf, userData.senha);
    },
    async login(cpf:string, senha:string){
        const res = await UserModel.get_user_info("cpf",cpf,"senha");
        if(res)
            return res === senha;
        
        throw new Error("Usuário não cadastrado");
    },

    async get_user_info(search:"nome" | "email" | "cpf",query:string,info:"senha" | "id" | "name" | "email" | "cpf"){
        return await UserModel.get_user_info(search,query,info);
    },

    async update_password(search:"nome" | "email" | "cpf",query:string,NewPassword:string){
        return await UserModel.update_password(search,query,NewPassword);
    }
}