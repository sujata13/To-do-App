const express= require("express");
const router= express.Router();
const session= require("express-session");
const cookieParser=require("cookie-parser");
const cors= require("cors");
const compression= require("compression");
const bodyParser= require("body-parser");
const logger= require("morgan");
const  path= require("path");
const mainRoutes= require("./backend/routes/mainRoutes");
const app= express();

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("views", __dirname+"/client/views");

app.engine("html", require("ejs").renderFile);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "client/images")));
app.use(express.static(path.join(__dirname, "client/css")));


app.use(logger("dev"));

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

function profile(req, res)
{
    res.render("profile");
}

router.route("/").get(profile);
app.use("/", profile);
app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), ()=>{
    console.log("Your application running in local host and the port is :"+app.get("port"));
})

module.exports = app;
