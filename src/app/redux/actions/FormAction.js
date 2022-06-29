import {
  GetStepService,
  GetFormTemplateService,
  SaveFormService,
  GetFormeService,
  UpdateFormService,
  SaveComplateFormService,
  ExportFormCsv,
  ExportFormWord,
  GetHistoryService
} from "../../services/MainService";
import { Payload } from "../../utils/Payload";
import { clearStorege, getStorage } from "../../screens/state/localStorage";
import { DATE_MM, DATE_NORMAL } from "../../utils/Elements"
import moment from "moment";
import { SetIsusedAction } from "./TemplateAction"

export const SaveFormAction = async (data) => {
  const result = await SaveFormService(data);
  console.log(result?.data);
  if (result?.data?.data.id) {
    let r = await SaveCompalteFormAction(result?.data?.data.id, data);
  }
  return result?.data;
};

export const UpdateFormAction = async (data) => {
  // data.status = data.status ?? (data.formStatus ?? (!data.status || !isNaN(+data.status) ? data.status : 0))
  const result = await UpdateFormService(data);
  console.log("UpdateFormAction", result);
  if (result?.data?.error === null && result?.data?.data[0].id) {
    let r = await SaveCompalteFormAction(result?.data?.data[0].id, data);
  }
  return result?.data;
};

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

export const EXPORT_CSV = "EXPORT_CSV";
export const ExportFormCsvAction = async (data) => {
  const result = await ExportFormCsv(data?.id);
  // console.log(result)
  const url = window.URL.createObjectURL(new Blob([result?.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    "report-" + data?.name + "-" + dateNow() + ".csv"
  );
  link.click();
  const params = {
    [EXPORT_CSV]: {
      fileName: result?.data,
    },
  };
  return Payload({ params: params, type: EXPORT_CSV });
};

export const EXPORT_WORD = "EXPORT_WORD";
export const ExportFormWordAction = async (data) => {
  const result = await ExportFormWord(data?.id);
  // console.log(result)
  const url = window.URL.createObjectURL(new Blob([result?.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    "report-" + data?.name + "-" + dateNow() + ".docx"
  );
  link.click();
  const params = {
    [EXPORT_WORD]: {
      fileName: result?.data,
    },
  };
  return Payload({ params: params, type: EXPORT_WORD });
};

export const SaveCompalteFormAction = async (id, data) => {
  console.log("SaveCompalteFormAction", data);
  let obj = {};
  let component = [];
  data.component.map((c) => {
    // console.log('component', c)
    let o = {
      label: c.label,
      key: c.key,
    };
    if (data.status === 1) {
      o.approvedFlag = 1;
      o.approvedBy = getStorage("profile")?.username;
    }
    // if (c.key === 'OKRs_Status') {
    //   let v = c.value
    //   let label = propsStatus.options.find(k => k.value === v)?.label
    //   o.value = v
    //   o.labelValue = label
    //   component.push(o)
    // } else 
    // console.log('component', c)
    if (c.value && c.key === 'OKRs_Status') {
      let v = c.value
      let label = c.options.find(k => k.value === v)?.label
      o.value = v
      o.labelValue = label + (v > 9 ? (v === 10 ? (c.date ? (': ' + moment(c.date).format(DATE_NORMAL)) : '') : (c.detail ? (' : ' + c.detail) : '')) : '')
      component.push(o)
    } else if (c.value && c.key === 'OKRs_PDCA') {
      let ov = '['
      c.value.map((v) => {
        ov += (ov === '[' ? '' : ',')
        ov += '{"month" : "' + (v.month ? (moment(v.month[0]).format(DATE_MM) + '-' + moment(v.month[1]).format(DATE_MM)) : '') + '", "title" : "' + v.title + '", "index": ' + v.index + '}'
      })
      ov += ']'
      o.value = ov
      // console.log('o', ov)
      component.push(o)
    } else if (c.value && (c.key === 'OKRs_TargetGroup')) {
      let ov = '['
      c.value.map((v) => {
        ov += (ov === '[' ? '' : ',')
        ov += '{"key" : "' + (v.key ?? '') + '", "value" : "' + v.value + '", "index": ' + v.index + '}'
      })
      ov += ']'
      o.value = ov
      // console.log('o', ov)
      component.push(o)
    } else if (c.value && c.type === 'table') {
      // console.log('o > table >', c)
      let columnsItems = ''
      c.columns.map((v) => {
        columnsItems += (columnsItems === '' ? '' : ',')
        columnsItems += '"' + v.colLabel + '"'
      })
      let rowsItems = ''
      for (let i = 1; i <= c.rows; i++) {
        let r = [...(c.value?.filter(v => v.index === i))]
        // console.log('o > table > r', r)
        let rows = ''
        c.columns.map((v) => {
          rows += (rows === '' ? '' : ',')
          rows += '"' + (r.find(vl => vl.key === v.colKey).value) + '"'
        })
        rowsItems += (rowsItems === '' ? '' : ',')
        rowsItems += '[' + rows + ']'
      }
      let ov = '{ "columnsItems": [' + columnsItems + '], "rowsItems": [' + rowsItems + '] }'
      o.value = ov
      o.isTable = true;
      component.push(o)
      // } else if (c.value && Array.isArray(c.value)) {
      //   console.log('c.value',c)
      //   c.value.map((v) => {
      //     o.label = v.label
      //     o.key = v.key
      //     o.value = v.value
      //     component.push(o)
      //   })
    } else if (c.value && typeof c.value === 'object') {
      let v = c.value
      o.value = v.value
      o.labelValue = v.label
      component.push(o)
    } else if (c.value && c.type === 'select') {
      let v = c.value
      let label = c.options.find(k => k.value === v)?.label
      o.value = v
      o.labelValue = label
      component.push(o)
    } else if (c.value) {
      o.value = c.value;
      component.push(o);
    }
  })
  obj.formId = id
  obj.component = component?.filter(c => c.key)
  // console.log('SaveComplateFormService >> ',obj)
  const result = await SaveComplateFormService(obj)
  return result?.data
}

export const LIST_FORM = "list_form";
export const ListFormAction = async (data = {}) => {
  try {
    const onSearch = {
      ...data,
    };
    const result = await GetFormeService(onSearch);
    const params = {
      [LIST_FORM]: {
        result: result?.data?.data,
        totalData: result?.data?.data?.totalItems,
      },
    };
    return Payload({ params: params, type: LIST_FORM });
  } catch (e) {
    console.error(e);
    return Payload({ params: [], type: LIST_FORM });
  }
};

export const LIST_STEP = 'list_step'
export const ListStepAction = async (data = {}) => {
  try {
    const onSearch = {
      ...data,
    }
    const result = await GetStepService(onSearch)
    const params = {
      [LIST_STEP]: {
        result: result?.data?.data,
        totalData: result?.data?.data?.totalItems
      }
    }
    return Payload({ params: params, type: LIST_STEP })
  } catch (e) {
    console.error(e)
    return Payload({ params: [], type: LIST_STEP })
  }
}

export const LIST_FROM_TEMPLATES = 'list_form_template'
export const ListFormTemplateAction = async (data = {}) => {
  try {
    const result = await GetFormTemplateService(data)
    const params = {
      [LIST_FROM_TEMPLATES]: {
        result: result?.data?.data,
        totalData: result?.data?.data?.totalItems,
      },
    };
    return Payload({ params: params, type: LIST_FROM_TEMPLATES });
  } catch (e) {
    console.error(e);
    return Payload({ params: [], type: LIST_FROM_TEMPLATES });
  }
};

export const LIST_FROM_2 = "list_form_2";
export const ListForm2Action = async (data = {}) => {
  try {
    const result = await GetFormTemplateService(data)
    const params = {
      [LIST_FROM_2]: {
        result: result?.data?.data,
        totalData: result?.data?.data?.totalItems,
      },
    };
    return Payload({ params: params, type: LIST_FROM_2 });
  } catch (e) {
    console.error(e);
    return Payload({ params: [], type: LIST_FROM_2 });
  }
};

export const LIST_HISTORY = "list_historys";
export const ListHistoryAction = async (data = {}) => {
  try {
    const onSearch = {
      ...data,
    };
    const result = await GetHistoryService(onSearch);

    console.log('adsadsadas', result)

    const params = {
      [LIST_HISTORY]: {
        result: result?.data?.data,
        totalData: result?.data?.data?.totalItems,
      },
    };
    return Payload({ params: params, type: LIST_HISTORY });
  } catch (e) {
    console.error(e);
    throw e;
    // return Payload({ params: [], type: LIST_HISTORY });
  }
};

export const propsPic =
{
  "id": "00004",
  "index": 0,
  "key": "OKRs_PIC",
  "size": "long",
  "type": "title",
  "align": "left",
  "labelPosition": "vertical",
  "permission": 0,
}

export const propsTargetGroupNum =
{
  "id": "00003",
  "index": 0,
  "key": "OKRs_TargetGroupNum",
  "label": "จำนวนกลุ่มเป้าหมาย",
  "permission": 0,
  "size": "long",
  "type": "input",
  "align": "left",
  "labelPosition": "vertical"
}

export const propsSuccess =
{
  "id": "00002",
  "index": 0,
  "key": "OKRs_Success",
  "label": "ความสำเร็จ",
  "size": "long",
  "type": "title",
  "align": "left",
  "labelPosition": "vertical",
  "permission": 0,
}

export const propsIds =
{
  "id": "00001",
  "index": 0,
  "key": "OKRs_Ids",
  "size": "long",
  "type": "title",
  "permission": 2,
  "align": "left",
  "labelPosition": "vertical"
}

export const propsStatus =
{
  "id": "00000",
  "index": 4000,
  "key": "OKRs_Status",
  "size": "long",
  "type": "select",
  "align": "left",
  "permission": 2,
  "label": "สถานะ",
  "required": true,
  "options": [
    {
      "index": 0,
      "label": "ขออนุมัติโครงการ",
      "value": 0
    },
    {
      "index": 1,
      "label": "สิ้นสุดโครงการ",
      "value": 1
    },
    {
      "index": 2,
      "label": "รับคืนแก้ไข",
      "value": 2
    },
    {
      "index": 2,
      "label": "ส่งคืนแผนปฏิบัติการแก้ไข",
      "value": 6
    },
    {
      "index": 3,
      "label": "ส่งคืนแผนงบประมาณแก้ไข",
      "value": 7
    },
    {
      "index": 4,
      "label": "ส่งคืนผู้ใช้งานแก้ไข",
      "value": 8
    },
    {
      "index": 5,
      "label": "ส่งคืนเจ้าของเรื่อง",
      "value": 3
    },
    {
      "index": 6,
      "label": "ส่งเงินยืม",
      "value": 4
    },
    {
      "index": 7,
      "label": "เบิกจ่ายโครงการ",
      "value": 5
    },
    {
      "index": 8,
      "label": "วันที่ส่งเบิกกองคลัง",
      "value": 10
    },
    {
      "index": 9,
      "label": "ผู้รับผิดชอบการเงิน",
      "value": 11
    },
    {
      "index": 10,
      "label": "อื่นๆ",
      "value": 12
    }
  ],
  "labelPosition": "vertical"
}

export const onFormSubmit = async (profile, form, listComponent) => {
  console.log("start onFormSubmit", profile, form.getFieldsValue(), listComponent);
  let res = {};
  let data = listComponent;
  data.templateId = listComponent?.templateId ?? listComponent?.template_id;
  data.templateName = listComponent?.templateName;
  data.typeId = listComponent?.typeId ?? listComponent?.type_id;
  data.id = listComponent?.id;
  data.stepId = listComponent?.stepId ?? listComponent?.step_id;
  data.status = listComponent?.status && !isNaN(+listComponent?.status) ? listComponent?.status : (listComponent?.form_status ?? (listComponent?.formStatus ?? 0));
  let components = listComponent?.component
  let countTargetGroup = 0;
  Object.keys(form.getFieldsValue()).forEach(function (key) {
    if (key === 'OKRs_Ids') {
      let c = components.find(k => k.key === 'OKRs_Ids')
      if (!c) {
        c = propsIds
        components.push(c)
      }
      let ids = form.getFieldValue('OKRs_Ids');
      c.label = 'เลขการรับเงิน : ' + ids
      c.value = ids
    } else {
      let c = components.find((k) => k.key === key);
      if (c) {
        c.value = form.getFieldValue(key) ?? null;
      } else {
        let s = key.split('#')
        // console.log('key.split', s)
        c = components.find((k) => k.key === s[1] || k.key === s[0]);
        if (c) {
          let v = form.getFieldValue(key);
          // console.log('c', c, v)
          if (key.startsWith('OKRs_Status')) {
            if (s[1] === 'date') {
              c.date = v
            } else {
              c.detail = v
            }
          } else if (key.startsWith('OKRs_PDCA')) {
            let vo = {}
            if (s[1] === 'title') {
              vo = {
                index: parseInt(s[2]),
                title: v ?? ""
              }
            } else {
              vo = {
                index: parseInt(s[2]),
                month: v ?? ""
              }
            }

            if (!c.value) {
              c.value = []
              c.value.push(vo)
            } else {
              let old = c.value.find(v => v.index === vo.index)
              if (!old) {
                c.value.push(vo)
              } else {
                Object.assign(old, vo)
              }
            }
          } else if (key.startsWith('OKRs_TargetGroup')) {
            let vo = {}
            if (s[1] === 'label') {
              vo = {
                index: 6,
                label: v
              }
            } else {
              // console.log('s[1]',s[1], parseInt(s[1]))
              vo = {
                index: parseInt(s[1]),
                value: v ?? ""
              }

              if (v && v != "") {
                countTargetGroup++;
              }
            }
            if (!c.value) {
              c.value = []
              c.value.push(vo)
            } else {
              let old = c.value.find(v => v.index === vo.index)
              if (!old) {
                c.value.push(vo)
              } else {
                Object.assign(old, vo)
              }
            }

          } else {
            let vo = {
              index: parseInt(s[2]),
              key: s[0],
              value: v ?? ''
            }
            if (!c.value) {
              c.value = []
              c.value.push(vo)
            } else {
              let old = c.value.find(v => v.index === vo.index && v.key === vo.key)
              if (!old) {
                c.value.push(vo)
              } else {
                Object.assign(old, vo)
              }
            }
          }
        }
      }


      if (key === 'OKRs_Status') {
        console.log('OKRs_Status', c)
        if (c === null || c === undefined) {
          c = propsStatus
          components.push(c)
        }
        let value = form.getFieldValue(key)
        if (value === 1) {
          data.status = 1
          data.stepId = 5
        } else if (value === 8 || value === 6 || value === 7) {
          data.status = 0
          data.stepId = value
          // } else {
          //   data.status = 0
          //   data.stepId = 4
        }
      }
    }
  });

  // if (!components?.find(f => f.key === 'OKRs_PIC')) {
  components = components?.filter(f => f.key !== 'OKRs_PIC');
  let sp = propsPic
  sp.value = data.groupTypeId ?? data.group_type_id
  components.push(sp)
  // }

  if (countTargetGroup > 0) {
    // components = components?.filter(f => f.key !== 'OKRs_TargetGroupNum');
    // let s = propsTargetGroupNum
    // s.value = countTargetGroup
    // components.push(s)
  }

  if (form.getFieldValue('OKRs_Value') || form.getFieldValue('OKRs_ResultValue')) {
    components = components?.filter(f => f.key !== 'OKRs_Success');
    let s = propsSuccess
    let b1 = form.getFieldValue('OKRs_Value') && !isNaN(+form.getFieldValue('OKRs_Value')) ? form.getFieldValue('OKRs_Value') : 0
    let b2 = form.getFieldValue('OKRs_ResultValue') && !isNaN(+form.getFieldValue('OKRs_ResultValue')) ? form.getFieldValue('OKRs_ResultValue') : 0
    // console.log('check OKRs_Success', b1, b2)
    let val = b1 <= b2 ? 'success' : 'failed'
    s.value = val
    components.push(s)
  }

  if (!data.stepId) {
    data.stepId = 1
  }

  if (profile?.role_id === '3' && (data.stepId === '1' || data.stepId === 1)) {
    data.stepId = 10
  } else if (profile?.role_id === '4' && (data.stepId === '1' || data.stepId === 1)) {
    data.stepId = 11
  }
  data.name = form.getFieldValue('name')
  if (form.getFieldValue('group')) {
    data.groupid = form.getFieldValue('group') ?? null
  }
  data.component = components
  try {
    if (listComponent.id) {
      res = await UpdateFormAction(data);
    } else {
      res = await SaveFormAction(data);
      if (res.error === null) {
        await SetIsusedAction({ id: data.templateId, isUsed: true })
      }
    }

  } catch (err) {
    throw (err);
  } finally {
    return res;
  }
};
