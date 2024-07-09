import {
  START_FETCHING_PAYMENTS,
  SUCCESS_FETCHING_PAYMENTS,
  ERROR_FETCHING_PAYMENTS,
  SUCCESS_ADD_PAYMENT,
  SUCCESS_EDIT_PAYMENT,
  SUCCESS_DELETE_PAYMENT,
} from './constant'
import { deleteData, getData, postData, putData } from '../../utils/fetch'
import Swal from 'sweetalert2'

// START
export const startFetchingPayments = () => {
  return {
    type: START_FETCHING_PAYMENTS,
  }
}

// SUCCESS
export const successFetchingPayments = ({ payments }) => {
  return {
    type: SUCCESS_FETCHING_PAYMENTS,
    payments,
  }
}

// ERROR
export const errorFetchingPayments = () => {
  return {
    type: ERROR_FETCHING_PAYMENTS,
  }
}

export const addPayment = ({ payment }) => {
  return {
    type: SUCCESS_ADD_PAYMENT,
    payment,
  }
}

export const editPayment = ({ payment }, paymentId) => {
  return {
    type: SUCCESS_EDIT_PAYMENT,
    payment,
    paymentId,
  }
}

export const deletePayment = (paymentId) => {
  return {
    type: SUCCESS_DELETE_PAYMENT,
    paymentId,
  }
}

export const fetchPayments = () => {
  return async (dispatch) => {
    dispatch(startFetchingPayments())

    try {
      const res = await getData('/cms/payments')

      res.data.data.map((payment) => {
        payment.avatar = payment.image.name
      })

      dispatch(
        successFetchingPayments({
          payments: res.data.data,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingPayments())
    }
  }
}

export const fetchAddPayment = (type, image) => {
  return async (dispatch) => {
    const res = await postData('/cms/payments', {
      type,
      image,
    })

    if (res?.data?.data) {
      dispatch(addPayment({ payment: res.data.data }))
      Swal.fire({
        title: 'Success',
        text: 'Payment Created Successfully',
        icon: 'success',
      })
    } else {
      Swal.fire({
        title: 'Failed',
        text: res?.response?.data?.msg ?? 'Internal Server Error',
        icon: 'error',
      })
    }
  }
}

export const fetchEditPayment = (paymentId, type, image) => {
  return async (dispatch) => {
    const res = await putData(`/cms/payments/${paymentId}`, {
      type,
      image,
    })

    if (res?.data?.data) {
      dispatch(editPayment({ payment: res.data.data }, paymentId))
      Swal.fire({
        title: 'Success',
        text: 'Payment Updated Successfully',
        icon: 'success',
      })
    } else {
      Swal.fire({
        title: 'Failed',
        text: res?.response?.data?.msg ?? 'Internal Server Error',
        icon: 'error',
      })
    }
  }
}

export const fetchDeletePayment = (paymentId) => {
  return async (dispatch) => {
    const res = await deleteData(`/cms/payments/${paymentId}`)

    if (res?.data?.data) {
      dispatch(deletePayment(paymentId))
      Swal.fire({
        title: 'Success',
        text: `${res.data.data.type} Payment Deleted Successfully`,
        icon: 'success',
      })
    } else {
      Swal.fire({
        title: 'Failed',
        text: res?.response?.data?.msg ?? 'Internal Server Error',
        icon: 'error',
      })
    }
  }
}
