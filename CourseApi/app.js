const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
// Creating express Instace
const app = express();

//Using midle ware:
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())

// Connecting to Mongo Db
mongoose.connect("mongodb://localhost:27017/Courses",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("succesffully connected with DB")
}).catch((e)=>{
    console.log("Error")
})

// creating the schema : collection
const courseSchema = new mongoose.Schema({
    name:String,
    duration:Number,
    descrition:String,
    price: Number,
    active: Boolean,
})

// Make a collection to my db;
const Course = new mongoose.model("Course",courseSchema)


// Creating a Course:

app.post("/api/v1/course/new",async (req,res)=>{


    // console.log(req.body)
    const course = await Course.create(req.body)
    res.status(201).json({
        success:true,
        message: "Your Course Created Success !",
        course:course
    })

})

app.get("/api/v1/courses",async(req,res)=>{
    const courses = await Course.find()
    res.status(200).json({
        status:200,
        message: "Your Course are Here..",
        courses: courses
    })
})


app.put("/api/v1/courses/:id",async(req,res)=>{
    let course = await Course.findById(req.params.id)

    if(!course){
        return res.status(404).json({
            status:404,
            message: "Course Doen't exist"
        })
    }

    course = await Course.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidator:true
    })
res.status(200).json({
    status: 200,
    course
})

})


app.delete("/api/v1/courses/:id", async(req,res)=>{
    let course = await Course.findById(req.params.id)
if(!course){
    return res.status(404).json({
        status:404,
        message: "Course Doen't exist"
    })
}
    await course.remove();
    res.status(200).json({
        status:200,
        message:"Your Course Deleted Success fully ."
    })

} )



//Listing to Port 4545
app.listen(4545,()=>{
    console.log("App Running on Port: 4545 http://localhost:4545")
})