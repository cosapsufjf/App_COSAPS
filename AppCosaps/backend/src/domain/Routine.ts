import User_Activity from "./User_activity";
import Diet from "./Diet";


class Routine extends User_Activity{
    protected id : Number
    protected name : string
    private Diets : Diet[]

    constructor(id : Number, name : string, Diets : Diet[]){
        super(id,name)
        this.Diets = Diets
    }

}

export default Routine;