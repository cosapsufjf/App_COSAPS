import { UserServices } from "../services/UserServices.ts";

interface requestInterface {
    body:{nome?:string,email?:string,cpf:string,senha:string,novaSenha?:string}
}
export const UserController = {
    async create_new_user(req:requestInterface,res:any){
        try{
            const {nome,email,cpf,senha} = req.body;

            const user = await UserServices.create_user("cpf", {nome,email,cpf,senha});

            res.status(201).json({
                message:"Usuário criado com sucesso",
                userID: await UserServices.get_user_info("cpf",cpf,"id"),
                result:user
            });
        }
        catch(err)
        {
            return res.status(400).json({error: err.message});
        }
    },
    async login(req:requestInterface,res:any){
        try{
            const {cpf,senha} = req.body;
            const user = await UserServices.login(cpf,senha);
            return res.status(200).json({
                message:"Usuário logado com sucesso",
                userID: await UserServices.get_user_info("cpf",cpf,"id"),
                result:user
            });
        }
        catch(err)
        {
            return res.status(400).json({error: err.message});
        }
    },
    async update_password(req:requestInterface,res:any){
        try{
            const {cpf,novaSenha} = req.body;
            const user = await UserServices.update_password("cpf",cpf,novaSenha);
            return res.status(200).json({
                message:"Senha alterada com sucesso!",
                userID: await UserServices.get_user_info("cpf",cpf,"id"),
                result:user
            })
        }
        catch(err)
        {
            return res.status(400).json({error: err.message});
        }
    }
}