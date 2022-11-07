const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const {connection} = require('./Config/db');
const { Todos } = require("./Todos/Todo");

const app =express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Home Page")
 })
 const authentication = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1]
    try{
        var decoded = jwt.verify(token, 'abcd12345');
        req.body.email = decoded.email
        next()
    }
    catch(err){
       res.send("Please login again")
    }
}
const authorisation = (permittedrole) => {
    return async (req, res, next) => 
    {
    const email = req.body.email
    const user = await UserModel.findOne({email : email})
    const role = user.role;
 
        if(permittedrole.includes(role)){
            next()
        }
        else{
            res.send("Not authorised")
        }
    }
}
app.post("/signup", async (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 5, async function(err, hashed_password) {
        if(err){
            res.send("Something went wrong, please signup later")
        }
        const new_user = new UserModel({
            email : email,
            password : hashed_password
        })
        await new_user.save()
        res.send("Sign up successfull")
    });
});
app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    const hashed_password = user.password
    bcrypt.compare(password, hashed_password, function(err, result) {
        if(result){
            const token = jwt.sign({email : email}, 'abcd12345')
            res.send({"msg" : "Login successfull", "token" : token})
        }
        else{
            res.send("Login failed")
        }
    });
    
});
app.post('/Notes',authentication,async (req,res)=>{
    const {Title,Note,Tags} = req.body;
    const new_notes = new Notegs({
     Title:Title,
     Note:Note,
     Tags:Tags
    })
    await new_notes.save();
    console.log(new_notes)
    res.send("Created new notes")
 });
app.get('/Todos' ,authentication,async (req,res)=>{
    const notes = await Todos.find();
    res.json(notes);
 });
 app.put('/Todos/:id' ,authentication,async (req,res)=>{
    const {id} = req.params;
    const {taskname,status,tag} = req.body;
    const news = await Todos.findByIdAndUpdate(id,taskname,status,tag);
    res.json(news);
});
app.delete("/Todos/:id" , async(req,res)=>{
    const {id} = req.params;
    const posts = await Notes.findById(id);
    await posts.remove();
    console.log(id)
    res.send("Deleted Successfully")
})
 app.listen(8005,async ()=>{
    try{
        await connection
       console.log("Connected")
    }catch{
        console.log("Not Connected");
    }
    console.log("Listening on port 8005")
})