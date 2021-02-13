import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext'
import AlertContext from '../../context/alert/AlertContext'

const ContactForm = () => {
  const contactContext = useContext(ContactContext)
  const alertContext = useContext(AlertContext)

  const {
    addContact,
    current,
    clearCurrentContact,
    updateContact,
    error,
    clearErrors,
  } = contactContext

  const { setAlert } = alertContext

  useEffect(() => {
    if (error !== null) {
      if (error.msg) {
        setAlert(error.msg, 'danger')
      }

      if (error.errors) {
        error.errors.map((error) => setAlert(error.msg, 'danger'))
      }

      clearErrors()
    }

    current !== null
      ? setContact(current)
      : setContact({
          name: '',
          email: '',
          phone: '',
          type: 'personal',
        })
  }, [contactContext, current, error, clearErrors, setAlert])

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  })

  const { name, email, phone, type } = contact

  const onChange = (e) =>
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    })

  const onSubmit = (e) => {
    e.preventDefault()

    if (current === null) {
      addContact(contact)
    } else {
      updateContact(contact)
      window.location = '/'
    }

    clearAll()
  }

  const clearAll = () => {
    clearCurrentContact()
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Kontak' : 'Tambah Kontak'}
      </h2>
      <input
        type='text'
        name='name'
        placeholder='Nama'
        value={name}
        onChange={onChange}
      />
      <input
        type='text'
        name='email'
        placeholder='Email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        name='phone'
        placeholder='Nomor HP'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Edit Kontak' : 'Tambah Kontak'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Hapus
          </button>
        </div>
      )}
    </form>
  )
}

export default ContactForm
