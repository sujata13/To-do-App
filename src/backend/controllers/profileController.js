const dbConn = require("../databases/sqlite.js");
const List= dbConn.Lists;
const Users= dbConn.Users;
const Sequelize= require("sequelize");
module.exports={
    add: add,
    displayList: display,
    editList: edit,
    deleteList: deleteTask
};

function add(req,res){
    const task = req.body.item;
    if(!task){
        return res.render("profile",{
            msg:"You haven't enter any ToDo!! Please Enter any ToDo first."
        });
    }
    else{
        var id=req.session.user_id;
        List.create({
            user_id: id,
            item: task,
            edit: false,
            done: "no"
        })
        .then(list=>{
            if(list){
                res.redirect("/");
            }
        })
        .catch(err=>{
            console.log("Error Found!! To Do can not be added.");
            console.log(err);
            res.redirect("/");
        })
    }
}


function display(req, res){
    if(req.session.user_id){
        List.findAll({
            where:{
                user_id: req.session.user_id
            },
            raw: true
        })
        .then(items=>{
            res.render("profile",{username: req.session.name, items: items});
        })
        .catch(err=>{
            console.log(err);
            res.redirect("/signin");
        })
    }
    else{
        res.redirect("/signin");
    }
}

function edit(req, res){
    var task_id=req.body.taskId;
    var newItem=req.body.editedTask;
    List.findOne({
        where:{
            id: task_id
        }
    })
    .then(items=>{
        console.log(items);
        items.item=newItem;
        items.edit=true;
        items.save();
        res.redirect("/");
    })
    .catch(err=>{
        console.log(err);
        res.redirect("/");
    })
    
}

function deleteTask(req, res){
    var task_id=req.body.taskId;
    List.destroy({
        where:{
            id: task_id
        }
    })
    .then(()=>{
        console.log("deleted successfully");
        res.redirect("/");
    })
    .catch(err=>{
        console.log(err);
        res.redirect("/");
    })
    
}
