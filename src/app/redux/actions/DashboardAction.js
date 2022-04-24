import { GetDashboardOne, GetDashboardTwo } from '../../services/MainService'
import { Payload } from '../../utils/Payload'

export const LIST_DASHBOARD = 'list_dashboard'
export const ListDashboardOneAction = async () => {
    const result = await GetDashboardOne()
    return Payload({ params: { [LIST_DASHBOARD]: result?.data ?? null }, type: LIST_DASHBOARD })
}

export const ListDashboardTwoAction = async () => {
    const result = await GetDashboardTwo()
    return Payload({ params: { [LIST_DASHBOARD]: result?.data ?? null }, type: LIST_DASHBOARD })
}
