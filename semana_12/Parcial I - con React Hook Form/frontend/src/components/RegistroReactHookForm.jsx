import { useForm } from "react-hook-form";
import axios from "axios";
import React from "react";

function RegistroReactHookForm({ setModo }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCancelClick = () => {
    setModo("C");
  };

  const onSubmit = async (data) => {
    console.log("Datos del producto:", data);
    try {
      const response = await axios.post(
        "http://localhost:4000/productos",
        data
      );
      console.log("Respuesta del servidor:", response.data);
      alert(`¡Éxito! ${response.data.message}`);
      setModo("C");
    } catch (error) {
      console.error("Error al enviar el producto:", error);
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        alert(
          `Error del servidor: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        alert("Error: No se pudo conectar con el servidor. ¿Está encendido?");
      } else {
        // Algo sucedió al configurar la solicitud
        alert(`Error al procesar la solicitud: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h5>Nuevo producto</h5>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo Nombre */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            className={`form-control ${errors.gamerTag ? "is-invalid" : ""}`}
            id="nombre"
            {...register("nombre", {
              required: "El nombre es obligatorio.",
              minLength: {
                value: 5,
                message: "El nombre debe tener al menos 5 caracteres.",
              },
            })}
          />
          {errors.nombre && (
            <div className="invalid-feedback">{errors.nombre.message}</div>
          )}
        </div>
        {/* Campo Marca */}
        <div className="mb-3">
          <label htmlFor="marca" className="form-label">
            Marca:
          </label>
          <input
            type="text"
            className={`form-control ${errors.gamerTag ? "is-invalid" : ""}`}
            id="marca"
            {...register("marca", {
              required: "La marca es obligatoria.",
              minLength: {
                value: 2,
                message: "La marca debe tener al menos 2 caracteres.",
              },
            })}
          />
          {errors.marca && (
            <div className="invalid-feedback">{errors.marca.message}</div>
          )}
        </div>
        {/* Campo Tipo */}
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">
            Tipo:
          </label>
          <input
            type="text"
            className={`form-control ${errors.gamerTag ? "is-invalid" : ""}`}
            id="tipo"
            {...register("tipo", {
              required: "El tipo es obligatoria.",
              minLength: {
                value: 2,
                message: "El tipo debe tener al menos 2 caracteres.",
              },
            })}
          />
          {errors.tipo && (
            <div className="invalid-feedback">{errors.tipo.message}</div>
          )}
        </div>
        {/* Campo precio */}
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">
            Precio:
          </label>
          <input
            type="number"
            className={`form-control ${errors.gamerTag ? "is-invalid" : ""}`}
            id="precio"
            {...register("precio", {
              required: "El Precio es obligatoria.",
            })}
          />
          {errors.precio && (
            <div className="invalid-feedback">{errors.precio.message}</div>
          )}
        </div>
        {/* Campo a_reponer */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className={`form-check-input ${
              errors.a_reponer ? "is-invalid" : ""
            }`}
            id="a_reponer"
            {...register("a_reponer")}
          />
          <label className="form-check-label" htmlFor="a_reponer">
            Producto a reponer
          </label>
        </div>
        <div className="form-group mt-2">
          <button type="submit" className="btn btn-primary">
            Aceptar
          </button>
          <button onClick={handleCancelClick} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistroReactHookForm;
