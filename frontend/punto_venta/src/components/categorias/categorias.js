import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nombre_categoria: ''
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:1234/categorias');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
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
      const response = await axios.post('http://localhost:1234/categorias', form);
      console.log('Respuesta del servidor:', response.data);
      clearForm();
      fetchCategorias();
    } catch (error) {
      console.error('Error al crear categoría:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:1234/categorias/${editId}`, form);
      console.log('Respuesta del servidor:', response.data);
      clearForm();
      setEditing(false);
      fetchCategorias();
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
    }
  };

  const handleEdit = (categoria) => {
    setForm(categoria);
    setEditing(true);
    setEditId(categoria.id_categoria);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/categorias/${id}`);
      fetchCategorias();
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  const clearForm = () => {
    setForm({
      nombre_categoria: ''
    });
    setEditing(false);
    setEditId(null);
  };

  const handleCancelar = () => {
    clearForm();
  };

  return (
    <div>
      <h2>Categorías</h2>
      <form onSubmit={handleSubmit} className="form-categorias">
        <div className="inputs-categorias">
          <input
            type="text"
            placeholder="Nombre de la Categoría"
            name="nombre_categoria"
            value={form.nombre_categoria}
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

      <table className="tabla-categorias">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de la Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id_categoria}>
              <td>{categoria.id_categoria}</td>
              <td>{categoria.nombre_categoria}</td>
              <td className="accion-buttons">
                <button className="editar" onClick={() => handleEdit(categoria)}>Editar</button>
                <button className="eliminar" onClick={() => handleDelete(categoria.id_categoria)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categorias;
