import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
const axios=require('axios');
const Todo = () => {
    const [task, setTask] = useState({
        taskname:"",
        status:"",
        tag:""
    });
    const [todos,setTodos] =useState([]);
    useEffect(()=>{
        fetch(`http://localhost:8005/Todos`).then((res)=>res.json()).then(res=>{
            setTodos(res);
            console.log(res)
        },[])
    })
    function Change(e){
       const {name,value} = e.target;
       setTask({
        ...task,
        [name]:value
       })
       console.log(task);
    }
     async function Submit() {
         fetch('http://localhost:8005/Todos', {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(task),
        }).then((res)=>res.json()).then((res)=>{
            console.log(res);
        })
        //console.log(user);
    }

  return (
    <div>
         
        Create Todo<br></br>
        <label>Taskname</label>
        <input type="text" name="taskname" onChange={Change}/><br></br>
        <label>Status</label>
        <input type='text' name="status" onChange={Change}/><br /><br />
        <label>Tag</label>
        <input type='text' name="tag" onChange={Change}/>
        <button onClick={Submit}>Submit</button>
    </div>
  
  )
}

export default Todo