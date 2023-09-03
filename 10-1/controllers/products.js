const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const Product=require('../models/product');

app.use(bodyParser.urlencoded({extended:false}));

exports.SaveProduct=(req,res,next)=>{
    //save data to database
    //products.push(req.body.name);
    const product=new Product(req.body.name);
    product.save().then(()=>{res.redirect('/');}).catch(err=>console.log(err));
    
}

exports.getProducts=(req,res,next)=>{
    let products=Product.getAll().then(([rows])=>
    {
        res.render('products',{products:rows});
    })
    .catch(err => console.log(err));
    
}
exports.getProductByCode=(req,res,next)=>{
    const code=req.params.code;
    Product.getByCode(code).then((prod)=>{
        console.log(prod);
        res.render('product-details',{product:prod[0][0]});
    })
    .catch(err => console.log(err));
 
    
} 
exports.addProduct=(req,res,next)=>{
    res.render('add-product');
}
exports.homePage=(req,res,next)=>{
    res.render('index');
}
