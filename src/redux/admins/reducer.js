import { SUCCESS_ADD_ADMIN } from './constant'

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
}

const initialState = {
  data: [],
  status: statuslist.idle,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_ADD_ADMIN:
      return {
        ...state,
        status: statuslist.success,
        data: [...state.data, action.admin],
      }

    default:
      return state
  }
}
