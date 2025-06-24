import { useState } from 'react'
import './App.css'
import Paises from './components/Paises.jsx'
import ListadoClientes from './components/ListadoClientes.jsx';
import clientesAgendados  from './clientes.js'

function App() {
  const [codigoPais, setCodigoPais] = useState();
  const [clientes, setClientes] = useState(clientesAgendados);

  function onPaisChangedHandler() {
    setCodigoPais(document.getElementById("selectPaises").value);
  };

  function agregarCliente(){
    const inputApellido = document.getElementById('inputApellido');
    const inputNombre = document.getElementById('inputNombre');
    const inputPais = document.getElementById('selectPaises');
    const imputCodigoPais = document.getElementById('imputCodigoPais');
    const imputTelefono = document.getElementById('imputTelefono');

    const apellidoStr = inputApellido.value;
    const nombreStr = inputNombre.value;
    const paisStr = inputPais.value;
    const codigoPaisStr = imputCodigoPais.value.trim();
    const telefonoStr = imputTelefono.value

    if (!apellidoStr || !nombreStr || !paisStr || !codigoPaisStr || !telefonoStr) {
        alert('Todos los campos son requeridos');
        return;
    }

    const telefono = parseInt(telefonoStr);
    if (isNaN(telefono)) {
        alert('Por favor, ingrese una número de teléfono válido.');
        return;
    }

    const cliente = {
        apellido: apellidoStr,
        nombre: nombreStr,
        pais: paisStr,
        codigo: codigoPaisStr,
        numeroTelefono: telefonoStr
      };

    setClientes(prevClientes => [...prevClientes, cliente]);

    // Limpieza del formulario
    inputApellido.value = '';
    inputNombre.value = '';
    inputPais.value = '';
    imputCodigoPais.value = '';
    imputTelefono.value = '';
  }

  return (
    <>
      <h2>Gestión de Clientes</h2>
        <hr/>   
        <div className="container p-1 my-1 border">
            <h3>Clientes</h3>
            <ListadoClientes clientes={clientes}></ListadoClientes>
        </div>
        <div className="container p-1 my-1 border">
            <h3>Agregar Cliente</h3>
            <form id="formularioCliente" className="row g-3 mb-5">
                <div className="col-md-6">
                    <label htmlFor="inputApellido" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="inputApellido" maxLength="30" required/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputNombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="inputNombre" maxLength="30" required/>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPais" className="form-label">Pais</label>
                    <Paises onPaisChanged={onPaisChangedHandler}></Paises>
                </div>
                <div className="col-md-4">
                    <label htmlFor="imputCodigoPais" className="form-label">Código de País</label>
                    <input type="number" className="form-control" id="imputCodigoPais" maxLength="30" value={codigoPais} readOnly="readOnly"/>
                </div>
                <div className="col-md-8">
                    <label htmlFor="imputTelefono" className="form-label">Telefono</label>
                    <input type="text" className="form-control" id="imputTelefono" maxLength="30" />
                </div>
                <div className="col-md-4 d-flex align-items-end">
                    <button type="button" id="btnAgregar" className="btn btn-primary w-100" onClick={agregarCliente}>Agregar cliente</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default App