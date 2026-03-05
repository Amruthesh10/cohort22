import React, { useState } from 'react'
import '../../auth/styles/register.scss'
import FormGroup from '../Component/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {
  const {loading,handleRegister}=useAuth()
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate=useNavigate()
  async function handleSubmit(e){
    e.preventDefault()
    await handleRegister({username,email,password})
    navigate("/")
  }
    return (
        <main className="register-page">
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} >
                    <FormGroup
                         value={username}
                    onChange={(e)=>setusername(e.target.value)}
                        label="Name" placeholder="Enter your name" />
                    <FormGroup
                       value={email}
                    onChange={(e)=>setemail(e.target.value)}
                        label="Email" placeholder="Enter your email" />
                    <FormGroup
                        value={password}
                    onChange={(e)=>setpassword(e.target.value)}
                        label="Password" placeholder="Enter your password" />
                    <button className='button' type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </main>
    )
}

export default Register