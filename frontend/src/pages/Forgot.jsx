import React, { useState } from 'react'
import "./Login.css"
import Loginform from './Loginform'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Forgot() {
  const [userOtp, setUserOtp] = useState("");
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/forgot-password", { email })
      console.log(res);
      if (res.data.status === "success") {
         alert("otp sent");
         setShowOtp(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const verifyOtp = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/otp-verification", { userOtp })
      console.log(res)
      if(res.data.status === "success"){
        alert("otp verified")
        navigate("/")
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='container'>
      <div className='form-container'>
        <>
        { !showOtp?(
          <div className='form'>
            <form className='form' onSubmit={handleSubmit}>
              <h2 className='form h2'>Forgot Password</h2>
              <input className='form-input'
                type='email'
                placeholder='Email ID'
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="form-button"
                type="submit">Generate OTP
              </button>
            </form>
            </div>
          ):
          (
            <div className='form'>
              <form className='form' onSubmit={verifyOtp}>
                <h2 className='form h2'>Enter otp</h2>
              <input
                className='form-input'
                type='number'
                placeholder='OTP'
                onChange={(e) => setUserOtp(e.target.value)}
              />
              <button className='form-button'
                type="submit">verify otp
              </button>
              </form>
            </div>
            )}
        </>
      </div>
    </div>
    // <div>Forgot Password</div>
  )
}


export default Forgot