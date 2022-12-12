const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const todo = new Schema({
    taskname:{type:String,required:true},
    status :{type:String,enum:["pending","done"],required:true},
    tag :{type:String ,enum:["personal", "official", "family"], required:true} 
})
const Todos = mongoose.model("Todos",todo);

module.exports ={Todos}