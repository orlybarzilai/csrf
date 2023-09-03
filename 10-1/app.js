const path=require('path');
const express=require('express');
const session=require('express-session');
const csrf=require('csurf');
const app=express();

const adminRoutes=require('./routes/admin');
const authRoutes=require('./routes/auth');
const errorController = require('./controllers/error');

const csrfProtection=csrf();

app.set('view engine', 'ejs');
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:false,
    resave: false 
}));
//app.use(csrfProtection);
/*app.use((req,res,next)=>{
    res.locals.csrfToken = req.csrfToken();
    console.log(res.locals.csrfToken);
    next();
})*/

app.use(adminRoutes);
app.use(authRoutes);
app.use(errorController.showError);
app.use(express.static(path.join(__dirname,'public')));
app.use((req,res,next)=> {
    //res.status(404).sendFile(path.join(__dirname,'views','404.html'))
    res.status(404).render('404',{pageTitle:'Page Not Found'});
});
app.listen(3000);