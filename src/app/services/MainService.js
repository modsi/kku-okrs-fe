import { httpUtils } from '../utils/HttpUtils'

const { get, post } = httpUtils
const API_ENDPOINT = `http://128.199.225.180/app/api`
const USER_URL = `${API_ENDPOINT}/users`
const MANAGE_URL = `${API_ENDPOINT}/manage`

export const ListInstitutions = async () => {
    return await get(`${MANAGE_URL}/institution`)    
}

export const ListRoles = async () => {
    return await get(`${MANAGE_URL}/role`)
}




