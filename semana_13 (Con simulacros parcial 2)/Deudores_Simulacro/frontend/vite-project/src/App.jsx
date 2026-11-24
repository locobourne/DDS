import { useState } from 'react';
import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Deudores from './components/Deudores';
//import DeudoresListado from './components/DeudoresListado';
//import DeudoresRegistro from './components/DeudoresRegistro';
import Menu from './components/Menu';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/deudores' element={<Deudores />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
