const db=require("./util/database")
const post=require("./post")
const user=require("./user")

module.exports= class sql{
    constructor(name,acno,phoneno,initialbalance){
    this.name=name,
    this.acno=acno,
    this.phoneno=phoneno,
    this.initialbalance=initialbalance

}
save(){
   return db.execute("INSERT INTO bankdb (name,acno,phoneno,initialbalance) VALUES (?,?,?,?)",
    [this.name,this.acno,this.phoneno,this.initialbalance]
    );

}
static deleteById(id){

}
static getPost(){
    db.execute("SELECT * FROM bankdb")

}
}