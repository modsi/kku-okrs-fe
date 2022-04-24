import { httpUtils } from '../utils/HttpUtils'

const { get, post, patch, postTokenKku, postLoginKku } = httpUtils
const API_KKU = `https://api.kku.ac.th/v2`
const API_ENDPOINT = `http://localhost:8080/api`
// const API_ENDPOINT = `https://e-project.kku.ac.th/api`
const USER_URL = `${API_ENDPOINT}/users`
const MANAGE_URL = `${API_ENDPOINT}/manage`
const TEMPLATE__URL = `${API_ENDPOINT}/templates`
const DASHBOARD_URL = `${API_ENDPOINT}/dashboard`

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
    return await get(`${TEMPLATE__URL}/list_template?typeId=${typeId}`)
}

export const SaveAccountService = async (data = {}) => {
    return await post(`${USER_URL}/register`, data)
}

export const GetAccountService = async(data = {})=>{
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

export const GetTemplateService = async(data = {})=>{
    return await get(`${TEMPLATE__URL}/list_template?templateName=${data?.str ?? ''}&limit=${data?.size}&offset=${data?.page}`)
}

export const GetDashboardOne = async () => {
    return await get(`${DASHBOARD_URL}/dashboardOne`)
}

export const GetDashboardTwo = async () => {
    return await get(`${DASHBOARD_URL}/dashboardTwo`)
}