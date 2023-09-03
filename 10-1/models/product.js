const db=require('../util/database');

module.exports=class Product{
    constructor(name){
        this.name=name;
    }
    save(){
        return db.execute('insert into products (`name`) values (?)',[this.name]); 
    }
    static getAll(){
        return db.execute('select * from products');
    }
    static getByCode(code){
        return db.execute('select * from products where code=?',[code]);
    }
    
}
