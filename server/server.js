import express  from "express";
import router from "./router.js";
import mongoose from 'mongoose'
import cors from 'cors'

//middleware
const app=express();
app.use(express.json())

///for authority
app.use(cors({
    // credentials:true,
    // origin:'http://localhost:3000'
}))
app.use('/upload',express.static('upload/'))
///affix tag and router
app.use('/blog', router)
///test module
const PORT = 5000;

const mongoDBURL='mongodb+srv://hypn:6234ngu@mern1.tvwqvgz.mongodb.net/store?retryWrites=true&w=majority'

//////connect to database
mongoose
.connect(mongoDBURL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`backside listening on port ${PORT}`)
    })
    console.log("database ok")
})
.catch((err)=>{
    console.log(err)
})