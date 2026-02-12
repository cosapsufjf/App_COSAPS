import User_Activity from "./User_activity";
class User{
    private id : Number
    private name : string;
    private CPF : string;
    private email : string;
    private password : string;

    constructor(name:string,id:number,CPF:string,email:string, password:string){
        this.name = name;
        this.CPF = CPF;
        this.id = id
        this.email = email;
        this.password = password;
    }
    
    Avaliar(activity : User_Activity){}
}

export default User;