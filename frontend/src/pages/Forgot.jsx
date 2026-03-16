import React, { useState } from 'react'
import "./Login.css"
import Loginform from './Loginform'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword]  = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) =>{
    e.preventDefault();
    // setError("");
    // try {
    //   // const result = await axios.post("http://localhost:3000/reset-password", {password, newPassword, confirmPassword})
    // //   console.log(result);
    // // } catch (err) {
    // //   setError("something went wrong");
    // //   console.log(err);
    // // }
  }

  return (
    <>
     <div className='container'>
      <div className='form-container'>
          <div className='form'>
            <form className='form' onSubmit={handleSubmit}>
              <h2 className='form h2'>Reset Password</h2>
              <h2 className='form h2'></h2>
              <input className='form-input'
                type='password'
                placeholder='Old Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <input className='form-input'
                type='password'
                placeholder='New Password'
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input className='form-input'
                type='password'
                placeholder='Confirm New Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <p className='err-p'>{error}</p>}
              
              <button className="form-button"
                type="submit">Change password
              </button>
            </form>
            </div>
        </div>
      </div>
    {/* <div>
      <h2>ResetPassword</h2>
    </div> */}
    </>
  );
}

function Forgot() {
  const [userOtp, setUserOtp] = useState("");
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword]  = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChange, setPasswordChange] = useState(false);
  const navigate = useNavigate();
  // const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const res = await axios.post("http://localhost:3000/auth/forgot-password", { email})
      console.log(res);
      if (res.data.status === "success") {
        alert("otp sent");
        setShowOtp(true);
      }
      if(res.data.status === "user does not exist"){
      setError("invalid email")
      }
    } catch (err) {
      console.log(err);
    }
  }

  const verifyOtp = async (e)=>{
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/auth/otp-verification", { userOtp })
      console.log(res)
      if(res.data.status === "success"){
        alert("otp verified");
        setPasswordChange(true);
        // navigate("/reset-password");
      }
    } catch (err) {
      setError("invalid OTP")
      console.log(err);
    }
  }

  const handlePassword = async (e)=>{
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/reset-password", {
        email,
        password
      });
      console.log(res);
      if (res.data.status === "success") {
        alert("Password changed successfully!");
        navigate("/");
      }
    } catch (err) {
      setError("Failed to reset password");
      console.log(err);
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <>
        { passwordChange?
         (
 <div className='form'>
            <form className='form' onSubmit={handlePassword}>
              <h2 className='form-h2'>Reset Password</h2>
              <h2>email: {email}</h2>

              <input className='form-input'
                type='password'
                placeholder='New Password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <input className='form-input'
                type='password'
                placeholder='Confirm New Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <p className='err-p'> {error}</p>}
              
              <button className="form-button"
                type="submit">Change password
              </button>
            </form>
            </div>
    ): !showOtp?(
          <div className='form'>
            <form className='form' onSubmit={handleSubmit}>
              <h2 className='form-h2'>Forgot Password</h2>
              <input className='form-input'
                type='email'
                placeholder='Email ID'
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className='err-p'> {error}</p>}

              <button className="form-button"
                type="submit">Generate OTP
              </button>
            </form>
            </div>
          ):
          (
            <div className='form'>
              <form className='form' onSubmit={verifyOtp}>
              <h2 className='form-h2'>Enter otp</h2>
              <h2>email: {email}</h2>

              <input
                className='form-input'
                type='number'
                placeholder='OTP'
                onChange={(e) => setUserOtp(e.target.value)}
              />
              {error && <p className='err-p'> {error}</p>}

              <button className='form-button'
                type="submit">verify otp
              </button>
              </form>
            </div>
            )};
      </>
        </div>
      </div>
        
        
    // <div>Forgot Password</div>
  )
}


export default Forgot;