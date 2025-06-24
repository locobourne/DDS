const $btn = document.querySelector('.btn-primary')
$btn.addEventListener('click', convertirHora)


function convertirHora() {
    const $txtHr = document.getElementById('hh')
    const $txtMin = document.getElementById('mm')
    //valor de los inputs:
    let hora = Number($txtHr.value)
    let min = Number($txtMin.value)

    if ((hora < 0 || hora > 24) || (min < 0 || min > 60)) {
        alert('Valores incorrectos para Horas/Minutos!!!')
        return
    }

    let salida = ''

    if (hora === 0)
        salida = `${(hora + 12)}:${min} AM`
    else
        if (hora > 0 && hora < 12)
            salida = `${hora}:${min} AM`
        else
            if (hora === 12)
                salida = `${(hora)}: ${min} PM'`
            else
                salida = `${(hora - 12)}: ${min} PM'`

    alert(salida)
}   
