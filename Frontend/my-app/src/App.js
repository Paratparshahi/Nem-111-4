
import './App.css';
import {  Routes, Route } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Todo from './Todo';
import { Home } from './Home';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Todo' element={<Todo/>}/>
      </Routes>
    </div>
  );
}

export default App;
