import React, { useContext, useEffect } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Loader from 'react-loader-spinner'

import ContactContext from '../../context/contact/ContactContext'
import AlertContext from '../../context/alert/AlertContext'

import ContactItem from './ContactItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Contacts = () => {
  const contactContext = useContext(ContactContext)
  const alertContext = useContext(AlertContext)

  const { contacts, filtered, getContacts, loading, error } = contactContext
  const { setAlert } = alertContext

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger')
    }

    getContacts()

    // eslint-disable-next-line
  }, [])

  if (contacts !== null && contacts.length === 0 && !loading)
    return <h4 style={{ textAlign: 'center' }}>Kamu belum membuat kontak.</h4>

  return (
    <>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered ? (
            filtered.length === 0 ? (
              <CSSTransition timeout={500} classNames='item'>
                <h4 style={{ textAlign: 'center' }}>Kontak tidak ditemukan.</h4>
              </CSSTransition>
            ) : (
              filtered.map((contact) => (
                <CSSTransition key={contact.id} timeout={500} classNames='item'>
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            )
          ) : (
            contacts.map((contact) => (
              <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          )}
        </TransitionGroup>
      ) : (
        <Loader
          type='Bars'
          color='#003699'
          height={80}
          width={80}
          timeout={3000}
          style={{ textAlign: 'center' }}
        />
      )}
    </>
  )
}

export default Contacts
