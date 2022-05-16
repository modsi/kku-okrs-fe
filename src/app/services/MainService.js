import { httpUtils } from '../utils/HttpUtils'

const { get, post, patch, postTokenKku, postLoginKku, downloadFile } = httpUtils
const API_KKU = `https://api.kku.ac.th/v2`
// const API_ENDPOINT = `http://localhost:8080/api`
const API_ENDPOINT = `https://e-project.kku.ac.th/api`
const USER_URL = `${API_ENDPOINT}/users`
const MANAGE_URL = `${API_ENDPOINT}/manage`
const TEMPLATE__URL = `${API_ENDPOINT}/templates`
const DASHBOARD_URL = `${API_ENDPOINT}/dashboard`
const FORM__URL = `${API_ENDPOINT}/form`
const REPORT_URL = `https://e-project.kku.ac.th/api/report/`

export const ListInstitutions = async () => {
    return await get(`${MANAGE_URL}/institution`)
}

export const ListRoles = async () => {
    return await get(`${MANAGE_URL}/role`)
}

export const ListTypeTemplate = async () => {
    return await get(`${TEMPLATE__URL}/type_template`)
}

export const ListFieldMasterTemplate = async (typeId) => {
    return await get(`${TEMPLATE__URL}/list_template_master?typeId=${typeId}`)
}

export const SaveAccountService = async (data = {}) => {
    return await post(`${USER_URL}/register`, data)
}

export const GetAccountService = async (data = {}) => {
    return await get(`${MANAGE_URL}/accounts?page=${data.page}&size=${data.size}&q=${data.str}`)
}

export const LoginService = async (data = {}) => {
    return await post(`${USER_URL}/login`, data)
}

export const UpdateAccountService = async (data = {}) => {
    return await patch(`${USER_URL}/update`, data)
}

export const GetAccessToken = async () => {
    return await postTokenKku(`${API_KKU}/oauth/token`)
}

export const LoginKkuService = async (data = {}, token) => {
    return await postLoginKku(`${API_KKU}/ldap/email/${data?.username}/auth`, data, token)
}

export const SaveTemplateService = async (data = {}) => {
    return await post(`${TEMPLATE__URL}/create_component_template`, data)
}

export const GetTemplateService = async (data = {}) => {
    return await get(`${TEMPLATE__URL}/list_template?templateName=${data?.str ?? ''}&limit=${data?.size}&offset=${data?.page}`)
}

export const GetDashboardOne = async () => {
    return await get(`${DASHBOARD_URL}/dashboardOne`)
}

export const GetDashboardTwo = async () => {
    return await get(`${DASHBOARD_URL}/dashboardTwo`)
}
export const UpdateTemplateService = async (data = {}) => {
    return await post(`${TEMPLATE__URL}/update_component_template`, data)
}

export const SaveFormService = async (data = {}) => {
    return await post(`${FORM__URL}/create_form`, data)
}

export const GetFormeService = async(data = {})=>{
    return await get(`${FORM__URL}/list_form?name=${data?.str ?? ''}&roleId=${data?.roleId}&username=${data?.username}`)
}

export const UpdateFormService = async (data = {}) => {
    return await post(`${FORM__URL}/update_from`, data)
}

export const SaveComplateFormService = async (data = {}) => {
    return await post(`${FORM__URL}/complate_form`, data)
}

export const ExportFormCsv = async (formId) => {
    return await downloadFile(`${REPORT_URL}complete_report_csv?formId=${formId}`)

}

export const ExportFormWord = async (formId) => {
    return await downloadFile(`${REPORT_URL}complete_report_doc?formId=${formId}`)
}