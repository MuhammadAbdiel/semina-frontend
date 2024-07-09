import { getData } from '@/utils/fetch'
import {
  errorFetchingOrganizers as errorFetchingUsers,
  startFetchingOrganizers as startFetchingUsers,
  successFetchingOrganizers as successFetchingUsers,
} from '../organizers/action'

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(startFetchingUsers())

    try {
      const res = await getData('/cms/users')

      res.data.data.forEach((item) => {
        item.organizer = item.organizer.organizer
      })

      dispatch(
        successFetchingUsers({
          organizers: res.data.data,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingUsers())
    }
  }
}
