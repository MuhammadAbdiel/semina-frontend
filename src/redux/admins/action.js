import { SUCCESS_ADD_ADMIN } from './constant'
import { postData } from '../../utils/fetch'
import Swal from 'sweetalert2'

export const successAddAdmin = ({ admin }) => {
  return {
    type: SUCCESS_ADD_ADMIN,
    admin,
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
