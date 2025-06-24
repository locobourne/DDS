import React, { useState } from 'react'

export default function Contador() {
  //variales de estado
  const [valor, setValor] = useState(0)
  //funciones:
  const handleOnClick = ()=>{
    setValor(valor + 1)
  }
  return (
    <>
      <h6>Valor: {valor}</h6>
      <button onClick={handleOnClick}>Incrementar</button>
    </>
  )
}
