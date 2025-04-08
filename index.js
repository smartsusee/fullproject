const express = require("express");
const mongoose = require("mongoose");
const dataSchema = require("./middleware/schema");
const bcrypt = require("bcrypt")

const app = express();

app.use(express.json())
const dotenv = require("dotenv");

dotenv.config();


mongoose.connect(process.env.DBLink).then(()=>{
    console.log("database connected");
    
}).catch(()=>{
    console.log("not connected");
    
})

app.post("/showData", async (req,res)=>{

    const hassPossword = await bcrypt.hash(req.body.possword,7)

    const addData = await dataSchema({
        ...req.body,possword:hassPossword,
    })

    const findEmail = await dataSchema.findOne({email:req.body.email}) 

    

    if(findEmail) return res.json("email already exist")
    
    const saveData = await addData.save()
    res.json({
        msg:"post data successfully",
        saveData

    })
})

app.get("/readData", async (req,res)=>{
    const displayData = await dataSchema.find()
    res.json(displayData)
});

app.delete("/deleteData/:id",async (req,res)=>{
    const deleted = await dataSchema.findByIdAndDelete(req.params.id)
    res.json({
        msg:"Delete data",
        deleted
    })

});

app.put("/updateData/:id",async (req,res)=>{
    const updateData = await dataSchema.findByIdAndUpdate(req.params.id,req.body)
    res.json({
        msg:"Updated",
        updateData
    })
    
});


app.post("/loginData",async(req,res)=>{
    const findEmail = await dataSchema.findOne({email:req.body.email}) 
     if(!findEmail) return res.json("email not valid")

    const findPossword = await bcrypt.compare(req.body.possword,findEmail.possword)
    if(!findPossword) return res.json("possword not valid")
    
        res.json({
            msg:"Login success",
            findEmail
        })
})



app.listen(process.env.port,()=>{
    console.log("connected port 4006");
    
})