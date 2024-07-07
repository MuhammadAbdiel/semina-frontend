import {
  START_FETCHING_CATEGORIES,
  SUCCESS_FETCHING_CATEGORIES,
  ERROR_FETCHING_CATEGORIES,
  SUCCESS_ADD_CATEGORY,
  SUCCESS_EDIT_CATEGORY,
  SUCCESS_DELETE_CATEGORY,
} from './constant'
import { deleteData, getData, postData, putData } from '../../utils/fetch'
import Swal from 'sweetalert2'

// START
export const startFetchingCategories = () => {
  return {
    type: START_FETCHING_CATEGORIES,
  }
}

// SUCCESS
export const successFetchingCategories = ({ categories }) => {
  return {
    type: SUCCESS_FETCHING_CATEGORIES,
    categories,
  }
}

// ERROR
export const errorFetchingCategories = () => {
  return {
    type: ERROR_FETCHING_CATEGORIES,
  }
}

export const addCategory = ({ category }) => {
  return {
    type: SUCCESS_ADD_CATEGORY,
    category,
  }
}

export const editCategory = ({ category }, categoryId) => {
  return {
    type: SUCCESS_EDIT_CATEGORY,
    category,
    categoryId,
  }
}

export const deleteCategory = (categoryId) => {
  return {
    type: SUCCESS_DELETE_CATEGORY,
    categoryId,
  }
}

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(startFetchingCategories())

    try {
      const res = await getData('/cms/categories')

      dispatch(
        successFetchingCategories({
          categories: res.data.data,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingCategories())
    }
  }
}

export const fetchAddCategory = (name, role) => {
  return async (dispatch) => {
    const res = await postData('/cms/categories', {
      name,
      role,
    })

    if (res?.data?.data) {
      dispatch(addCategory({ category: res.data.data }))
      Swal.fire({
        title: 'Success',
        text: 'Category Created Successfully',
        icon: 'success',
      })
    } else {
      Swal.fire({
        title: 'Failed',
        text: res.response.data.msg ?? 'Internal Server Error',
        icon: 'error',
      })
    }
  }
}

export const fetchEditCategory = (categoryId, name, role) => {
  return async (dispatch) => {
    const res = await putData(`/cms/categories/${categoryId}`, {
      name,
      role,
    })

    if (res?.data?.data) {
      dispatch(editCategory({ category: res.data.data }, categoryId))
      Swal.fire({
        title: 'Success',
        text: 'Category Updated Successfully',
        icon: 'success',
      })
    } else {
      Swal.fire({
        title: 'Failed',
        text: res.response.data.msg ?? 'Internal Server Error',
        icon: 'error',
      })
    }
  }
}

export const fetchDeleteCategory = (categoryId) => {
  return async (dispatch) => {
    const res = await deleteData(`/cms/categories/${categoryId}`)

    if (res?.data?.data) {
      dispatch(deleteCategory(categoryId))
      Swal.fire({
        title: 'Success',
        text: `${res.data.data.name} Category Deleted Successfully`,
        icon: 'success',
      })
    } else {
      Swal.fire({
        title: 'Failed',
        text: res.response.data.msg ?? 'Internal Server Error',
        icon: 'error',
      })
    }
  }
}
