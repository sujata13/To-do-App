const dbConn = require("../databases/sqlite.js");
const List= dbConn.Lists;

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
            msg:"Please enter a task"
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
            console.log("list found");
            console.log("list",list);
            if(list){
                res.redirect("/");
            }
        })
        .catch(err=>{
            console.log("task not added");
            console.log("err",err);
            res.redirect("/");
        })
    }
}


function display(req, res){
    console.log("executing display function")
    if(req.session.user_id){
        console.log("session data is ",req.session)
        List.findAll({
            where:{
                user_id: req.session.user_id
            },
        })
        .then(items=>{
            console.log("found list items",items)
            res.render("profile",{username: req.session.name, items:items?items:[]});
        })
        .catch(err=>{
            console.log("err",err);
            res.redirect("/signin");
        })
    }
    else{
        console.log("seesion not found redirect to signin")
        res.redirect("/signin")
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
        console.log("items",items);
        items.item=newItem;
        // items.edit=true;
        res.redirect("/");
    })
    .catch(err=>{
        console.log("err",err);
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
        console.log("deleted");
        res.redirect("/");
    })
    .catch(err=>{
        console.log("err",err);
        res.redirect("/");
    })
}
