import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ShadowDOM from 'react-shadow';
import imagen from '../../img/3.jpg'; // Importa la imagen desde la ruta correcta

const tailwindStyles = `
@import url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css');

.button {
  margin-top: 1.5rem;
  transition: all 0.2s;
  display: block;
  padding: 0.75rem 1rem;
  width: 100%;
  color: white;
  font-weight: bold;
  border-radius: 0.375rem;
  cursor: pointer;
  background: linear-gradient(to right, #4f46e5, #a855f7);
}

.button:hover {
  background: linear-gradient(to right, #4338ca, #8b5cf6);
}

.button:focus {
  background: #3730a3;
}

.input {
  margin-top: 0.25rem;
  padding: 0.75rem 1rem;
  width: 100%;
  background: white;
  color: #111827;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.input:focus {
  border-color: #4f46e5;
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

.label {
  color: #6b7280;
  display: block;
  margin-top: 0.75rem;
}

.form-wrapper {
  background-image: url(${imagen}); /* Utiliza la imagen importada como fondo */
  background-size: cover; /* Ajusta la imagen para cubrir todo el contenedor */
  background-position: center; /* Centra la imagen */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.form-container {
  border-top-width: 8px;
  border-color: #4f46e5;
  background: rgba(255, 255, 255, 0.8); /* Fondo blanco transparente para el formulario */
  padding: 3rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 24rem;
  border-radius: 0.375rem;
}
`;

function Recuperacion() {
  const [correo, setCorreo] = useState('');

  const handleRecuperar = async () => {
    try {
      const response = await fetch('http://localhost:1234/recuperacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo_electronico: correo }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      const data = await response.json();
      Swal.fire({
        title: 'Recuperación de Contraseña',
        text: data.mensaje,
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Recuperación de Contraseña',
        text: error.message,
        icon: 'error',
      });
    }
  };

  return (
    <ShadowDOM.div>
      <style>{tailwindStyles}</style>
      <div className="form-wrapper">
        <div className="form-container">
          <h1 className="font-bold text-center block text-2xl">Recuperación de Contraseña</h1>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="label">Correo Electrónico</label>
            <input
              className="input"
              type="email"
              id="correo"
              name="correo"
              placeholder="Ingrese su correo electrónico"
              autoFocus={true}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <button className="button" onClick={handleRecuperar}>Recuperar Contraseña</button>
          </form>
        </div>
      </div>
    </ShadowDOM.div>
  );
}

export default Recuperacion;
