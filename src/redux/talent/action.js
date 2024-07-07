import {
  START_FETCHING_TALENT,
  SUCCESS_FETCHING_TALENT,
  ERROR_FETCHING_TALENT,
  SUCCESS_CLEAR_TALENT,
} from './constant'
import { getData } from '../../utils/fetch'

// START
export const startFetchingTalent = () => {
  return {
    type: START_FETCHING_TALENT,
  }
}

// SUCCESS
export const successFetchingTalent = ({ talent }) => {
  return {
    type: SUCCESS_FETCHING_TALENT,
    talent,
  }
}

// ERROR
export const errorFetchingTalent = () => {
  return {
    type: ERROR_FETCHING_TALENT,
  }
}

export const clearTalent = () => {
  return {
    type: SUCCESS_CLEAR_TALENT,
  }
}

export const fetchOneTalent = ({ id }) => {
  return async (dispatch) => {
    dispatch(clearTalent())
    dispatch(startFetchingTalent())

    try {
      const res = await getData(`/cms/talents/${id}`)

      dispatch(
        successFetchingTalent({
          talent: res.data.data,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingTalent())
    }
  }
}
