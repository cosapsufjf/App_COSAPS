import User_Activity from "./User_activity";
class Diet extends User_Activity{
    description : string;
    constructor(name : string,id: number ,description : string){
        super(id,name)
        this.description = description;
    }
}

export default Diet;