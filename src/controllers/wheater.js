const wheaterImg = require("../models/wheaterImages.js"); 
const fs = require("fs-extra"); 
require("dotenv").config()

const cloudinary = require("cloudinary"); 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImage = async (req, res) => {
    const {title, description} = req.body; 
    const image = req.file; 
    try {
        const response = await cloudinary.v2.uploader.upload(image.path); 
        const imageNew = new wheaterImg({
            title,
            description,
            imgUrl: response.secure_url,
            imgID: response.public_id,
        })
        await imageNew.save(); 
        await fs.unlink(image.path); 
        res.send("Image is uploaded"); 
    } catch(e) {
        console.error(e)
        res.status(500).send("Error in the server dude!")
    }
}
const getDBimages = async (req, res) => {
    try {
        const data = await wheaterImg.find(); 
        res.send(data)
    } catch(e) {
        res.status(500).send("The database is exploted DX")
    }

}

const deleteIMG = async (req,res) => {
    try{
        const {imgID} = req.params; 
        const imgDelete = await wheaterImg.findByIdAndDelete(imgID); 
        // Delete to cloudinary
        await cloudinary.v2.uploader.destroy(imgDelete.imgID); 
        res.redirect("/whaterApp/displayImages")
    }catch(e){
        console.error(e); 
        res.send("Something went wrong")
    }
}
module.exports = { uploadImage, getDBimages, deleteIMG}; 