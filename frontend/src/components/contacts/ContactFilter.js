import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext'

const ContactFilter = () => {
  const contactContext = useContext(ContactContext)
  const { filtered, filterContacts, clearFilter } = contactContext

  const text = useRef('')

  useEffect(() => {
    if (!filtered) {
      text.current.value = ''
    }
  }, [filtered])

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value)
    } else {
      clearFilter()
    }
  }

  return (
    <form>
      <input
        type='text'
        placeholder='Cari kontak...'
        ref={text}
        onChange={onChange}
      />
    </form>
  )
}

export default ContactFilter
