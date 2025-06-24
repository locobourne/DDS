/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

async function cargarBarrios() {
  try {
    const response = await fetch("http://localhost:3000/api/barrios");
    if (!response.ok) throw new Error("Error al cargar los barrios");

    const barrios = await response.json();
    const select = document.getElementById("barrio");
    select.innerHTML = "";

    const opcionTodos = document.createElement("option");
    opcionTodos.value = "Todos";
    opcionTodos.textContent = "Todos";
    opcionTodos.selected = true;
    select.appendChild(opcionTodos);

    barrios.forEach((barrio) => {
      const option = document.createElement("option");
      option.value = barrio.idBarrio;       // Enviamos el ID del barrio
      option.textContent = barrio.nombre;   // Texto visible es el nombre
      select.appendChild(option);
    });
  } catch (error) {
    console.error("⚠️ No se pudieron cargar los barrios:", error);
  }
}

async function cargarEstaciones({ incluirInactivas = false, barrio = "Todos", texto = "" } = {}) {
  try {
    const params = new URLSearchParams();

    if (incluirInactivas) params.append("incluirInactivas", "true");
    if (barrio && barrio !== "Todos") params.append("barrio", barrio);
    if (texto && texto.trim() !== "") params.append("texto", texto.trim());

    const url = `http://localhost:3000/api/estaciones?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al cargar estaciones");

    const estaciones = await response.json();
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    estaciones.forEach((estacion, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${estacion.nombre}</td>
        <td>${estacion.direccion || ""}</td>
        <td>${estacion.barrioNombre || estacion.idBarrio || ""}</td> <!-- mostramos nombre -->
        <td>${estacion.activa === 1 ? "Sí" : "No"}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("⚠️ No se pudieron cargar las estaciones:", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  cargarBarrios();
  cargarEstaciones();
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const incluirInactivas = document.getElementById("inactivos").checked;
  const barrio = document.getElementById("barrio").value;  // idBarrio
  const texto = document.getElementById("texto").value;

  cargarEstaciones({ incluirInactivas, barrio, texto });
});
