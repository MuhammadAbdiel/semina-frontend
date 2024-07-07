import {
  START_FETCHING_CATEGORY,
  SUCCESS_FETCHING_CATEGORY,
  ERROR_FETCHING_CATEGORY,
  SUCCESS_CLEAR_CATEGORY,
} from './constant'
import { getData } from '../../utils/fetch'

// START
export const startFetchingCategory = () => {
  return {
    type: START_FETCHING_CATEGORY,
  }
}

// SUCCESS
export const successFetchingCategory = ({ category }) => {
  return {
    type: SUCCESS_FETCHING_CATEGORY,
    category,
  }
}

// ERROR
export const errorFetchingCategory = () => {
  return {
    type: ERROR_FETCHING_CATEGORY,
  }
}

export const clearCategory = () => {
  return {
    type: SUCCESS_CLEAR_CATEGORY,
  }
}

export const fetchOneCategory = ({ id }) => {
  return async (dispatch) => {
    dispatch(clearCategory())
    dispatch(startFetchingCategory())

    try {
      const res = await getData(`/cms/categories/${id}`)

      dispatch(
        successFetchingCategory({
          category: res.data.data,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingCategory())
    }
  }
}
