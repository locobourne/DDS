import Contador from "./components/Contador.js" 

export default function App(){
    const $app = document.getElementById('app')
    //limpiar el componente anterior
    $app.innerHTML = null
    $app.appendChild(Contador())
}