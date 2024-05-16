import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import '../ForgotPassword/ForgotPassword.css'


import { CiLogin } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";

import Axios from 'axios'


function UpdatePassword() {
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();

  
  const checkUser = async (e) => {
    e.preventDefault();
    
    const response = await Axios.post('http://localhost:3002/forgotPassword')

    Axios.put('http://localhost:3002/updatePassword',
        { 
          Email : response.data.email,
          Password: password
        }
      ).then ( (response) => {
        if (response.data.password === ''){
          alert('Empty Password')
        }
        else {
          navigateTo('/')
        }
      })
    
  }

  return (
    <div className='container'>
      <div className="containerPassword">
          
          <form  className='form grid'>
            <label className='sizeText'>Recover Password</label>
            <div className='inputDiv'>
              <label htmlFor='password'>Password</label>
              <div className='input flex'>
                  <RiLockPasswordFill className='icon' /> 
                  <input type='password' id='password' placeholder='Enter Password' onChange={(event) => {
                    setPassword(event.target.value)
                  }}/>
              </div>
            </div>
                   
            <button type='submit' className='btn flex' onClick={checkUser}>
              <span>Register</span>
              <CiLogin className='icon'/>
            </button>

          </form>
        </div>

      </div>
  )
}

export default UpdatePassword