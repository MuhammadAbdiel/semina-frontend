import {
  START_FETCHING_TALENTS,
  SUCCESS_FETCHING_TALENTS,
  ERROR_FETCHING_TALENTS,
  SUCCESS_ADD_TALENT,
  SUCCESS_EDIT_TALENT,
  SUCCESS_DELETE_TALENT,
  SET_KEYWORD,
} from './constant'

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
}

const initialState = {
  data: [],
  keyword: '',
  status: statuslist.idle,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_TALENTS:
      return { ...state, status: statuslist.process }

    case ERROR_FETCHING_TALENTS:
      return { ...state, status: statuslist.error }

    case SUCCESS_FETCHING_TALENTS:
      return {
        ...state,
        status: statuslist.success,
        data: action.talents,
      }

    case SUCCESS_ADD_TALENT:
      return {
        ...state,
        status: statuslist.success,
        data: [...state.data, action.talent],
      }

    case SUCCESS_EDIT_TALENT:
      return {
        ...state,
        status: statuslist.success,
        data: state.data.map((talent) =>
          talent._id === action.talentId ? action.talent : talent,
        ),
      }

    case SUCCESS_DELETE_TALENT:
      return {
        ...state,
        status: statuslist.success,
        data: state.data.filter((talent) => talent._id !== action.talentId),
      }

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      }

    default:
      return state
  }
}
