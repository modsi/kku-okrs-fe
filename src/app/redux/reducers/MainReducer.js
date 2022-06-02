import { LIST_INSTITUTIONS, LIST_ROLES, LIST_TYPE_TEPM, LIST_FIELD_TEPM, LIST_YEARS, LIST_STATUS } from '../actions/ListMasterAction'
import { LLIST_ACCOUNT } from '../actions/UserAction'
import {LIST_TEMPLATES} from '../actions/TemplateAction'
import { LIST_DASHBOARD } from '../actions/DashboardAction';
import { LIST_FORM, LIST_FROM_TEMPLATES, LIST_FROM_2, LIST_HISTORY, LIST_STEP } from '../actions/FormAction'

const initialsState = {
    [LIST_STEP]: null,
    [LIST_FROM_2]: null,
    [LIST_FROM_TEMPLATES]: null,
    [LIST_FORM]: null,
    [LIST_TEMPLATES]: null,
    [LIST_FIELD_TEPM]: null,
    [LIST_TYPE_TEPM]: null,
    [LIST_INSTITUTIONS]: null,
    [LIST_ROLES]: null,  
    [LLIST_ACCOUNT]  : null,
    [LIST_DASHBOARD] : null,
    [LIST_YEARS] : null,
    [LIST_STATUS] : null,
    [LIST_HISTORY] : null
    
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialsState, { type, payload }) => {
    switch (type) {
        case LIST_STEP:
        case LIST_FROM_2:
        case LIST_FROM_TEMPLATES:
        case LIST_FORM:
        case LIST_TEMPLATES:
        case LIST_FIELD_TEPM:
        case LIST_TYPE_TEPM:
        case LLIST_ACCOUNT:
        case LIST_INSTITUTIONS:
        case LIST_ROLES:
        case LIST_YEARS:
        case LIST_STATUS:
        case LIST_HISTORY:
        case LIST_DASHBOARD:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }

}
