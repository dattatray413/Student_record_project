import React, { useState } from 'react'
import "./Login.css"
// import Loginform from './Loginform'
import { Link } from "react-router-dom";

function Forgot() {
  const [otp,setOtp]= useState("");

  const generateOtp = ()=> {
    let otp='';
    for(let i =0;i<4;i++){
        otp+=Math.floor(Math.random()*10);
    }
    setOtp(otp);
  }
  return (
     <div className='container'>
        <div className='form-container'>
            <div className='form-toggle'> 
                <>
             <div className='form'>
                <h2 className='form h2'>Forgot Password</h2>
                <input className='form-input' type='email' placeholder='Email ID'/>
               <button onClick={generateOtp}> Get otp </button> 
               {<p>Your OTP is: {otp}</p>}
             </div>
            </>
            </div>
        </div>
    </div>
    // <div>Forgot Password</div>
   )
}

export default Forgot