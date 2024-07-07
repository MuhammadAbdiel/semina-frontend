import {
  START_FETCHING_PAYMENT,
  SUCCESS_FETCHING_PAYMENT,
  ERROR_FETCHING_PAYMENT,
  SUCCESS_CLEAR_PAYMENT,
} from './constant'
import { getData } from '../../utils/fetch'

// START
export const startFetchingPayment = () => {
  return {
    type: START_FETCHING_PAYMENT,
  }
}

// SUCCESS
export const successFetchingPayment = ({ payment }) => {
  return {
    type: SUCCESS_FETCHING_PAYMENT,
    payment,
  }
}

// ERROR
export const errorFetchingPayment = () => {
  return {
    type: ERROR_FETCHING_PAYMENT,
  }
}

export const clearPayment = () => {
  return {
    type: SUCCESS_CLEAR_PAYMENT,
  }
}

export const fetchOnePayment = ({ id }) => {
  return async (dispatch) => {
    dispatch(clearPayment())
    dispatch(startFetchingPayment())

    try {
      const res = await getData(`/cms/payments/${id}`)

      dispatch(
        successFetchingPayment({
          payment: res.data.data,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingPayment())
    }
  }
}
