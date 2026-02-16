
class Feedback{
    private rating : Number;
    private comment : string;
    private created_at : String;

    constructor(rating : Number, comment : string, created_at : String){
        this.rating = rating;
        this.comment = comment;
        this.created_at = created_at;
    };
};

export default Feedback;