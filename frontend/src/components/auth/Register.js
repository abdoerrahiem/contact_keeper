import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'

const Register = (props) => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)

  const { setAlert } = alertContext
  const { register, error, clearErrors, isAuth } = authContext

  useEffect(() => {
    if (isAuth) {
      props.history.push('/')
    }

    if (error === 'Email telah digunakan.') {
      setAlert(error, 'danger')
      clearErrors()
    }

    // eslint-disable-next-line
  }, [error, isAuth, props.history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = user

  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })

  const onSubmit = (e) => {
    e.preventDefault()

    if ((name === '', email === '', password === '', password2 === ''))
      return setAlert('Semua field harus diisi', 'danger')

    if (password !== password2)
      return setAlert('Password tidak cocok', 'danger')

    register({ name, email, password })
  }

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Daftar</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Nama</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Konfirmasi Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Daftar'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  )
}

export default Register
