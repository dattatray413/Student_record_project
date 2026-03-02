import { useState } from 'react'
import "./Login.css"
import { Link } from "react-router-dom"
import axios from "axios"

function Loginform() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (password === confirmPassword) {

        axios.post('http://localhost:3001/register',{name, email, password})
        .then(result => console.log(result))
        .catch(err => console.log(err))
        }
        else{
          alert("password not match");
        }
    }
     const [isLogin, setIsLogin] = useState(true);

  return (
    <>
    <div className='container'>
        <div className='form-container'>
            <div className='form-toggle'> 
                <button className={isLogin? 'active':''} onClick={()=>setIsLogin(true)}>Login</button>
                <button className={!isLogin? 'active':''} onClick={()=>setIsLogin(false)}>Register</button>
            </div>

            {isLogin?(
             <div className='form'>
                <h2 className='form-h2'>Login</h2>
                <form className='form' onSubmit={handleSubmit}>
                <input 
                  className='form-input' 
                  type='email' 
                  placeholder='Email ID'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                className='form-input' 
                type='password' 
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
                />
                <Link to="/Forgot">Forgot Password?</Link>
                <button className="form-button">Login</button>
                <p>Not a user? <a href='#' onClick={()=>setIsLogin(false)}>Register</a></p>
                </form>
             </div>
            ):
            (
            <div className='form'>
                <h2 className='form-h2'>Register</h2>
                <form className='form' onSubmit={handleSubmit}>
                <input
                  className='form-input'
                  type='text' 
                  placeholder='Name' 
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className='form-input'
                  type='email' 
                  placeholder='Email ID'
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className='form-input' 
                  type='password'
                  placeholder='password' 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                  className='form-input' 
                  type='password' 
                  placeholder='confirm password' 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="form-button" type="submit">Register</button>
                <p>Already a user? <a href='#' onClick={()=>setIsLogin(true)}>Login</a></p>
              </form>
             </div>
            )}
        </div>
    </div>
    </>    
  );
}


export default Loginform