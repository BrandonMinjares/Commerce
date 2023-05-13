import React from 'react';
import {Route, HashRouter, Routes} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';

import Dashboard from './components/Dashboard';
import CreateItem from './components/CreateItem';
import Item from './components/Item';

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
        <Route path="/register" element={<Register/>}/>

        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/product/create" element={<CreateItem/>}/>
        <Route path="/product/:id" element={<Item/>}/>
        <Route path="/" element={<Dashboard/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
