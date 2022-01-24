// import { SEARCH_CUSTOMER_CASH_ACTION } from '../actions/SearchCustomerCashReportAction'
// import { SEARCH_EFFECTIVE_ACTION } from '../actions/SearchEffectiveReportAction'
// import { LIST_PRODUCT_ACTION } from '../actions/ListProductAction'
// import { GET_REPORT_CASH_BALANCE_ACTION } from '../actions/cashBalance/GetReportCashBalanceAction';
// import { LIST_SETTLEMENT_TYPE_ACTION } from '../actions/ListSettlementTypeAction'
// import { VIEW_DAILY_MONTHLY_SETTLE_ACTION } from '../actions/ViewDailyMonthlySettlementAction'
// import { VIEW_DAILY_MONTHLY_SETTLE_TABLE_ACTION } from '../actions/ViewDailyMonthlySettlementTableAction'
// import { SEARCH_USING_CREDIT_LIMIT_TRADE_ACTION } from '../actions/usingCreditLimit/SearchUsingCreditLimitReportAction'
// import { SETTLEMENT_NAME_AUTO_COMPLETE, SETTLEMENT_MULTI_AUTO_COMPLETE, SETTLEMENT_REFNO_AUTO_COMPLETE, LIST_SERIAL_NO_AUTO_COMPLETE } from '../actions/SettlementCustomerAutoCompleteAction'
// import { LIST_CREDIT_TRADE_STATUS_ACTION } from '../actions/ListCreditTradeStatusAction'
// import { SEARCH_CLIENT_INFORMATION_ACTION } from '../actions/clientInformations/SearchClientInformationReportAction'
// import { SEARCH_SETTLEMENT_TRANSACTION_REPORT_ACTION } from '../actions/settlementTransaction/SettlementTransactionReportAction'
// import { LIST_PRODUCT_ACTION_TYPE } from '../actions/ListProductAction'
// import { SEARCH_REPORT_CASH_BALANCE_CONTROL_ACTION } from "../actions/cashBalance/SearchReportCashBalanceControlAction";
// import { SEARCH_DAILY_DEWD_ACTION } from '../actions/DailyCashDepositAction';
// import { SEARCH_ATS_EXPORT } from '../actions/ATSExportAction';
// import { LIST_ALL_PRODUCT_ACTION } from '../actions/ListProductAction'
// import { SEARCH_CUSTOMER_INFO_ACTION } from '../actions/assetBalanceAndMovement/SearchAction'
// import { LIST_CURRENCY_ACTION } from '../actions/ListCurrencyAction'
// import { SEARCH_ASSET_TRANSACTION_ACTION } from '../actions/assetBalanceAndMovement/SearchAction'
// import { SEARCH_ASSET_PENDING_TRANSACTION_ACTION } from '../actions/assetBalanceAndMovement/SearchAction'
// import { SEARCH_USING_CREDIT_LIMIT_SETTLEMENT_ACTION } from '../actions/usingCreditLimit/SearchUsingCreditLimitReportAction'
// import { SEARCH_CASH_MOVE_TRANSACTION_ACTION } from '../actions/cashMovement/SearchAction'
// import { SEARCH_CASH_MOVE_PENDING_TRANSACTION_ACTION } from '../actions/cashMovement/SearchAction'
// import { SEARCH_INTEREST_REPORT_ACTION } from '../actions/interest/SearchInterestReportAction';
// import { DOWNLOAD_INTEREST_REPORT_ACTION } from '../actions/interest/DownloadInterestReportAction';
// import { ON_CHANGE_REPORT_TYPE_ACTION } from '../actions/interest/OnChangeReportTypeAction';
// import { SEARCH_CASH_MOVE_ALL_TRANSACTION_ACTION } from '../actions/cashMovement/SearchAction'

const initialsState = {
    // [SEARCH_CASH_MOVE_ALL_TRANSACTION_ACTION]: null,
    // [SEARCH_CASH_MOVE_TRANSACTION_ACTION]: null,
    // [SEARCH_CASH_MOVE_PENDING_TRANSACTION_ACTION]: null,
    // [SEARCH_CUSTOMER_CASH_ACTION]: null,
    // [SEARCH_EFFECTIVE_ACTION]: null,
    // [LIST_PRODUCT_ACTION]: null,
    // [GET_REPORT_CASH_BALANCE_ACTION]: null,
    // [LIST_SETTLEMENT_TYPE_ACTION]: null,
    // [SETTLEMENT_NAME_AUTO_COMPLETE]: null,
    // [SETTLEMENT_REFNO_AUTO_COMPLETE]: null,
    // [SETTLEMENT_MULTI_AUTO_COMPLETE]: null,
    // [VIEW_DAILY_MONTHLY_SETTLE_ACTION]: null,
    // [VIEW_DAILY_MONTHLY_SETTLE_TABLE_ACTION]: null,
    // [SEARCH_USING_CREDIT_LIMIT_TRADE_ACTION]: null,
    // [LIST_CREDIT_TRADE_STATUS_ACTION]: null,
    // [SEARCH_CLIENT_INFORMATION_ACTION]: null,
    // [LIST_SERIAL_NO_AUTO_COMPLETE]: null,
    // [SEARCH_SETTLEMENT_TRANSACTION_REPORT_ACTION]: null,
    // [LIST_PRODUCT_ACTION_TYPE]: null,
    // [SEARCH_DAILY_DEWD_ACTION]: null,
    // [SEARCH_ATS_EXPORT]: null,
    // [LIST_ALL_PRODUCT_ACTION]: null,
    // [SEARCH_CUSTOMER_INFO_ACTION]: null,
    // [LIST_CURRENCY_ACTION]: null,
    // [SEARCH_ASSET_TRANSACTION_ACTION]: null,
    // [SEARCH_ASSET_PENDING_TRANSACTION_ACTION]: null,
    // [SEARCH_USING_CREDIT_LIMIT_SETTLEMENT_ACTION]: null,
    // [SEARCH_INTEREST_REPORT_ACTION]: null,
    // [DOWNLOAD_INTEREST_REPORT_ACTION]: null,
    // [ON_CHANGE_REPORT_TYPE_ACTION]: null,
};

export default (state = initialsState, { type, payload }) => {
    // switch (type) {        
    //     case SEARCH_CASH_MOVE_TRANSACTION_ACTION:
    //     case SEARCH_CASH_MOVE_ALL_TRANSACTION_ACTION:
    //     case SEARCH_CASH_MOVE_PENDING_TRANSACTION_ACTION:
    //     case SEARCH_USING_CREDIT_LIMIT_SETTLEMENT_ACTION:
    //     case SEARCH_ASSET_PENDING_TRANSACTION_ACTION:
    //     case SEARCH_ASSET_TRANSACTION_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case LIST_CURRENCY_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case SEARCH_CUSTOMER_INFO_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case LIST_ALL_PRODUCT_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case VIEW_DAILY_MONTHLY_SETTLE_TABLE_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case VIEW_DAILY_MONTHLY_SETTLE_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case SETTLEMENT_REFNO_AUTO_COMPLETE:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case SETTLEMENT_NAME_AUTO_COMPLETE:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case SETTLEMENT_MULTI_AUTO_COMPLETE:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case LIST_SETTLEMENT_TYPE_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case SEARCH_CUSTOMER_CASH_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case SEARCH_EFFECTIVE_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case LIST_PRODUCT_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case GET_REPORT_CASH_BALANCE_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case SEARCH_USING_CREDIT_LIMIT_TRADE_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case LIST_CREDIT_TRADE_STATUS_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case SEARCH_CLIENT_INFORMATION_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case LIST_SERIAL_NO_AUTO_COMPLETE:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case SEARCH_SETTLEMENT_TRANSACTION_REPORT_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case LIST_PRODUCT_ACTION_TYPE:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case SEARCH_DAILY_DEWD_ACTION:
    //         return {
    //             ...state,
    //             ...payload
    //         }
    //     case SEARCH_REPORT_CASH_BALANCE_CONTROL_ACTION:
    //         return {
    //             ...state,
    //             ...payload,
    //         };
    //     case SEARCH_ATS_EXPORT:
    //         return {
    //             ...state,
    //             ...payload,
    //         };
    //     case SEARCH_INTEREST_REPORT_ACTION:
    //         return {
    //             ...state,
    //             ...payload,
    //         };
    //     case DOWNLOAD_INTEREST_REPORT_ACTION:
    //         return {
    //             ...state,
    //             ...payload,
    //         };
    //     case ON_CHANGE_REPORT_TYPE_ACTION:
    //         return {
    //             ...state,
    //             ...payload,
    //         };

    //     default:
            return state;
    // }

}
