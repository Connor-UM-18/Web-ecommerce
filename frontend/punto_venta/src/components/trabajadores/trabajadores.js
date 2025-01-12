import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Trabajadores = () => {
  const [trabajadores, setTrabajadores] = useState([]);
  const [form, setForm] = useState({
    usuario: '',
    rol: '',
    contraseña: '',
    nombre_completo: '',
    correo_electronico: ''
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTrabajadores();
  }, []);

  const fetchTrabajadores = async () => {
    try {
      const response = await axios.get('http://localhost:1234/trabajadores');
      setTrabajadores(response.data);
    } catch (error) {
      console.error('Error al obtener trabajadores:', error);
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
      const response = await axios.post('http://localhost:1234/trabajadores', {
        usuario: form.usuario,
        rol: form.rol,
        password: form.contraseña,
        nombre_completo: form.nombre_completo,
        correo_electronico: form.correo_electronico
      });

      console.log('Respuesta del servidor:', response.data);
      clearForm();
      fetchTrabajadores();
    } catch (error) {
      console.error('Error al crear trabajador:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      console.log('Formulario enviado:', form);
      const response = await axios.patch(`http://localhost:1234/trabajadores/${editId}`, {
        usuario: form.usuario,
        rol: form.rol,
        password: form.contraseña,
        nombre_completo: form.nombre_completo,
        correo_electronico: form.correo_electronico
      });

      console.log('Respuesta del servidor:', response.data);
      clearForm();
      setEditing(false);
      fetchTrabajadores();
    } catch (error) {
      console.error('Error al actualizar trabajador:', error);
    }
  };

  const handleEdit = (trabajador) => {
    setForm(trabajador);
    setEditing(true);
    setEditId(trabajador.id_trabajador);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/trabajadores/${id}`);
      fetchTrabajadores();
    } catch (error) {
      console.error('Error al eliminar trabajador:', error);
    }
  };

  const clearForm = () => {
    setForm({
      usuario: '',
      rol: '',
      contraseña: '',
      nombre_completo: '',
      correo_electronico: ''
    });
    setEditing(false);
    setEditId(null);
  };

  const handleCancelar = () => {
    clearForm();
  };

  return (
    <div>
      <h2>Trabajadores</h2>
      <form onSubmit={handleSubmit} className="form-trabajadores">
        <div className="inputs-trabajadores">
          <input
            type="text"
            placeholder="Usuario"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            required
          />
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un rol</option>
            <option value="gerente">Gerente</option>
            <option value="vendedor">Vendedor</option>
            <option value="almacenista">Almacenista</option>
          </select>
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            value={form.contraseña}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nombre_completo"
            placeholder="Nombre Completo"
            value={form.nombre_completo}
            onChange={handleChange}
          />
          <input
            type="email"
            name="correo_electronico"
            placeholder="Correo Electrónico"
            value={form.correo_electronico}
            onChange={handleChange}
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

      <table className="tabla-trabajadores">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Nombre Completo</th>
            <th>Correo Electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {trabajadores.map((trabajador) => (
            <tr key={trabajador.id_trabajador}>
              <td>{trabajador.id_trabajador}</td>
              <td>{trabajador.usuario}</td>
              <td>{trabajador.rol}</td>
              <td>{trabajador.nombre_completo}</td>
              <td>{trabajador.correo_electronico}</td>
              <td className="accion-buttons">
                <button className="editar" onClick={() => handleEdit(trabajador)}>Editar</button>
                <button className="eliminar" onClick={() => handleDelete(trabajador.id_trabajador)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trabajadores;
