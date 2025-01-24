const mongoose=require("mongoose");

const layoutSchema=new mongoose.Schema({
    title:{type:String, required:true},
    content:{type:String,required:true},
})

module.exports=mongoose.model("emialLayout",layoutSchema);