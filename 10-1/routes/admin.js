const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');
const productController=require("../controllers/products.js");
const isAuth=require("../util/is-auth.js");

const router=express.Router();
router.use(bodyParser.urlencoded({extended:false}));
const products=[];

/*router.get('/add-product', (req,res,next)=> {
    res.sendFile(path.join(__dirname,'../','views','add-product.html'))});*/
/*router.post('/product', (req,res,next)=> {
        console.log(req.body.name);
});*/
router.get('/add-product',isAuth,productController.addProduct);
router.post('/product',isAuth,productController.SaveProduct);
router.get('/products',isAuth,productController.getProducts);
router.get('/product-details/:code',isAuth,productController.getProductByCode);

/*router.get('/', (req,res,next)=> 
{res.sendFile(path.join(__dirname,'../','views','index.ejs'))});*/
router.get('/',productController.homePage);

module.exports=router;
