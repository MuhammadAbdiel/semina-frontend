import {
  START_FETCHING_PAYMENT,
  SUCCESS_FETCHING_PAYMENT,
  ERROR_FETCHING_PAYMENT,
  SUCCESS_CLEAR_PAYMENT,
} from './constant'

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
}

const initialState = {
  data: {},
  status: statuslist.idle,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_PAYMENT:
      return { ...state, status: statuslist.process }

    case ERROR_FETCHING_PAYMENT:
      return { ...state, status: statuslist.error }

    case SUCCESS_FETCHING_PAYMENT:
      return {
        ...state,
        status: statuslist.success,
        data: action.payment,
      }

    case SUCCESS_CLEAR_PAYMENT:
      return {
        ...state,
        status: statuslist.success,
        data: {},
      }

    default:
      return state
  }
}
