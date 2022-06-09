import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './config/store/ConfigureStore'
import Homepage from './screens/Homepage';
import Main from './screens/Main';
import PageControl from './screens/PageControl'

function App() {
  return (
    <Router basename={'/e-Project/kku-okrs-fe'}>
      <Provider store={store}>
        <Routes>
          <Route  path="/" element={<Homepage/>} />
          <Route  path="/admin" element={<Main/>} />
          {/* <Route  path="/" element={<PageControl/>} />           */}
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
