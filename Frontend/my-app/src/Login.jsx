import React from 'react'
import { useState } from 'react'
const axios=require('axios');
const Login = () => {
    const [user, setUser] = useState({
        email:"",
        password:""
    });
    function Change(e){
       const {name,value} = e.target;
       setUser({
        ...user,
        [name]:value
       })
       console.log(user);
    }
    function Submit() {
      fetch('http://localhost:8005/login', {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
         },
            body:JSON.stringify(user)
        }).then((res)=>res.json()).then((res)=>{
            localStorage.setItem("token",res.token);
            console.log(res.token);
        })
        console.log(user);
    }

  return (
    <div>
        <h1>Login </h1><br></br>
        <label>Email</label>
        <input type="text" name="email" onChange={Change}/><br></br>
        <label>Password</label>
        <input type='text' name="password" onChange={Change}/>
        <button onClick={Submit}>Login</button>
    </div>
  
  )
}

export default Login