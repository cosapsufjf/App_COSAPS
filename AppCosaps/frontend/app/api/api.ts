import { requestInterface } from "../interfaces/routesInterface";
const API_BASE_URL = "http://10.0.3.2:8801"//"http://10.0.2.2:8801";


class ApiService {
    base_url: string
    constructor(base_url = API_BASE_URL) {
        this.base_url = base_url;
    }

    private async handle_response<T>(res:Response):Promise<T>{
        const text = await res.text();
        if(!text)
        {
            if(!res.ok)
                throw new Error(res.statusText);
            return {} as T;
        }
        let data;
        try{
            data = JSON.parse(text);
        }
        catch(e)
        {
            throw new Error(text);
        }

        if(!res.ok)
        {
            console.log("data ficou assim: "+JSON.stringify(data)+" "+data);
            throw new Error(data.message || data.error || "Erro na requisição");
        }

        return data;
    }

    async cadastrar(req:requestInterface){
        const res = await fetch(this.base_url+"/cadastrar",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(req.body)
        });

        return await this.handle_response<{message:string,userID:number}>(res);
    }

    async login(req:requestInterface){
        const res =  await fetch(this.base_url+"/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(req.body)
        });

        return await this.handle_response<{message:string,userID:number}>(res);
    }
    async alterar_senha(req:requestInterface)
    {
        const res = await fetch(this.base_url+"/alterar_senha",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(req.body)
        });

        return await this.handle_response<{message:string,userID:number}>(res);
    }
}

export const api = new ApiService();
export default api;