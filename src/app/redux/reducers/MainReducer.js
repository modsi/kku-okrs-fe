import { LIST_INSTITUTIONS, LIST_ROLES } from '../actions/ListMasterAction'

const initialsState = {
    [LIST_INSTITUTIONS]: null,
    [LIST_ROLES]: null,    
};

export default (state = initialsState, { type, payload }) => {
    switch (type) {        
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
