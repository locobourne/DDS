import { useState } from 'react'
import './App.css'
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Principal from './components/Principal'
import AjusteStock from './components/AjusteStock'
import ConsultaAjustes from './components/ConsultaAjustes'

function App() {
  
  return (
    <>
     <Router>
        <Routes>
            <Route path='/' element={<Principal />} />
            <Route path='/ajuste' element={<AjusteStock />} />
            <Route path='/consulta' element={<ConsultaAjustes />} />
        </Routes>
     </Router>
    </>
  )
}

export default App
