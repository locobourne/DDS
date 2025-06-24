export default function Contador(){
    const $div = document.createElement('div')
    
    $div.innerHTML = 
    `
        <h6>Valor:${valor}</h6>
        <button class='btn btn-primary' onclick='setValor();'>Incrementar</button>
    `
    return $div; //HTML + JS
}


