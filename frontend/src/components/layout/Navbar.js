import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext'
import ContactContext from '../../context/contact/ContactContext'

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext)
  const contactContext = useContext(ContactContext)

  const { isAuth, logout, user } = authContext
  const { clearContacts } = contactContext

  const onLogout = () => {
    logout()
    clearContacts()
  }

  const authLinks = (
    <>
      <li>
        <p>
          <i className='fas fa-user-circle' /> {user && user.name}
        </p>
      </li>
      <li>
        <span onClick={onLogout}>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Keluar</span>
        </span>
      </li>
    </>
  )

  const guestLinks = (
    <>
      <li>
        <Link to='/about'>Tentang Aplikasi</Link>
      </li>
      <li>
        <Link to='/register'>Daftar</Link>
      </li>
      <li>
        <Link to='/login'>Masuk</Link>
      </li>
    </>
  )

  return (
    <div className='navbar bg-primary'>
      <Link to='/'>
        <h1>
          <i className={icon} /> {title}
        </h1>
      </Link>
      <ul>{isAuth ? authLinks : guestLinks}</ul>
    </div>
  )
}

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
}

export default Navbar
