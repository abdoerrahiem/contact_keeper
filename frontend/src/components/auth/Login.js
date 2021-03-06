import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'

const Login = (props) => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuth } = authContext

  useEffect(() => {
    if (isAuth) {
      props.history.push('/')
    }

    if (
      error === 'User tidak ditemukan.' ||
      error === 'Email dan password tidak cocok.'
    ) {
      setAlert(error, 'danger')
      clearErrors()
    }

    // eslint-disable-next-line
  }, [error, isAuth, props.history])

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const { email, password } = user

  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })

  const onSubmit = (e) => {
    e.preventDefault()

    if (email === '' || password === '') {
      setAlert('Semua field harus diisi.', 'danger')
    } else {
      login({ email, password })
    }
  }

  return (
    <div className='form-container'>
      <h1>
        <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Masuk'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  )
}

export default Login
