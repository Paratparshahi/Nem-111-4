import React from 'react'
import { useState } from 'react'
const axios=require('axios');
const Signup = () => {
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
     async function Submit() {
         fetch('http://localhost:8005/signup', {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(user),
        }).then((res)=>res.json()).then((res)=>{
            console.log(res)
        })
        //console.log(user);
    }

  return (
    <div>
        <h1>SignUp</h1><br></br>
        <label>Email</label>
        <input type="text" name="email" onChange={Change}/><br></br>
        <label>Password</label>
        <input type='text' name="password" onChange={Change}/>
        <button onClick={Submit}>SignUp</button>
    </div>
  
  )
}

export default Signup