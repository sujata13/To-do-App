
const express= require("express");
const router= express.Router();
const app= express();
const session= require("express-session");
const cookieParser=require("cookie-parser");
const cors= require("cors");
const compression= require("compression");
const bodyParser= require("body-parser");
const logger= require("morgan");
const  path= require("path");
const mainRoutes= require("./backend/routes/MainRoutes");

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("views", __dirname+"/client/views");

//for rendering ejs in html format.
app.engine("html", require("ejs").renderFile);

//setting view engine as ejs
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "client/images")));

//for logging purposes.
app.use(logger("dev"));
// app.get("/", function(req, res) {
//     res.render("index.ejs", { exampleVar:""});
//   });

// app.get("/",function(req,res){
//     res.render("/profile.ejs")
// })

app.use(session({
    secret: "KonfinitySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: null
    }
}));

app.use("/", mainRoutes);

// function profile(req, res)
// {
//     res.render("profile");
// }

// router.route("/").get(profile);
// app.use("/", profile);
app.listen(4000)

module.exports = app;
