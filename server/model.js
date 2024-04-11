import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
{
    title:String,
    text:String,
    author:String,
    thumbnail:String,
    content:String
},{
    timestamps:true,
})
export const Blogs=mongoose.model('blog',blogSchema)