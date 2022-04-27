import { SaveFormService, GetFormeService, UpdateFormService } from '../../services/MainService'
import { Payload } from '../../utils/Payload'


export const SaveFormAction = async (data) => {
  const result = await SaveFormService(data)
  return result?.data
}

export const UpdateFormAction = async (data) => {
  const result = await UpdateFormService(data)
  return result?.data
}


export const LIST_FORM = 'list_form'
export const ListFormAction = async (data = {}) => {
  try {
    const onSearch = {
      ...data,
    }
    const result = await GetFormeService(onSearch)    
    const params = {
      [LIST_FORM]: {
        result: result?.data?.data,
        totalData: result?.data?.data?.totalItems
      }
    }
    return Payload({ params: params, type: LIST_FORM })
  } catch (e) {
    console.error(e)
    return Payload({ params: [], type: LIST_FORM })
  }
}