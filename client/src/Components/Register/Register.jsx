import React, {useState} from 'react'
import './Register.css'
import '../../App.css'
import {Link,useNavigate} from 'react-router-dom'
import Axios from 'axios'


import video from '../../LoginAssets/videofundo.mp4'
import logo from '../../LoginAssets/urubuzao.png'

import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiLogin } from "react-icons/ci";
import { FaUserShield } from "react-icons/fa";
import { CiUser } from "react-icons/ci";

function Register() {

  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const navigateTo = useNavigate();

  const [showText, setShowText] = useState(false)

  const createUser = (e) => {

    if (!errorEmail(email)){
      alert("Wroog Email")
      return;
    }

    e.preventDefault()
      Axios.post('http://localhost:3002/register',
        {
          Email: email,
          UserName: userName,
          NickName: nickname,
          Password: password
        }
      ).then(() => {
        navigateTo('/')
        setEmail('')
        setPassword('')
        setUserName('')
        setNickname('')
      }).catch(error => {
        console.error('Erro ao enviar requisição POST:', error);
      })
  }

  function errorEmail (email){
    const gmail = /@gmail\.com$/i;
    const hotmail = /@hotmail\.com$/i;

    if (gmail.test(email) || hotmail.test(email)){
      return true;
    }
    else {
      return false;
    }
  }

  function passMouseNickname(){
    return <div className='text2'>What is your first nickname? Enter your first nickname to set up a nsecurity question for password recovery when necessary.</div>
    
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

          <form autoComplete='off' className='form grid'>
            
            <div className='inputDiv'>
              <label htmlFor='email'>Email</label>
              <div className='input flex'>
                  <HiOutlineMail className='icon'/>
                  <input type='email' id='email' autoComplete="off" placeholder='Enter Email' onChange={(event) => {
                    setEmail(event.target.value)
                  }} />
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='username'>Username</label>
              <div className='input flex'>
                  <FaUserShield className='icon'/>
                  <input type='text' id='username' placeholder='Enter Username' onChange={(event) => {
                    setUserName(event.target.value)
                  }} />
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='password'>Password</label>
              <div className='input flex'>
                  <RiLockPasswordFill className='icon' /> 
                  <input type='password' id='password' placeholder='Enter Password' onChange={(event) => {
                    setPassword(event.target.value)
                  }}/>
              </div>
            </div>
             
            <div className='inputDiv'>
              <label onMouseEnter={() => {setShowText(true)}} onMouseLeave={() => {setShowText(false)}} htmlFor='username'>What is your first nickname?</label>
              {showText && passMouseNickname()}
              <div className='input flex ' >
                  <CiUser className='icon'/>
                  <input type='text' id='nickname' placeholder='Enter nickname' onChange={(event) => {
                    setNickname(event.target.value)
                  }} />
              </div>
            </div>
                   
            <button type='submit' className='btn flex' onClick={createUser}>
              <span>Register</span>
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

export default Register