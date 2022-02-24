import { combineReducers } from 'redux';

import mainReducer from './MainReducer';
import storeSearchReducer from './StoreSearchReducer';

export default combineReducers({
	storeSearchReducer:storeSearchReducer,
	main:mainReducer,
})
