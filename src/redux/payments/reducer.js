import {
  START_FETCHING_PAYMENTS,
  SUCCESS_FETCHING_PAYMENTS,
  ERROR_FETCHING_PAYMENTS,
  SUCCESS_ADD_PAYMENT,
  SUCCESS_EDIT_PAYMENT,
  SUCCESS_DELETE_PAYMENT,
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
    case START_FETCHING_PAYMENTS:
      return { ...state, status: statuslist.process }

    case ERROR_FETCHING_PAYMENTS:
      return { ...state, status: statuslist.error }

    case SUCCESS_FETCHING_PAYMENTS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payments,
      }

    case SUCCESS_ADD_PAYMENT:
      return {
        ...state,
        status: statuslist.success,
        data: [...state.data, action.payment],
      }

    case SUCCESS_EDIT_PAYMENT:
      return {
        ...state,
        status: statuslist.success,
        data: state.data.map((payment) =>
          payment._id === action.paymentId ? action.payment : payment,
        ),
      }

    case SUCCESS_DELETE_PAYMENT:
      return {
        ...state,
        status: statuslist.success,
        data: state.data.filter((payment) => payment._id !== action.paymentId),
      }

    default:
      return state
  }
}
