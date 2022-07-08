const express = require("express"); 
const wheaterImg = require("../models/wheaterImages.js"); 
const router = express.Router(); 
const { uploadImage, getDBimages, deleteIMG } = require("../controllers/wheater")

// Como ya configure todo en app.js, no necesito especificar ruta de archivos
router.get("/", (req,res)=> {
    res.render("index")
})

router.get("/imagesForm", async (req,res)=> {
    const photos = await wheaterImg.find(); 
    console.log(photos)
    res.render("wheaterForm", {images: photos})
})


router.get("/displayImages", async (req,res)=> {
    const photos = await wheaterImg.find(); 
    res.render("wheaterImages", {images: photos})
})

router.get("/ApiImages", getDBimages)

router.post("/imagesForm", uploadImage)

// Delete image 
router.get("/image/delete/:imgID", deleteIMG)


module.exports = router; 