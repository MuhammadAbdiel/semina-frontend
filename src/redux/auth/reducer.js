import { USER_LOGIN, USER_LOGOUT } from './constant'

let initialState = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : { token: null, refreshToken: null, role: null, email: null }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        token: action.token,
        refreshToken: action.refreshToken,
        role: action.role,
        email: action.email,
      }

    case USER_LOGOUT:
      return { token: null, refreshToken: null, role: null, email: null }

    default:
      return state
  }
}
