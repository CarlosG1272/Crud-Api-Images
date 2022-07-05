const { model, Schema} = require("mongoose"); 

const wheaterImg = new Schema({
    title: String, 
    description: String, 
    imgUrl: String,
    imgID: String,
    groupIMG: {
        type: String,
        default: "Weather Api"
    }
})


module.exports= model('wheater', wheaterImg); 