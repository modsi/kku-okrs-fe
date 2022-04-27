import { LIST_INSTITUTIONS, LIST_ROLES, LIST_TYPE_TEPM, LIST_FIELD_TEPM } from '../actions/ListMasterAction'
import { LLIST_ACCOUNT } from '../actions/UserAction'
import {LIST_TEMPLATES} from '../actions/TemplateAction'
import { LIST_DASHBOARD } from '../actions/DashboardAction';
import { LIST_FORM } from '../actions/FormAction'

const initialsState = {
    [LIST_FORM]: null,
    [LIST_TEMPLATES]: null,
    [LIST_FIELD_TEPM]: null,
    [LIST_TYPE_TEPM]: null,
    [LIST_INSTITUTIONS]: null,
    [LIST_ROLES]: null,  
    [LLIST_ACCOUNT]  : null,
    [LIST_DASHBOARD] : null
    
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialsState, { type, payload }) => {
    switch (type) {
        case LIST_FORM:
        case LIST_TEMPLATES:
        case LIST_FIELD_TEPM:
        case LIST_TYPE_TEPM:
        case LLIST_ACCOUNT:
        case LIST_INSTITUTIONS:
        case LIST_ROLES:
        case LIST_DASHBOARD:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }

}
