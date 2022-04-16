const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
//Express app
const app = express()
mongoose.connect("mongodb://localhost:27017/Animals", { useNewUrlParser: true, useUnifiedTopology: true })

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

//Creating Schema
const animalSchema = new mongoose.Schema({
    name: String,
    age: Number,
    type: String

})
const animal = new mongoose.model("animal", animalSchema)

// Create a animal
app.post("/animal",async (req,res)=>{
    const product = await animal.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})
//Read all animals
app.get("/animal",async (req,res)=>{
    const animals = await animal.find();
    res.status(200).json({
        success:true,
        animals
    })
})

//update the animals
app.put("/animal/:id",async (req,res)=>{
    const animalfind =  await animal.findById(req.params.id);
    if(!animalfind){
       return res.status(200).json({
            success:false,
            message:"No animal found"   
        })
    }
    const ani = await animal.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    res.status(200).json({
        success:true,
        ani
    })
})

//delete the animals
app.delete("/animal/:id",async (req,res)=>{
    const animalfind =  await animal.findById(req.params.id);
    if(!animalfind){
       return res.status(200).json({
            success:false,
            message:"No animal found"   
        })
    }
    const ani = await animal.findById(req.params.id)
    await ani.remove()
    return res.status(200).json({
        success:true,
        animal
    })
})



app.listen(3000,()=>console.log("app runs at 30000"))