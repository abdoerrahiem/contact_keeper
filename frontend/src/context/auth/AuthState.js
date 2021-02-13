import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './AuthContext'
import authReducer from './authReducer'
import * as types from '../types'
import setAuthToken from '../../utils/setAuthToken'

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null,
  error: null,
}

const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get('/auth')

      dispatch({ type: types.USER_LOADED, payload: res.data })
    } catch (err) {
      dispatch({ type: types.AUTH_ERROR })
    }
  }

  // Register user
  const register = async (newUser) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    }

    try {
      const res = await axios.post('/users', newUser, config)

      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: res.data,
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: types.REGISTER_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  // Login user
  const login = async (user) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    }

    try {
      const res = await axios.post('/auth', user, config)

      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.data,
      })

      loadUser()
    } catch (err) {
      dispatch({
        type: types.LOGIN_FAIL,
        payload: err.response.data.msg,
      })
    }
  }

  // Logout user
  const logout = () => dispatch({ type: types.LOGOUT })

  // Clear errors
  const clearErrors = () => dispatch({ type: types.CLEAR_ERRORS })

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuth: state.isAuth,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
