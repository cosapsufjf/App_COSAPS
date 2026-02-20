import { UserServices } from "../services/UserServices.ts";

interface requestInterface {
    body:{nome?:string,email?:string,CPF:string,senha:string,novaSenha?:string}
}
export const UserController = {
    async create_new_user(req:requestInterface,res:any){
        try{
            console.log("Front end chamou a função!")
            console.log("Dados: "+JSON.stringify(req.body));

            const {nome,email,CPF,senha} = req.body;

            const user = await UserServices.create_user("CPF", {nome,email,CPF,senha});

            res.status(201).json({
                message:"Usuário criado com sucesso",
                userID: await UserServices.get_user_info("CPF",CPF,"id"),
                result:user
            });
        }
        catch(err)
        {
            console.log("deu erro na criação do usuário: "+err);
            return res.status(400).json({error: err.message});
        }
    },
    async login(req:requestInterface,res:any){
        try{
            const {CPF,senha} = req.body;
            const user = await UserServices.login(CPF,senha);
            return res.status(200).json({
                message:user ? "Usuário logado com sucesso" : "Usuário ou senha incorretos",
                userID: await UserServices.get_user_info("CPF",CPF,"id"),
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
            const {email,novaSenha} = req.body;
            const user = await UserServices.update_password("email",email,novaSenha);
            return res.status(200).json({
                message:"Senha alterada com sucesso!",
                userID: await UserServices.get_user_info("email",email,"id"),
                result:user
            })
        }
        catch(err)
        {
            return res.status(400).json({error: err.message});
        }
    }
}