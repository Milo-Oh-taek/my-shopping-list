import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import Layout from './Layout';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <div className="App">
      {/* <Layout> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* </Layout> */}
    </div>
  );
}

export default App;
