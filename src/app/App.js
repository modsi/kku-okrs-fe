import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './config/store/ConfigureStore'
import HomepageScreen from './screens/HomepageScreen';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          {/* <Route  path="/" element={<HomepageScreen/>} />
          <Route  path="/home" element={<MainScreen/>} /> */}
          <Route  path="/" element={<MainScreen/>} />
          <Route  path="/login" element={<LoginScreen/>} />
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
