import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './ForgotPassword.css'

import { HiOutlineMail } from "react-icons/hi";
import { CiLogin } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

import Axios from 'axios'


function UpdatePassword() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const navigateTo = useNavigate();

  
  const checkUser = (e) => {
    e.preventDefault();
    
    Axios.post('http://localhost:3002/forgotPassword',
        {
          checkEmail: email,
          checkNickname: nickname
        }
      ).then((response) => {
        if (response.data.message){
          
          alert("Sorry, the information you provided does not match the email associated with your security question.try again")
          setEmail('')
          setNickname('')
          navigateTo('/forgotPassword')
        }
        else {
          navigateTo('/updatePassword')
        }
      })

      
  }

  return (
    <div className='container'>
      <div className="containerPassword">
          
          <form  className='form grid'>
            <label className='sizeText'>Recover Password</label>
            <div className='inputDiv'>
              <label htmlFor='email'>Email</label>
              <div className='input flex'>
                  <HiOutlineMail className='icon'/>
                  <input type='email' id='email' autoComplete="off" placeholder='Enter Email' onChange={(event) => {
                    setEmail(event.target.value)
                    
                  }}/>
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='username'>What is your first nickname?</label>
              <div className='input flex ' >
                  <CiUser className='icon'/>
                  <input type='text' id='nickname' placeholder='Enter nickname' onChange={(event) => {
                    setNickname(event.target.value)
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