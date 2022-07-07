
import { STORE_SEARCH_ACTION, SECOND_STORE_ACTION, STORE_TEMPLATE, STORE_BUDGET_USED,STORE_BUDGET } from '../actions/StoreSearchAction'
const initialState = {
    [STORE_SEARCH_ACTION]: null,
    [SECOND_STORE_ACTION]: null,
    [STORE_TEMPLATE]: null,
    [STORE_BUDGET_USED]: null, 
    [STORE_BUDGET]: null,   
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case STORE_BUDGET:
        case STORE_BUDGET_USED:
        case STORE_TEMPLATE:
        case STORE_SEARCH_ACTION:
            return { ...state, ...payload }
        case SECOND_STORE_ACTION:
            console.log('storeSearchstoreSearch red', SECOND_STORE_ACTION);
            return { ...state, ...payload }

        default:
            return state
    }
}
