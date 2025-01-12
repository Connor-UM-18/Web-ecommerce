import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
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

function LoginForm() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1234/login-trabajador', {
        usuario,
        pass: password,
      });

      // Después de iniciar sesión correctamente
      if (response.status === 200) {
        const { token, rol } = response.data;

        // Almacena el token y el tipo de usuario en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userType', rol);

        Swal.fire({
          title: '¡Bien hecho!',
          text: '¡Has iniciado sesión correctamente!',
          icon: 'success',
        });

        // Redirige según el tipo de usuario
        switch (rol) {
          case 'gerente':
            navigate('/inicio'); // Redirige al inicio para gerentes
            break;
          case 'vendedor':
            navigate('/venta'); // Redirige a la página de ventas para vendedores
            break;
          case 'almacenista':
            navigate('/productos'); // Redirige a la página de productos para almacenistas
            break;
          default:
            navigate('/inicio'); // Redirige por defecto a inicio
            break;
        }
      } else {
        // Mensaje de error si no se puede iniciar sesión
        Swal.fire({
          title: '¡Oops!',
          text: 'Hubo un problema al iniciar sesión. Inténtalo de nuevo.',
          icon: 'error',
        });
      }


    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        title: '¡Oops!',
        text: 'Hubo un problema al iniciar sesión. Inténtalo de nuevo.',
        icon: 'error',
      });
    }
  };

  return (
    <ShadowDOM.div>
      <style>{tailwindStyles}</style>
      <div className="form-wrapper">
        <div className="form-container">
          <h1 className="font-bold text-center block text-2xl">Log In</h1>
          <form onSubmit={handleSubmit}>
            <label className="label">Usuario</label>
            <input
              className="input"
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Ingrese su usuario"
              autoFocus={true}
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" type="submit">Submit</button>
          </form>
          <Link to="/recuperacion" className="text-blue-500 block mt-2 text-sm text-center">¿Olvidaste tu contraseña?</Link>
        </div>
      </div>
    </ShadowDOM.div>
  );
}

export default LoginForm;

