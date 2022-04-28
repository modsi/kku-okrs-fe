import { SaveFormService, GetFormeService, UpdateFormService, SaveComplateFormService } from '../../services/MainService'
import { Payload } from '../../utils/Payload'


export const SaveFormAction = async (data) => {
  const result = await SaveFormService(data)
  console.log(result?.data)
  if (result?.data?.data.id) {
    let r = await SaveCompalteFormAction(result?.data?.data.id, data);
  }
  return result?.data
}

export const UpdateFormAction = async (data) => {
  const result = await UpdateFormService(data)
  console.log('UpdateFormAction', result?.data?.data[0])
  if (result?.data?.data[0].id) {
    let r = await SaveCompalteFormAction(result?.data?.data[0].id, data);
  }
  return result?.data
}

export const SaveCompalteFormAction = async (id, data) => {
  let obj = {}
  let component = []
  data.component.map((c) => {
    // console.log('component', c)
    let o = {
      label: c.label,
      key: c.key
    }
    if (c.value && Array.isArray(c.value)) {
      c.value.map((v) => {
        o.label = v.label
        o.key = v.key
        o.value = v.value
        component.push(o)
      })
    } else if (c.value && typeof c.value === 'object') {
      let v = c.value
      o.value = v.value
      o.labelValue = v.label
      component.push(o)
    } else {
      o.value = c.value
      component.push(o)
    }
  })
  obj.formId = id
  obj.component = component
  console.log(obj)
  const result = await SaveComplateFormService(obj)
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