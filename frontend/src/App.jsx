import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';

import Dashboard from './components/Dashboard';
import CreateItem from './components/CreateItem';
import Item from './components/Item';
import Checkout from './components/Checkout';
import PrivateRoute from './components/PrivateRoute';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/product/create" element={
          <PrivateRoute><CreateItem/></PrivateRoute>
        }/>
        <Route path="/product/:id" element={<Item/>}/>
        <Route path="/checkout" element={
          <PrivateRoute><Checkout/></PrivateRoute>
        }/>
        <Route path="/" element={<Dashboard/>}>
          <Route path="/product/:id" element={<Item/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
