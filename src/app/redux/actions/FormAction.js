import { SaveFormService, GetFormeService, UpdateFormService, SaveComplateFormService, ExportFormCsv, ExportFormWord } from '../../services/MainService'
import { Payload } from '../../utils/Payload'
import { clearStorege, getStorage } from "../../screens/state/localStorage";

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

function dateNow() {
  var date = new Date();
  var day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  var month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var year = date.getFullYear();
  return year + month;
}

export const EXPORT_CSV = 'EXPORT_CSV'
export const ExportFormCsvAction = async (data) => {

  const result = await ExportFormCsv(data?.id)
  // console.log(result)
  const url = window.URL.createObjectURL(new Blob([result?.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'report-' + data?.name + '-' + dateNow() + '.csv');
  link.click();
  const params = {
    [EXPORT_CSV]: {
      fileName: result?.data,
    }
  }
  return Payload({ params: params, type: EXPORT_CSV })
}

export const EXPORT_WORD = 'EXPORT_WORD'
export const ExportFormWordAction = async (data) => {

  const result = await ExportFormWord(data?.id)
  // console.log(result)
  const url = window.URL.createObjectURL(new Blob([result?.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'report-' + data?.name + '-' + dateNow() + '.docx');
  link.click();
  const params = {
    [EXPORT_WORD]: {
      fileName: result?.data,
    }
  }
  return Payload({ params: params, type: EXPORT_WORD })
}

export const SaveCompalteFormAction = async (id, data) => {
  let obj = {}
  let component = []
  data.component.map((c) => {
    console.log('component', c)
    let o = {
      label: c.label,
      key: c.key
    }
    if (data.status === 1) {
      o.approvedFlag = 1
      o.approvedBy = getStorage('profile')?.username
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
    } else if (c.type === 'select') {
      let v = c.value
      let label = c.options.find(k => k.value = v)?.label
      o.value = v - 1 
      o.labelValue = label
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