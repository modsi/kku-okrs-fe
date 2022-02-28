import { SaveAccountService, GetAccountService, LoginService } from '../../services/MainService'
import { Payload } from '../../utils/Payload'


export const SaveAccAction = async (data) => {
  const result = await SaveAccountService(data)
  return result?.data
}

export const LLIST_ACCOUNT = 'list_account'
export const listAccountAction = async (data = {}) => {
  try {
    const onSearch = {
      ...data, 
      page: 0,
      size: 1000000     
    }
    const result = await GetAccountService(onSearch)
    console.log('GetAccountService >> result', result)
    const params = {
      [LLIST_ACCOUNT]: {
        result: result?.data?.data,
        totalData: result?.data?.data?.totalItems       
      }
    }
    return Payload({ params: params, type: LLIST_ACCOUNT })
  } catch (e) {
    console.error(e)
    return Payload({ params: [], type: LLIST_ACCOUNT })
  }
}

export const LoginAction = async (data) => {
  const result = await LoginService(data)
  return result?.data
}