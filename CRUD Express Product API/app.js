const express = require("express")
const mongoose= require("mongoose")
const bodyParser = require("body-parser")
//Making Express app
const app = express()
//Connecting to Mongo Db:
mongoose.connect("mongodb://localhost:27017/ProductApi",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Connected with DB")
}).catch((e)=>{
    console.log(`Error in Connection : ${e}`)
})

//Using bodyParser to get data from body
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

//Creating the Schema
const productSchema =  new mongoose.Schema({
    name:String,
    description:String,
    price:Number
})
//Making Collection
const Product = new mongoose.model("Product",productSchema)


//Making Creating Product:
app.post("/api/v1/product/new", async (req,res)=>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})

//Read All  Products
app.get("/api/v1/products", async (req,res)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
})

//Update the Product
app.put("/api/v1/product/:id",async(req,res)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return  res.status(500).json({
            success:false,
            message:"Product Not found !.."
        })
    } 
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidator:true
    })
    res.status(200).json({
        success:true,
        product
    })
})

//Delete Product
app.delete("/api/v1/product/:id",async(req,res)=>{
    const  product = await Product.findById(req.params.id);
    if(!product){
       return  res.status(500).json({
            success:false,
            message:"Product Not found !.."
        })
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product is deleted successfully"
    })


}) 



app.listen(4500,()=>{
    console.log(`Server is running at port ${4500}`)
})