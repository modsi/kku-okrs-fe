
import { STORE_SEARCH_ACTION,SECOND_STORE_ACTION } from '../actions/StoreSearchAction'
const initialState = {
    [STORE_SEARCH_ACTION]: null,
    [SECOND_STORE_ACTION]: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case STORE_SEARCH_ACTION:
            return { ...state, ...payload }
        case SECOND_STORE_ACTION:
            console.log('storeSearchstoreSearch red',SECOND_STORE_ACTION);
            return { ...state, ...payload }

        default:
            return state
    }
}
