const dbConn = require("../databases/sqlite.js");
const User= dbConn.Users;
module.exports={
    signup: signup
};

function signup(req, res){
    const {name, email, password} = req.body;
    if(!(name && email && password))
        return res.render("signup",{
            msg: "Please enter all the required details"
        });
    else{
        console.log("user detail is",name+" "+email+" "+password)
        User.create({
            name,
            email,
            password
        })
        .then(users=>{
     
            // var user=users.dataValues;
            console.log("user has been created",users)
            req.session.email= users.email;
            req.session.user_id= users.id;
            req.session.name=users.name;
            // req.session.password=users.password
            //console.log(req.session);
            if(users){
                //console.log(users);
                return res.redirect("/");
            }            
        })
        .catch(err=>{
            console.log("user not created");
            console.log("err",err);
            return res.redirect("/");
        });
    }
}
