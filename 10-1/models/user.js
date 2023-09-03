const db=require('../util/database');

module.exports=class User{
    constructor(email,password){
        this.email=email;
        this.password=password;
    }
    
    static getByEmailandPass(email,password){
        return db.execute('select * from users where email=? and password=?',[email,password]);
    }
    save(){
        return db.execute('insert into users (`email`,`password`) values (?,?)',[this.email,this.password]);
    }
    static getByEmail(email){
        return db.execute('select * from users where email=?',[email]);
    }
}
