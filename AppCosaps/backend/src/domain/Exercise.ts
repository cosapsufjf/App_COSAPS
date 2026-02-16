import User_Activity from "./User_activity";

class Exercise extends User_Activity{
    protected id : Number;
    protected name : string;
    private sets : Number;
    private reps : Number;
    private weight : Number;
    constructor(id : Number, name : string, sets : Number, reps : Number, weight : Number){
        super(id,name);
        this.sets = sets;
        this.reps = reps;
        this.weight = weight;
    };
};

export default Exercise