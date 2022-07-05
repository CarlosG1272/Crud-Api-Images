const { urlencoded } = require("express");
const express = require("express"); 
const morgan = require("morgan"); 
const multer = require("multer"); 
const path = require("path"); 
const wheaterApp = require("./routes/wheater.js"); 
const exphbs = require("express-handlebars"); 
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');

// The order is very important dude, don´t forget that

// MulterConfig 
const config = multer.diskStorage({
    destination: path.join(__dirname, "public/images"),
    filename: (req, file, callBack) => {
        callBack(null, file.originalname + new Date().toDateString() + path.extname(file.originalname))
    }
})
// Read Environment Variables 
if (process.env.NODE_ENV !== "production"){
    require("dotenv").config(); 
}

// Initializations 
const app = express(); 
require('./database'); 
app.use(express.json()); 
app.use(urlencoded({extended: false}))

// Middlewars
app.use(morgan("dev")); 
app.use(multer({storage: config}).single("image"))

// Port Config 
app.set("port", process.env.PORT || 6969); 

// Settings
app.set("views", path.join(__dirname, "views"))
app.engine(".hbs", exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: ".hbs"
}))

app.set("view engine", ".hbs")




// Images Routes
app.use("/whaterApp", wheaterApp)



module.exports = { app }; 

