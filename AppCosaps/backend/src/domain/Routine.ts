import User_Activity from "./User_activity";
import Diet from "./Diet";
import Exercise from "./Exercise";

class Routine extends User_Activity{
    protected id : Number;
    protected name : string;
    private Diets : Diet[];
    private exercises : Exercise[];

    constructor(id : Number, name : string, Diets : Diet[], exercises : Exercise[]){
        super(id,name);
        this.Diets = Diets;
        this.exercises = exercises;
    };
};

export default Routine;