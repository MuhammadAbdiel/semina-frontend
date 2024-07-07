import {
  START_FETCHING_TALENT,
  SUCCESS_FETCHING_TALENT,
  ERROR_FETCHING_TALENT,
  SUCCESS_CLEAR_TALENT,
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
    case START_FETCHING_TALENT:
      return { ...state, status: statuslist.process }

    case ERROR_FETCHING_TALENT:
      return { ...state, status: statuslist.error }

    case SUCCESS_FETCHING_TALENT:
      return {
        ...state,
        status: statuslist.success,
        data: action.talent,
      }

    case SUCCESS_CLEAR_TALENT:
      return {
        ...state,
        status: statuslist.success,
        data: {},
      }

    default:
      return state
  }
}
