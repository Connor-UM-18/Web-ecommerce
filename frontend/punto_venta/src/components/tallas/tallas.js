import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tallas = () => {
  const [tallas, setTallas] = useState([]);
  const [form, setForm] = useState({
    nombre_talla: ''
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTallas();
  }, []);

  const fetchTallas = async () => {
    try {
      const response = await axios.get('http://localhost:1234/tallas');
      setTallas(response.data);
    } catch (error) {
      console.error('Error al obtener tallas:', error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  const handleCreate = async () => {
    try {
      console.log('Formulario enviado:', form);
      const response = await axios.post('http://localhost:1234/tallas', {
        nombre_talla: form.nombre_talla
      });

      console.log('Respuesta del servidor:', response.data);
      clearForm();
      fetchTallas();
    } catch (error) {
      console.error('Error al crear talla:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      console.log('Formulario enviado:', form);
      const response = await axios.patch(`http://localhost:1234/tallas/${editId}`, {
        nombre_talla: form.nombre_talla
      });

      console.log('Respuesta del servidor:', response.data);
      clearForm();
      setEditing(false);
      fetchTallas();
    } catch (error) {
      console.error('Error al actualizar talla:', error);
    }
  };

  const handleEdit = (talla) => {
    setForm(talla);
    setEditing(true);
    setEditId(talla.id_talla);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/tallas/${id}`);
      fetchTallas();
    } catch (error) {
      console.error('Error al eliminar talla:', error);
    }
  };

  const clearForm = () => {
    setForm({
      nombre_talla: ''
    });
    setEditing(false);
    setEditId(null);
  };

  const handleCancelar = () => {
    clearForm();
  };

  return (
    <div>
      <h2>Tallas</h2>
      <form onSubmit={handleSubmit} className="form-tallas" hidden>
        <div className="inputs-tallas">
          <input
            type="text"
            placeholder="Nombre de la talla"
            name="nombre_talla"
            value={form.nombre_talla}
            onChange={handleChange}
            required
          />
        </div>
        <div className="buttons">
          {editing ? (
            <>
              <button type="submit">Actualizar</button>
              <button type="button" onClick={handleCancelar}>Cancelar</button>
            </>
          ) : (
            <>
              <button type="submit">Agregar</button>
              <button type="button" onClick={clearForm}>Limpiar</button>
            </>
          )}
        </div>
      </form>

      <table className="tabla-tallas">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Talla</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tallas.map((talla) => (
            <tr key={talla.id_talla}>
              <td>{talla.id_talla}</td>
              <td>{talla.nombre_talla}</td>
              <td className="accion-buttons">
                <button className="editar" dislabled>Editar</button>
                <button className="eliminar" disabled>Eliminar</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tallas;
