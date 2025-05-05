import { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import Header from '../components/Header.jsx'

const Register = () => {
  const [formData, setFormData] = useState({name: '', email: '', password: '', password2: ''})
  const { name, email, password, password2 } = formData

  const onSubmit = (e) => {
    e.preventDefault()
  }

  const onChange = (e) => {
    setFormData((prevState) => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  return <>
    <Header />
    <section className='heading'>
      <h1>
        <FaUser /> Register
      </h1>
      <p>Please create an account</p>
    </section>

    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            className='form-control'
            id='name'
            name='name'
            value={name}
            type='text'
            placeholder='Enter your name'
            onChange={onChange}
          />
        </div>
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
            placeholder='Create your password'
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            className='form-control'
            id='password2'
            name='password2'
            value={password2}
            type='text'
            placeholder='Confirm password'
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button className='btn btn-block' type='submit'>Submit</button>
        </div>
      </form>
    </section>
  </>
}

export default Register