import {
  START_FETCHING_CATEGORY,
  SUCCESS_FETCHING_CATEGORY,
  ERROR_FETCHING_CATEGORY,
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
    case START_FETCHING_CATEGORY:
      return { ...state, status: statuslist.process }

    case ERROR_FETCHING_CATEGORY:
      return { ...state, status: statuslist.error }

    case SUCCESS_FETCHING_CATEGORY:
      return {
        ...state,
        status: statuslist.success,
        data: action.category,
      }

    default:
      return state
  }
}
