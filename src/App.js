import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogingPage from './pages/LoginPage';
import Profile from './pages/Profile';
import CreatePage from './pages/create';
import EntryPage from './pages/entry';
import TempPage from './pages/temp';
import ManagePage from './pages/ManagePage';
import Deal from './pages/lookat';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TempPage/>}>

          <Route path="/" element={<EntryPage/>}/>
          <Route path="/deal/" element={<Deal/>}/>
          <Route path="/manage" element={<ManagePage/>}/>
          <Route path="/login" element={<LogingPage/>}/>
          <Route path="/create" element={<CreatePage/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;
