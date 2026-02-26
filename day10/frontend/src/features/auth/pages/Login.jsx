import '../style/form.scss'
import { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/use.auth'
import { useNavigate } from 'react-router'

const Login = () => {
  const {user,loading,handlelogin}=useAuth()
  const [name, setname] = useState("")
  const [password, setpassword] = useState("")
  const navigate=useNavigate()
  const handleSubmit=async (e)=>{
    e.preventDefault()
    await handlelogin(name,password)
    console.log("user loggedin")
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input 
          onInput={(e)=>setname(e.target.value)}
            type="text"
           name="username" 
           id="username" 
           placeholder="Enter your username"
            required />
            <input 
            onInput={(e)=>setpassword(e.target.value)}
            type="password" 
            name="password" 
            id="password" 
            placeholder="Enter your password" 
            required />
            <button type="submit" className='button  primary-button'>
              Login
            </button>
        </form>
            <p>Don't have an account?<Link to="/register"> Create-One.</Link></p>
      </div>
    </main>
  )
}

export default Login