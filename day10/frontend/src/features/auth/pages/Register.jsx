import '../style/form.scss'
import { Link } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/use.auth'
import { useNavigate } from 'react-router'

const Register = () => {
  const {loading,handleregister}=useAuth()
  const navigate=useNavigate()
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const handleSubmit=async (e)=>{
    e.preventDefault()
   await handleregister(username,email,password)
    console.log("user registered")
    navigate("/feed")
  }
   if(loading){
    return(
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
          onInput={(e)=>setemail(e.target.value)}
            type="text" name='email'id="email" placeholder='Enter your email' required />
          <input onInput={(e)=>setusername(e.target.value)} type="text"
           name="username" 
           id="username" 
           placeholder="Enter your username"
            required />
            <input onInput={(e)=>setpassword(e.target.value)} type="password" name="password" id="password" placeholder="Enter your password" required />
            <button type="submit" className='button  primary-button'>
              Register
            </button>
        </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register