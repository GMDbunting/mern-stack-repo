import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { defineUser } from '../app/userSlice.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header.jsx'

const Login = () => {
  const [formData, setFormData] = useState({email: '', password: ''})
  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const submitForm = () => {
    fetchUser({
      email: 'ipiman@gmail.com',
      password: '123456'
    })
  }

  const onChange = (e) => {
    setFormData((prevState) => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const fetchUser = async (payload) => {
    try {
      let userData = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      })
      userData = await userData.json()
      await storeGlobally(userData)
      navigate('/')
    } catch (error) {
      throw error
    }
  }

  const storeGlobally = (data) => {
    return new Promise((resolve, reject) => {
      try {
        dispatch(defineUser(data))
        resolve(data)
      } catch (error) {
        reject(error.message)
      }
    })
  }

  return <>
    <Header />
    <section className='heading'>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Login and start setting goals</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className='form-control'
            id='email'
            name='email'
            value={email}
            type='text'
            placeholder='Enter your email'
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className='form-control'
            id='password'
            name='password'
            value={password}
            type='text'
            placeholder='Enter your password'
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button className='btn btn-block' type='submit' onClick={submitForm}>Submit</button>
        </div>
      </form>
    </section>
  </>
}

export default Login
