import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo_electronico: '',
    pass: '',
    telefono: ''
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:1234/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
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
      const response = await axios.post('http://localhost:1234/usuarios', form);
      console.log('Respuesta del servidor:', response.data);
      clearForm();
      fetchUsuarios();
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:1234/usuarios/${editId}`, form);
      console.log('Respuesta del servidor:', response.data);
      clearForm();
      setEditing(false);
      fetchUsuarios();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const handleEdit = (usuario) => {
    setForm(usuario);
    setEditing(true);
    setEditId(usuario.id_usuario);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/usuarios/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const clearForm = () => {
    setForm({
      nombre: '',
      apellido: '',
      correo_electronico: '',
      pass: '',
      telefono: ''
    });
    setEditing(false);
    setEditId(null);
  };

  const handleCancelar = () => {
    clearForm();
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <form onSubmit={handleSubmit} className="form-usuarios">
        <div className="inputs-usuarios">
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="correo_electronico"
            placeholder="Correo Electrónico"
            value={form.correo_electronico}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="pass"
            placeholder="Contraseña"
            value={form.pass}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
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

      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo Electrónico</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.correo_electronico}</td>
              <td>{usuario.telefono}</td>
              <td className="accion-buttons">
                <button className="editar" onClick={() => handleEdit(usuario)}>Editar</button>
                <button className="eliminar" onClick={() => handleDelete(usuario.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
