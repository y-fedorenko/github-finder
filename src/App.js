import { Route, Routes, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import UserPage from './pages/UserPage';


function App() {
  return (
    <main>
      <div className="wrapper">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path='/users/:login' element={<UserPage /> } />
        </Routes>
      </div>
    </main>
  );
}

export default App;
