import { SaveTemplateService, GetTemplateService } from '../../services/MainService'
import { Payload } from '../../utils/Payload'


export const SaveTempateAction = async (data) => {
  const result = await SaveTemplateService(data)
  return result?.data
}


export const LIST_TEMPLATES = 'list_template'
export const ListTemplateAction = async (data = {}) => {
  try {
    const onSearch = {
      ...data,
      page: 0,
      size: 1000000
    }
    console.log('GetTemplateService >> onSearch', onSearch)
    const result = await GetTemplateService(onSearch)    
    const params = {
      [LIST_TEMPLATES]: {
        result: result?.data?.data,
        totalData: result?.data?.data?.totalItems
      }
    }
    return Payload({ params: params, type: LIST_TEMPLATES })
  } catch (e) {
    console.error(e)
    return Payload({ params: [], type: LIST_TEMPLATES })
  }
}