import {
  START_FETCHING_ORGANIZERS,
  SUCCESS_FETCHING_ORGANIZERS,
  ERROR_FETCHING_ORGANIZERS,
  SUCCESS_ADD_ORGANIZER,
  SUCCESS_ADD_ADMIN,
} from './constant'

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
    case START_FETCHING_ORGANIZERS:
      return { ...state, status: statuslist.process }

    case ERROR_FETCHING_ORGANIZERS:
      return { ...state, status: statuslist.error }

    case SUCCESS_FETCHING_ORGANIZERS:
      return {
        ...state,
        status: statuslist.success,
        data: action.organizers,
      }

    case SUCCESS_ADD_ORGANIZER:
      return {
        ...state,
        status: statuslist.success,
        data: [...state.data, action.organizer],
      }

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
