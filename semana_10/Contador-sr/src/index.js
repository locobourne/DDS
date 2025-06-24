import App from "./App.js";
window.valor = 0

window.setValor = ()=>{
    window.valor += 1 //window.valor = window.valor + 1
    console.log(window.valor)
    App()// actualizar el componente vinculado con el estado: valor
}

App()