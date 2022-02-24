import { ListInstitutions, ListRoles } from '../../services/MainService'
import { Payload } from '../../utils/Payload'

export const LIST_INSTITUTIONS = 'listInstitutions'
export const ListInstitutionsAction = async () => {
    const result = await ListInstitutions()
    return Payload({ params: { [LIST_INSTITUTIONS]: result?.data?.data ?? null }, type: LIST_INSTITUTIONS })
}

export const LIST_ROLES = 'listRoles'
export const ListRolesAction = async () => {
    const result = await ListRoles()
    return Payload({ params: { [LIST_ROLES]: result?.data?.data ?? null }, type: LIST_ROLES })
}

