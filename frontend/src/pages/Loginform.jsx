import { useState } from 'react'
import "./Login.css"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Loginform() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    
    const handleLogin = async (e) =>{
      e.preventDefault();
       try{
          const result = await axios.post("http://localhost:3001/login",{email, password})
           console.log(result)
           if(result.data.status === "success"){
            navigate('/home')
           }
          }catch(err){
             console.log(err)
          }
    }

    const handleSubmit = async (e) =>{ 
      e.preventDefault(); 
      if (password === confirmPassword){
         try{
          const result = await axios.post("http://localhost:3001/register",{name, email, password})
          console.log(result)
          if(result.data.status === "success"){
            navigate('/');
          }
          }catch(err){
             console.log(err)
          }
      } 
      else{ alert("password not match");
      } 
    };

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
                <form className='form' onSubmit={handleLogin}>
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
                <Link to="/Forgot-Password">Forgot Password?</Link>
                <button className="form-button" type="submit">Login</button>
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
                  placeholder='Full Name' 
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