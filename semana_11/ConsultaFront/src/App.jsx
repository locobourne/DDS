
import './App.css'
import Consulta from './components/Consulta'
import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from './components/Login'
import { useState } from 'react'
import Inicio from './components/Inicio'

function App() {
  const [estaLogueado, setEstaLogueado] = useState(false)

  //función auxiliar:
  /* const estaLogueado = () => {
     return localStorage.getItem('loginOk') === 'true'
   }*/
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          estaLogueado ? <Navigate to="/inicio"></Navigate>
            : <Login setEstaLogueado={setEstaLogueado}></Login>
        }>
        </Route>
        <Route path='/inicio' element={
          estaLogueado ? <Inicio usuario={{email:'ADMIN'}}></Inicio>
            : <Navigate to="/"></Navigate>
        }>

        </Route>

        <Route path='/consulta' element={
          estaLogueado ? <Consulta></Consulta> :
            <Navigate to="/"></Navigate>
        }>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
