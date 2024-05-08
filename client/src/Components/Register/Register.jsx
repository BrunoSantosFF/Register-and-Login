import React, {useState} from 'react'
import './Register.css'
import '../../App.css'
import {Link} from 'react-router-dom'
import Axios from 'axios'


import video from '../../LoginAssets/videofundo.mp4'
import logo from '../../LoginAssets/logo3.png'

import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import { FaUserShield } from "react-icons/fa";

function Register() {

  const [email, setEmail] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const createUser = () => {
      Axios.post('http://localhost:3000/register',
        {
          Email: email,
          UserName: username,
          PassWord: password
        }
      ).then(() => {
        console.log('User has been created');
      })
  }

  return (
    <div className='registerPage flex'>
      <div className="container flex">
         
        <div className='videoDiv'>
            <video src={video} autoPlay muted loop></video>

            <div className="textDiv">
              <h2 className='title'> Let's rate your films</h2>
              <p>Only here</p>
            </div>

            <div className="footerDiv flex">
              <span className='text'> Have an account ? </span>
              <Link to={'/'}>
                <button className='btn'>Login</button>
              </Link>
            </div>
        </div>
        
        <div className="formDiv flex">
          <div className="headerDiv">
              <img src={logo} alt="logo Image" className='logo'/>
              <h3>Let Us Know You</h3>
          </div>

          <form action="" className='form grid'>
            
            <div className='inputDiv'>
              <label htmlFor='email'>Email</label>
              <div className='input flex'>
                  <HiOutlineMail className='icon'/>
                  <input type='text' id='email' placeholder='Enter Email' onChange={(e) => {
                    setEmail(e.target.value)
                  } 
                  }/>
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='username'>Username</label>
              <div className='input flex'>
                  <FaUserShield className='icon'/>
                  <input type='text' id='username' placeholder='Enter Username' onChange={(e) => {
                    setUserName(e.target.value)
                  }} />
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='password'>Password</label>
              <div className='input flex'>
                  <RiLockPasswordFill className='icon' /> 
                  <input type='password' id='password' placeholder='Enter Password' onChange={(e) => {
                    setPassword(e.target.value)
                  }}/>
              </div>
            </div>

            <button type='submit' className='btn flex' onClick={createUser}>
              <span>Register</span>
              <CiLogin className='icon'/>
            </button>

            <span className='forgotPassword'>
              Forgot your password? <a href=''>Click Here</a>
            </span>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Register