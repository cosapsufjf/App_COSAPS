import UserModel from "../models/UserModel.ts";

export const UserServices = {
    async create_user(search: "nome" | "email" | "CPF",userData:{nome:string,email:string,CPF:string,senha:string}){
        const [existingUser] = await UserModel.get_user(search, userData.CPF);
        if(existingUser.length > 0)
        {
            console.log("Usuário ja cadastrado "+JSON.stringify(existingUser)+ " "+ existingUser);
            throw new Error("Usuário já cadastrado");
        }
        
        return await UserModel.create_user(userData.nome, userData.email, userData.CPF, userData.senha);
    },
    async login(CPF:string, senha:string){
        const res = await UserModel.get_user_info("CPF",CPF,"password");
        if(res)
            return res === senha;
        
        throw new Error("Usuário não cadastrado");
    },

    async get_user_info(search:"nome" | "email" | "CPF",query:string,info:"password" | "id" | "name" | "email" | "CPF"){
        return await UserModel.get_user_info(search,query,info);
    },

    async update_password(search:"nome" | "email" | "CPF",query:string,NewPassword:string){
        return await UserModel.update_password(search,query,NewPassword);
    }
}