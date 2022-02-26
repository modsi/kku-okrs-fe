import { Payload } from '../../utils/Payload'
export const STORE_SEARCH_ACTION = 'storeSearch'
export const SECOND_STORE_ACTION = 'secondSearch'

const StoreSearchAction = (data = {}) => {

    return Payload({ params: { [STORE_SEARCH_ACTION]: data }, type: STORE_SEARCH_ACTION })
}

export const SecondStoreAction = (data = {}) => {
    console.log('storeSearchstoreSearch act',data);
    return Payload({ params: { [SECOND_STORE_ACTION]: data }, type: SECOND_STORE_ACTION })
}

export default StoreSearchAction

export const STORE_TEMPLATE = 'storeTemplate'
export const StoreTemplateAction = (data = {}) => {
    console.log('StoreTemplateAction act',data);
    return Payload({ params: { [STORE_TEMPLATE]: data }, type: STORE_TEMPLATE })
}
