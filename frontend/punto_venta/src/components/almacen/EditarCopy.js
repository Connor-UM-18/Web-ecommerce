import axios from 'axios';
import React, { useState } from 'react';

export const EditarCopy = ({ producto, setEditar, setListadoState }) => {
  const titulo_componente = "Editar Prenda";

  const [productoState, setProductoState] = useState({
    nombre: producto.nombre,
    precio: producto.precio,
    descripcion: producto.descripcion,
    id_categoria: producto.id_categoria,
    imagen: null,
  });
  const [error, setError] = useState(null);

  const { nombre, precio, descripcion, id_categoria, imagen } = productoState;

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      const file = files[0];
      const validExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
      if (file && !validExtensions.includes(file.type)) {
        setError('Solo se permiten archivos .png, .jpg, .jpeg');
        setProductoState({ ...productoState, imagen: null });
      } else {
        setError(null);
        setProductoState({ ...productoState, imagen: file });
      }
    } else {
      setProductoState({ ...productoState, [name]: value });
    }
  };

  const guardarEdicion = async (e, id) => {
    e.preventDefault();

    // Validación de campos
    if (!nombre || !descripcion || !precio || !id_categoria) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', parseFloat(precio)); // Convertir precio a float
    formData.append('id_categoria', parseInt(id_categoria)); // Convertir id_categoria a int
    if (imagen) {
      formData.append('imagen', imagen); // Adjuntar nueva imagen si existe
    }

    try {
      const response = await axios.patch(`http://localhost:1234/productos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('Producto Modificado:', response.data);
      alert("Producto Editado Correctamente, favor de actualizar la pagina")

      // Actualizar el listado de productos en Almacen.js
      setListadoState(prevState =>
        prevState.map(item => (item.id_producto === id ? response.data : item))
      );

      // Cerrar formulario de edición
      setEditar(0);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='edit_form'>
      <h3 className='title'>{titulo_componente}</h3>
      <form onSubmit={e => guardarEdicion(e, producto.id_producto)}>

      <input
          type="file"
          id="imagen"
          name="imagen"
          accept=".png,.jpg,.jpeg"
          onChange={handleInputChange}
        />

        <input
          type='text'
          name='nombre'
          className='titulo_editado'
          defaultValue={nombre}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name='id_categoria'
          className='categoria_editado'
          min='1'
          max='3'
          defaultValue={id_categoria}
          onChange={handleInputChange}
        />

        <input
          type="number"
          name='precio'
          className='precio_editado'
          min='1'
          max='1000'
          defaultValue={precio}
          onChange={handleInputChange}
        />

        <textarea
          name='descripcion'
          defaultValue={descripcion}
          className='descripcion_editada'
          onChange={handleInputChange}
        />

        <input disabled={!!error} type='submit' className='buttonEditarCopy' value="Actualizar" />
      </form>
    </div>
  );
};
