import {
  START_FETCHING_CATEGORIES,
  SUCCESS_FETCHING_CATEGORIES,
  ERROR_FETCHING_CATEGORIES,
  SUCCESS_ADD_CATEGORY,
  SUCCESS_EDIT_CATEGORY,
  SUCCESS_DELETE_CATEGORY,
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
    case START_FETCHING_CATEGORIES:
      return { ...state, status: statuslist.process }

    case ERROR_FETCHING_CATEGORIES:
      return { ...state, status: statuslist.error }

    case SUCCESS_FETCHING_CATEGORIES:
      return {
        ...state,
        status: statuslist.success,
        data: action.categories,
      }

    case SUCCESS_ADD_CATEGORY:
      return {
        ...state,
        status: statuslist.success,
        data: [...state.data, action.category],
      }

    case SUCCESS_EDIT_CATEGORY:
      return {
        ...state,
        status: statuslist.success,
        data: state.data.map((category) =>
          category._id === action.categoryId ? action.category : category,
        ),
      }

    case SUCCESS_DELETE_CATEGORY:
      return {
        ...state,
        status: statuslist.success,
        data: state.data.filter(
          (category) => category._id !== action.categoryId,
        ),
      }

    default:
      return state
  }
}
