import { useState } from "react";
import Table from "./Table";
import Registro from "./Registro";
import RegistroReactHookForm from "./RegistroReactHookForm";

export default function ParcialUno() {
  const [modo, setModo] = useState("C");
  const [filas, setFilas] = useState([]);

  return (
    <>
      {modo === "C" && (
        <Table setModo={setModo} filas={filas} setFilas={setFilas}></Table>
      )}
      {
        //modo !== "C" && <Registro setModo={setModo}></Registro>
        modo !== "C" && (
          <RegistroReactHookForm setModo={setModo}></RegistroReactHookForm>
        )
      }
    </>
  );
}
