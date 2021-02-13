import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './ContactContext'
import contactReducer from './contactReducer'
import * as types from '../types'

const initialState = {
  contacts: null,
  current: null,
  filtered: null,
  error: null,
}

const ContactState = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Get contact
  const getContacts = async () => {
    try {
      const res = await axios.get('/contacts')

      dispatch({ type: types.GET_CONTACT, payload: res.data })
    } catch (err) {
      dispatch({
        type: types.CONTACT_ERROR,
        payload: err.response.data.msg,
      })
    }
  }

  // Add contact
  const addContact = async (contact) => {
    // contact.id = id()
    const config = {
      headers: { 'Content-Type': 'application/json' },
    }

    try {
      const res = await axios.post('/contacts', contact, config)

      dispatch({ type: types.ADD_CONTACT, payload: res.data })
    } catch (err) {
      dispatch({
        type: types.ADD_CONTACT_ERROR,
        payload: err.response.data,
      })
    }
  }

  // Delete contact
  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(`/contacts/${id}`)

      dispatch({
        type: types.DELETE_CONTACT,
        payload: { id, msg: res.data.msg },
      })
    } catch (err) {
      dispatch({
        type: types.ADD_CONTACT_ERROR,
        payload: err.response.data.msg,
      })
    }
  }

  // Update contact
  const updateContact = async (contact) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    }

    try {
      const res = await axios.put(`/contacts/${contact.id}`, contact, config)

      dispatch({ type: types.UPDATE_CONTACT, payload: res.data })
    } catch (err) {
      dispatch({
        type: types.ADD_CONTACT_ERROR,
        payload: err.response.data.msg,
      })
    }
  }

  // Clear contact
  const clearContacts = () => dispatch({ type: types.CLEAR_CONTACTS })

  // Set current contact
  const setCurrentContact = (contact) => {
    dispatch({ type: types.SET_CURRENT_CONTACT, payload: contact })
  }

  // Clear current contact
  const clearCurrentContact = () => {
    dispatch({ type: types.CLEAR_CURRENT_CONTACT })
  }

  // Filter contacts
  const filterContacts = (text) =>
    dispatch({ type: types.FILTER_CONTACT, payload: text })

  // Clear filter
  const clearFilter = () => dispatch({ type: types.CLEAR_FILTER })

  // Clear errors
  const clearErrors = () => dispatch({ type: types.CLEAR_ERRORS })

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts,
        clearErrors,
      }}
    >
      {children}
    </ContactContext.Provider>
  )
}

export default ContactState
