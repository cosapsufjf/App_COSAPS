import User_Activity from "./User_activity";

class Exercise extends User_Activity{
    protected id : Number
    protected name : string
    constructor(id : Number, name : string){
        super(id,name)
    }
}

export default Exercise