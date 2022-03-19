import { SaveAccountService, GetAccountService, LoginService, UpdateAccountService, GetAccessToken, LoginKkuService } from '../../services/MainService'
import { Payload } from '../../utils/Payload'


export const SaveAccAction = async (data) => {
  const result = await SaveAccountService(data)
  return result?.data
}

export const UpdateAccAction = async (data) => {
  const result = await UpdateAccountService(data)
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
    // console.log('GetAccountService >> result', result)
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


export const LoginSsoAction = async (data) => {
  const result = {}
  try {
    const resToken = await GetAccessToken()
    console.log('resToken >> ', resToken)
    if (resToken?.data?.statusOK) {
      let token = resToken?.data?.data?.accessToken
      const resLogin = await LoginKkuService(data, token)
      console.log('resLogin >> ', resLogin)
      if (resLogin?.data?.statusOK) {
        result.statusOK = true;
      } else {
        result.statusOK = false;
        result.error = resToken;
      }
    } else {
      result.statusOK = false;
      result.error = resToken;
    }
  } catch (err) {
    result.statusOK = false;
    result.error = err.message + ' Cannot access to api.kku.ac.th';
  }
  return result
}