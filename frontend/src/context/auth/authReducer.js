import * as types from '../types'

export default (state, action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
      }
    case types.REGISTER_FAIL:
    case types.AUTH_ERROR:
    case types.LOGIN_FAIL:
    case types.LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
        user: null,
        error: action.payload,
      }
    case types.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload,
      }
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}
