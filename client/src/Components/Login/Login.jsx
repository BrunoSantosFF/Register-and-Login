import React from 'react'
import {Link} from 'react-router-dom'
import './Login.css'
import '../../App.css'

import video from '../../LoginAssets/videofundo.mp4'
import logo from '../../LoginAssets/logo2.jpeg'

import { FaUserShield } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";


function Login() {
  return (
    <div className='loginPage flex'>
      <div className="container flex">
         
        <div className='videoDiv'>
            <video src={video} autoPlay muted loop></video>

            <div className="textDiv">
              <h2 className='title'> Create and sell extraodinary products</h2>
              <p>Adopt the peace od nature</p>
            </div>

            <div className="footerDiv flex">
              <span className='text'>Don't have an account ? </span>
              <Link to={'/register'}>
                <button className='btn'>Sign Up</button>
              </Link>
            </div>
        </div>
        
        <div className="formDiv flex">
          <div className="headerDiv">
              <img src={logo} alt="logo Image" className='logo'/>
              <h3>Welcome Back!!!</h3>
          </div>

          <form action="" className='form grid'>
            <span> Login Status will go here</span>
            <div className='inputDiv'>
              <label htmlFor='username'>Username</label>
              <div className='input flex'>
                  <FaUserShield className='icon'/>
                  <input type='text' id='username' placeholder='Enter Username'/>
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='password'>Password</label>
              <div className='input flex'>
                  <RiLockPasswordFill className='icon' /> 
                  <input type='password' id='password' placeholder='Enter Password'/>
              </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Login</span>
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

export default Login