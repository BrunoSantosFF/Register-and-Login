import React from 'react'
import '../ForgotPassword/ForgotPassword.css'

import { HiOutlineMail } from "react-icons/hi";
import { CiLogin } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

function ForgotPassword() {
  return (
    <div className='container'>
      <div className="containerPassword">
          
          <form  className='form grid'>
            <label className='sizeText'>Recover Password</label>
            <div className='inputDiv'>
              <label htmlFor='email'>Email</label>
              <div className='input flex'>
                  <HiOutlineMail className='icon'/>
                  <input type='email' id='email' autoComplete="off" placeholder='Enter Email'/>
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='username'>What is your first nickname?</label>
              <div className='input flex ' >
                  <CiUser className='icon'/>
                  <input type='text' id='nickname' placeholder='Enter nickname' />
              </div>
            </div>
                   
            <button type='submit' className='btn flex'>
              <span>Register</span>
              <CiLogin className='icon'/>
            </button>

          </form>
        </div>

      </div>
  )
}

export default ForgotPassword