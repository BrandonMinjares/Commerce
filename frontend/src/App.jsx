import React from 'react';
import {Route, HashRouter, Routes} from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';


/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
