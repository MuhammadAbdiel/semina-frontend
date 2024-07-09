import {
  START_FETCHING_TALENTS,
  SUCCESS_FETCHING_TALENTS,
  ERROR_FETCHING_TALENTS,
  SUCCESS_ADD_TALENT,
  SUCCESS_EDIT_TALENT,
  SUCCESS_DELETE_TALENT,
  SET_KEYWORD,
} from './constant'
import { deleteData, getData, postData, putData } from '../../utils/fetch'
import debounce from 'debounce-promise'
import Swal from 'sweetalert2'

let debouncedFetchTalents = debounce(getData, 1000)

// START
export const startFetchingTalents = () => {
  return {
    type: START_FETCHING_TALENTS,
  }
}

// SUCCESS
export const successFetchingTalents = ({ talents }) => {
  return {
    type: SUCCESS_FETCHING_TALENTS,
    talents,
  }
}

// ERROR
export const errorFetchingTalents = () => {
  return {
    type: ERROR_FETCHING_TALENTS,
  }
}

export const addTalent = ({ talent }) => {
  return {
    type: SUCCESS_ADD_TALENT,
    talent,
  }
}

export const editTalent = ({ talent }, talentId) => {
  return {
    type: SUCCESS_EDIT_TALENT,
    talent,
    talentId,
  }
}

export const deleteTalent = (talentId) => {
  return {
    type: SUCCESS_DELETE_TALENT,
    talentId,
  }
}

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  }
}

export const fetchTalents = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingTalents())

    try {
      let params = {
        keyword: getState().talents.keyword,
      }

      const res = await debouncedFetchTalents('/cms/talents', params)

      res.data.data.forEach((item) => {
        item.avatar = item.image.name
      })

      dispatch(
        successFetchingTalents({
          talents: res.data.data,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingTalents())
    }
  }
}

export const fetchAddTalent = (name, role, image) => {
  return async (dispatch) => {
    const res = await postData('/cms/talents', {
      name,
      role,
      image,
    })

    if (res?.data?.data) {
      dispatch(addTalent({ talent: res.data.data }))
      Swal.fire({
        title: 'Success',
        text: 'Talent Created Successfully',
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

export const fetchEditTalent = (talentId, name, role, image) => {
  return async (dispatch) => {
    const res = await putData(`/cms/talents/${talentId}`, {
      name,
      role,
      image,
    })

    if (res?.data?.data) {
      dispatch(editTalent({ talent: res.data.data }, talentId))
      Swal.fire({
        title: 'Success',
        text: 'Talent Updated Successfully',
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

export const fetchDeleteTalent = (talentId) => {
  return async (dispatch) => {
    const res = await deleteData(`/cms/talents/${talentId}`)

    if (res?.data?.data) {
      dispatch(deleteTalent(talentId))
      Swal.fire({
        title: 'Success',
        text: `${res.data.data.name} Talent Deleted Successfully`,
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
