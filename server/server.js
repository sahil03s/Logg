import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const port = process.env.port || 3080;

const password = encodeURIComponent(process.env.DB_PASSWORD);
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${password}@cluster0.vhve1kr.mongodb.net/Logg-db?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri).then(() => console.log("Connection Successful")).catch((err) => console.log(err));

function getTime() {
    let date = new Date();  
    let options = {  
    weekday: "short", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
    };  

    return date.toLocaleTimeString("en-us", options); 
}

const blogSchema = new mongoose.Schema({
    author:String,
    title:String,
    content:String,
    edited:Boolean,
    curr_time:{type: String, default: getTime},
});

const Blog = new mongoose.model('Blog', blogSchema);

let data = [];

app.use(bodyParser.urlencoded({extended:true}));

app.get("/api", async (req, res) => {
    try {
        data = await Blog.find().sort({curr_time:-1, _id:-1});
    }
    catch(err) {
        console.log("Error fetching database logg-db", err);
    }
    res.json(data);

});

app.get("/blogs/:id", async (req, res) => {
    const id = req.params.id;
    try {
        data = await Blog.findOne({_id:id});
    }
    catch(err) {
        console.log("Error fetching database logg-db", err);
    }
    res.json(data);
});

app.get("/edit/:id/:f", async (req, res) => {
    const id = req.params.id;
    data = await Blog.findOne({_id:id});

    res.json({
        blog : data,
        redirect : req.params.f
    });
});

app.post("/", async (req, res) => {
    let blog = {
        author : req.body["author"],
        title : req.body["title"],
        content : req.body["content"],
        edited:false,
    };

    try {
        await Blog.insertMany([blog]);
    }
    catch (err) {
        console.log("Error in inserting row in database", err);
    }
    res.redirect("/");
});

app.post("/save/:redirect", async (req, res) => {
    let blog = {
        id : req.body["id"],
        author : req.body["author"],
        title : req.body["title"],
        content : req.body["content"],
        edited : true, 
        curr_time: getTime(),
    };

    await Blog.findOneAndUpdate({_id:blog.id}, blog);

    if(req.params.redirect === "index")
        res.redirect("/");
    else
        res.redirect(`/blogs/${blog.id}`);
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Blog.findOneAndDelete({_id:id});
    res.json("/");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});

