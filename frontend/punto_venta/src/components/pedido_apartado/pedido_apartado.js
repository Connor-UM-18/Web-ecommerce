import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DetallePedidoApartado = () => {
  const [detalles, setDetalles] = useState([]);
  const [form, setForm] = useState({
    id_pedido_apartado: '',
    id_producto: '',
    id_talla: '',
    cantidad: 1, // Inicializado como 1
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDetalles();
  }, []);

  const fetchDetalles = async () => {
    try {
      const response = await axios.get('http://localhost:1234/detalle-pedido-apartado');
      setDetalles(response.data);
    } catch (error) {
      console.error('Error al obtener detalles de pedido apartado:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.name === 'cantidad' ? parseInt(e.target.value, 10) : e.target.value;
    setForm({
      ...form,
      [e.target.name]: value
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
      if (isNaN(form.cantidad) || form.cantidad <= 0) {
        alert('La cantidad debe ser un número válido y mayor que 0');
        return;
      }

      console.log('Formulario enviado:', form);
      const response = await axios.post('http://localhost:1234/detalle-pedido-apartado', {
        id_pedido_apartado: form.id_pedido_apartado,
        id_producto: form.id_producto,
        id_talla: form.id_talla,
        cantidad: form.cantidad
      });

      console.log('Respuesta del servidor:', response.data);
      clearForm();
      fetchDetalles();
    } catch (error) {
      console.error('Error al crear detalle de pedido apartado:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (isNaN(form.cantidad) || form.cantidad <= 0) {
        alert('La cantidad debe ser un número válido y mayor que 0');
        return;
      }

      console.log('Formulario enviado:', form);
      const response = await axios.patch(`http://localhost:1234/detalle-pedido-apartado/${editId}/cantidad`, {
        cantidad: form.cantidad
      });

      console.log('Respuesta del servidor:', response.data);
      clearForm();
      setEditing(false);
      fetchDetalles();
    } catch (error) {
      console.error('Error al actualizar detalle de pedido apartado:', error);
    }
  };

  const handleEdit = (detalle) => {
    setForm({
      id_pedido_apartado: detalle.id_pedido_apartado,
      id_producto: detalle.id_producto,
      id_talla: detalle.id_talla,
      cantidad: detalle.cantidad
    });
    setEditing(true);
    setEditId(detalle.id_detalle_pedido_apartado);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/detalle-pedido-apartado/${id}`);
      fetchDetalles();
    } catch (error) {
      console.error('Error al eliminar detalle de pedido apartado:', error);
    }
  };

  const clearForm = () => {
    setForm({
      id_pedido_apartado: '',
      id_producto: '',
      id_talla: '',
      cantidad: 1
    });
    setEditing(false);
    setEditId(null);
  };

  const handleCancelar = () => {
    clearForm();
  };

  return (
    <div>
      <h2>Detalles de Pedido Apartado</h2>
      <form onSubmit={handleSubmit} className="form-detalle-pedido-apartado" hidden>
        <div className="inputs-detalle-pedido-apartado">
          <input
            type="number"
            placeholder="ID Pedido Apartado"
            name="id_pedido_apartado"
            value={form.id_pedido_apartado}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="ID Producto"
            name="id_producto"
            value={form.id_producto}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="ID Talla"
            name="id_talla"
            value={form.id_talla}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Cantidad"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            required
            min="1"
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

      <table className="tabla-detalle-pedido-apartado">
        <thead>
          <tr>
            <th>ID Detalle</th>
            <th>ID Pedido Apartado</th>
            <th>ID Producto</th>
            <th>ID Talla</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle) => (
            <tr key={detalle.id_detalle_pedido_apartado}>
              <td>{detalle.id_detalle_pedido_apartado}</td>
              <td>{detalle.id_pedido_apartado}</td>
              <td>{detalle.id_producto}</td>
              <td>{detalle.id_talla}</td>
              <td>{detalle.cantidad}</td>
              <td className="accion-buttons">
                <button className="editar" disabled>Editar</button>
                <button className="eliminar" disabled>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetallePedidoApartado;
