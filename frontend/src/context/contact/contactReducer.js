import * as types from '../types'

export default (state, action) => {
  switch (action.type) {
    case types.GET_CONTACT:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      }
    case types.ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false,
      }
    case types.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        ),
        error: action.payload.msg,
        loading: false,
      }
    case types.SET_CURRENT_CONTACT:
      return {
        ...state,
        current: action.payload,
      }
    case types.CLEAR_CURRENT_CONTACT:
      return {
        ...state,
        current: null,
      }
    case types.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
        loading: false,
      }
    case types.FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, 'gi')
          return contact.name.match(regex) || contact.email.match(regex)
        }),
      }
    case types.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      }
    case types.CONTACT_ERROR:
    case types.ADD_CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case types.CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null,
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
