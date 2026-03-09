import React,{useState} from 'react'
import "../style/register.scss"
import FromGroup from '../components/FromGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {

  const [ username, setUsername ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword] = useState("")

  const navigate = useNavigate()

  const { loading, handleRegister} = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    await handleRegister({username, password, email})

    navigate('/')
  }

  return (
   <main className='register-page'>
    <div className='form-container'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <FromGroup
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Name" placeholder="Enter your name" />

        <FromGroup
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email" placeholder="Enter your email" />

        <FromGroup
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password" placeholder="Enter your password" />
        <button className='button' type="Submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login Here</Link></p>
    </div>
   </main>
  )
}

export default Register
