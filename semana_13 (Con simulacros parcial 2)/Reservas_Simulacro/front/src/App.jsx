import './App.css'
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Menu from './components/Menu';
import Registro from './components/Registro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu />}></Route>
        <Route path='/registro' element={<Registro />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
