const dbConn = require("../databases/sqlite.js");

const User= dbConn.Users;

module.exports={
    signin: signin
};
function signin(req, res){
    const {email, password} = req.body;
    if(!(email && password))
        return res.render("sign-in",{
            msg: "Please enter all the required details"
        });
    else{
        User.findOne({
        where:{
                email: email,
                password: password
            }
        })
        .then(users=>{
            // if(users){
            //     return res.redirect("/");
            // }    
            // var user=users.dataValues;
            console.log("user found",users);
            // console.log("users",users);
            req.session.email= users.email;
            req.session.user_id= users.id;
            req.session.name=users.name;
            // if(users){
                return res.redirect("/");
            // }            
        })
     
        .catch(err=>{
            console.log("user not found");
            console.log(err);
            return res.redirect("/signin");
        });
    }
}
