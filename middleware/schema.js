const mongoose = require("mongoose")
// mugima@123
const dataSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
   
});

module.exports=mongoose.model("studentdb", dataSchema )