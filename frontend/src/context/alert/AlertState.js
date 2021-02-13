import React, { useReducer } from 'react'
import { v4 as newId } from 'uuid'
import AlertContext from './AlertContext'
import alertReducer from './alertReducer'
import * as types from '../types'

const initialState = []

const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, initialState)

  // Set alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = newId()

    dispatch({
      type: types.SET_ALERT,
      payload: { id, msg, type },
    })

    setTimeout(
      () =>
        dispatch({
          type: types.REMOVE_ALERT,
          payload: id,
        }),
      timeout
    )
  }

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export default AlertState
