const mongoose=require("mongoose");

const imageSchema=new mongoose.Schema({

    logoImage:{
        type:String
    }
})

module.exports=mongoose.model("logoImage",imageSchema);