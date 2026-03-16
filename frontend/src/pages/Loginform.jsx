import { useEffect, useState } from 'react'
import "./Login.css"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { use } from 'react'
// import App from '../App'

function Loginform() {
    
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleLogin = async (e) =>{
      e.preventDefault();
      if(role){
       try{
          const result = await axios.post("http://localhost:3000/auth/login",{email, password, role})
           console.log("login: " + result.data.status)
           if(result.data.status === "student login success"){
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("role", result.data.role);
            navigate('/student-Dashboard');
           }else if(result.data.status === "teacher login success"){
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("role", result.data.role);
            navigate('/teacher-Dashboard');
           }
          }catch(err){
             console.log(err)
          }
      }else{
        alert("please select the role");
      }   
    }

    const handleSubmit = async (e) =>{ 
      e.preventDefault(); 
      if (password === confirmPassword){
         try{
          const result = await axios.post("http://localhost:3000/auth/register",{name, email, password, role})
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
                <label>
                <input 
                  className='form-radio'
                  type='radio'
                  name='role'
                  value='student'
                  onChange={(e) => setRole(e.target.value)}
                />student
                </label>
                <br />
                <label>
                <input 
                  className='form-radio'
                  type='radio'
                  name='role'
                  value='teacher'
                  onChange={(e) => setRole(e.target.value)}
                />teacher
                </label>
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
                <Link to="/Forgot-Password" className='link-p'>Forgot Password?</Link>
                <button className="form-button" type="submit">Login</button>
                <p className='form-p'>Not a user? 
                  <a href='#' 
                    onClick={()=>setIsLogin(false)} 
                    className='link-p'>Register
                  </a>
                </p>
                </form>
             </div>
            ):
            (
            <div className='form'>
                <h2 className='form-h2'>Register</h2>
                <form className='form' onSubmit={handleSubmit}>
                <label>
                <input 
                  className='form-radio'
                  type='radio'
                  name='role'
                  value='student'
                  onChange={(e) => setRole(e.target.value)}
                />student
                </label>
                <br />
                <label>
                <input 
                  className='form-radio'
                  type='radio'
                  name='role'
                  value='teacher'
                  onChange={(e) => setRole(e.target.value)}
                />teacher
                </label>
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
                <p className='form-p'>Already a user? 
                  <a href='#' 
                    onClick={()=>setIsLogin(true)} 
                    className='link-p'>Login
                  </a>
                </p>
              </form>
             </div>
            )}
        </div>
    </div>
    </>    
  );
}


export default Loginform