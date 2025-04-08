const mongoose = require("mongoose")

const dataSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    possword:{
        type:String,
        required:true,
    },
    mob:{
        type:Number,
        required:true,
    },
});

module.exports=mongoose.model("studentdb", dataSchema )