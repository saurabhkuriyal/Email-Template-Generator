const express=require("express");
const multer=require("multer")
const emailController=require("../controllers/email.controller");

const router=express.Router();

const upload=multer({
    storage:multer.diskStorage({}),
    limits:{fileSize:10*1025*1024},
});



router.route("/getemaillayout").get(emailController.getEmailLayout);

router.route("/renderanddownloadlayout").post(emailController.saveLayout);

router.route("/uploadImage").post(upload.single('image'),emailController.uploadImage);

module.exports=router;