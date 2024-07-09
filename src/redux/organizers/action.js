import {
  START_FETCHING_ORGANIZERS,
  SUCCESS_FETCHING_ORGANIZERS,
  ERROR_FETCHING_ORGANIZERS,
  SUCCESS_ADD_ORGANIZER,
  SUCCESS_ADD_ADMIN,
} from './constant'
import { postData } from '../../utils/fetch'
import Swal from 'sweetalert2'

export const startFetchingOrganizers = () => {
  return {
    type: START_FETCHING_ORGANIZERS,
  }
}

export const successFetchingOrganizers = ({ organizers }) => {
  return {
    type: SUCCESS_FETCHING_ORGANIZERS,
    organizers,
  }
}

export const errorFetchingOrganizers = () => {
  return {
    type: ERROR_FETCHING_ORGANIZERS,
  }
}

export const successAddOrganizer = ({ organizer }) => {
  return {
    type: SUCCESS_ADD_ORGANIZER,
    organizer,
  }
}

export const successAddAdmin = ({ admin }) => {
  return {
    type: SUCCESS_ADD_ADMIN,
    admin,
  }
}

export const fetchAddOrganizer = (
  organizer,
  name,
  email,
  password,
  confirmPassword,
  role = 'organizer',
) => {
  return async (dispatch) => {
    const res = await postData('/cms/organizers', {
      organizer,
      name,
      email,
      password,
      confirmPassword,
      role,
    })

    if (res?.data?.data) {
      res.data.data.organizer = res.data.data.organizerName

      dispatch(successAddOrganizer({ organizer: res.data.data }))
      Swal.fire({
        title: 'Success',
        text: 'Organizer Created Successfully',
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

export const fetchAddAdmin = (
  name,
  email,
  password,
  confirmPassword,
  role = 'admin',
) => {
  return async (dispatch) => {
    const res = await postData('/cms/users', {
      name,
      email,
      password,
      confirmPassword,
      role,
    })

    if (res?.data?.data) {
      dispatch(successAddAdmin({ admin: res.data.data }))
      Swal.fire({
        title: 'Success',
        text: 'Admin Created Successfully',
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
