import { LIST_INSTITUTIONS, LIST_ROLES } from '../actions/ListMasterAction'
import { LLIST_ACCOUNT } from '..//actions/UserAction'

const initialsState = {
    [LIST_INSTITUTIONS]: null,
    [LIST_ROLES]: null,  
    [LLIST_ACCOUNT]  : null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialsState, { type, payload }) => {
    switch (type) {       
        case LLIST_ACCOUNT: 
        case LIST_INSTITUTIONS:
        case LIST_ROLES:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }

}
