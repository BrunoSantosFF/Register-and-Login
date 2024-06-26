import React, {useEffect,useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'
import './Login.css'
import '../../App.css'

import video from '../../LoginAssets/videofundo.mp4'
import logo from '../../LoginAssets/urubuzao.png'

import { FaUserShield } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";


function Login() {

  const [loginuserName, setLoginUserName] = useState('')
  const [loginpassword, setLoginPassword] = useState('')
  const navigateTo = useNavigate();

  const [loginStatus, setLoginStatus] = useState('')
  const [statusHolder, setstatusHolder] =  useState('message')

  const createUser = (e) => {
      e.preventDefault();

      Axios.post('http://localhost:3002/login',
        {
          LoginUserName: loginuserName,
          LoginPassword: loginpassword
        }
      ).then((response) => {
        if (response.data === 1){
          navigateTo('/')
          setLoginStatus(`Credentials don't Exist !!`)
        }
        else {
          navigateTo('/dashboard')
        }
      })
  }

  useEffect(() => {
    if (loginStatus !== ''){
      setstatusHolder('showMessage')
      setTimeout(() => {
        setstatusHolder('message')
      },4000)
    }
  },[loginStatus])

  const onSubmit = () => {
    setLoginPassword('')
    setLoginUserName('')
  }

  return (
    <div className='loginPage flex'>
      <div className="container flex">
         
        <div className='videoDiv'>
            <video src={video} autoPlay muted loop></video>

            <div className="textDiv">
              <h2 className='title'> Let's rate your films</h2>
              <p>Only here</p>
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

          <form action="" className='form grid' onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>
            <div className='inputDiv'>
              <label htmlFor='username'>Username</label>
              <div className='input flex'>
                  <FaUserShield className='icon'/>
                  <input type='text' id='username' placeholder='Enter Username' onChange={(event) => {
                    setLoginUserName(event.target.value)
                  }}/>
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='password'>Password</label>
              <div className='input flex'>
                  <RiLockPasswordFill className='icon' /> 
                  <input type='password' id='password' placeholder='Enter Password' onChange={(event) => {
                    setLoginPassword(event.target.value)
                  }}/>
              </div>
            </div>

            <button type='submit' className='btn flex' onClick={createUser}>
              <span>Login</span>
              <CiLogin className='icon'/>
            </button>

            <span className='forgotPassword'>
              Forgot your password? <Link to={'/forgotPassword'}> Click Here</Link>
            </span>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Login