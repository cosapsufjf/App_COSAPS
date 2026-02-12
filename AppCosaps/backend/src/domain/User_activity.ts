class User_Activity{
    protected id : Number;
    protected name : string;
    constructor(id : Number, name : string){
        this.id = id;
        this.name = name
    }

    protected markAsComplete(){}
    protected GenerateFeedback(){}
}


export default User_Activity