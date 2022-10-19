
const mysql = require("mysql2")
const Pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "bankdb",
    password: "2503"
})
module.exports = Pool.promise();

const post=require("../models/post")
const user=require("../models/user")

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