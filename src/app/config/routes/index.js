import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router'; /*Redirect*/
import ProductTypeSetupScreen from './screens/ProductTypeSetupScreen';


// import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
// import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
// import { push, replace } from 'connected-react-router';

// import MainRoutesConfig from './MainRoutes';

// import { contextRoot, webContextPath } from '@Config/AppConfig';

// import MainScreen from '@Screen/MainScreen';
// import MainViewCustomer from '@Screen/MainViewCustomer';

// // const LoginPage = lazy(() => import('@Screen/Login'));
// import LoginPage from '@Screen/Login';

// const locationHelper = locationHelperBuilder({});

// const userIsNotAuthenticated = connectedReduxRedirect({
// 	// This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
// 	redirectPath: (state, ownProps) => {
// 		return locationHelper.getRedirectQueryParam(ownProps) || webContextPath + '/home';
// 	},
// 	// This prevents us from adding the query parameter when we send the user away from the login page
// 	allowRedirectBack: false,
// 	// If selector is true, wrapper will not redirect
// 	// So if there is no user data, then we show the page
// 	authenticatedSelector: (state) => !state.authenReducer.isLoggedIn,
// 	// A nice display name for this check
// 	wrapperDisplayName: 'UserIsNotAuthenticated',
// 	redirectAction: push,
// });

// const userIsAuthenticated = connectedReduxRedirect({
// 	redirectPath: contextRoot,
// 	allowRedirectBack: false,
// 	authenticatedSelector: (state) => state.authenReducer.isLoggedIn,
// 	wrapperDisplayName: 'UserIsAuthenticated',
// 	// This should be a redux action creator
// 	redirectAction: replace,
// });

const Routes = () =>{
	
		return (
			<>
				<Suspense fallback={<div>Page is Loading.</div>}>
					<Switch>
						{/* <Route exact path="/" component={() => <Redirect to={'/login'} />} /> */}
						<Route exact path="/" component={ProductTypeSetupScreen} />
						{/* <Route exact path={'/login'} component={userIsNotAuthenticated(LoginPage)} /> */}
						{/* <Route path={`${webContextPath}`} component={userIsAuthenticated(MainRoutesConfig)} /> */}
					</Switch>
				</Suspense>
			</>
		);
	
}

export default Route;