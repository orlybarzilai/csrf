
const User=require('../models/user');
const bcrypt=require('bcryptjs');

exports.getLogin=(req,res,next)=>{
    console.log(req.session);
    res.render('auth/login');
    
}
exports.postLogin=(req,res,next)=>{
  console.log("post login");
    const email = req.body.email;
    const password = req.body.password;
    User.getByEmail(email).then(user => {
        console.log(user[0][0]);
      if (!user[0][0]) {
        console.log("user not found");
        res.redirect('/login');
        
      }
      else{
        bcrypt.compare(password, user[0][0].password)
        .then(doMatch => {
          if (doMatch){
            console.log("user and password  match");
            req.session.isLoggedIn = true;
            req.session.userId=email;
            res.redirect('/');
          }
          else{
            console.log("password not much");
            res.redirect('/login');
          }
        })
        
      }
      
      
    })
    .catch(err=>console.log(err));
}
exports.getSignUp=(req,res,next)=>{
  console.log(req.session);
  res.render('auth/signup');
  
}
exports.SignUp=(req,res,next)=>{
  const email = req.body.email;
  const password = req.body.password;
  User.getByEmailandPass(email,password).then(user => {
      console.log(user[0][0]);
      if (user[0][0]) {
        console.log("user is found in db");
        return res.redirect('signup');
      }
      else
      {
        return bcrypt.hash(password,12)  //The function returns a promise
        .then(hashedPassword => {
          console.log(hashedPassword);
          const user = new User(email,hashedPassword);
          user.save();
          req.session.isLoggedIn = true;
          req.session.userId=email;
          res.redirect('/');
      
        })
      }
      
  })
  .catch(err=>console.log(err));
}
exports.postLogout = (req, res, next) => {
  console.log("post logout");
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};