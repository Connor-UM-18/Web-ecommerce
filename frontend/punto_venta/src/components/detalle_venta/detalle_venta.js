import React, { useEffect, useState } from 'react';
import axios from 'axios';


const DetalleVenta = () => {
  const [detalles, setDetalles] = useState([]);
  const [form, setForm] = useState({
    id_venta: '',
    id_producto: '',
    precio_unitario: '',
    cantidad: '',
    id_talla: ''
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDetalles();
  }, []);

  const fetchDetalles = async () => {
    try {
      const response = await axios.get('http://localhost:1234/detalle-venta');
      setDetalles(response.data);
    } catch (error) {
      console.error('Error al obtener detalles de venta:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.name === 'precio_unitario' || e.target.name === 'cantidad' || e.target.name === 'id_talla' ?
      parseFloat(e.target.value) : parseInt(e.target.value);
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
      console.log('Formulario enviado:', form);
      const response = await axios.post('http://localhost:1234/detalle-venta', form);
      console.log('Respuesta del servidor:', response.data);
      clearForm();
      fetchDetalles();
    } catch (error) {
      console.error('Error al crear detalle de venta:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const { id_venta, ...updateData } = form; // Excluir id_venta
      console.log('Formulario enviado:', updateData);
      const response = await axios.patch(`http://localhost:1234/detalle-venta/${editId}`, updateData);
      console.log('Respuesta del servidor:', response.data);
      clearForm();
      setEditing(false);
      fetchDetalles();
    } catch (error) {
      console.error('Error al actualizar detalle de venta:', error);
    }
  };
  

  const handleEdit = (detalle) => {
    setForm({
      id_venta: detalle.id_venta, // Asegurar que id_venta se establece correctamente
      id_producto: detalle.id_producto,
      precio_unitario: detalle.precio_unitario,
      cantidad: detalle.cantidad,
      id_talla: detalle.id_talla,
    });
    setEditing(true);
    setEditId(detalle.id_detalle_venta);
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/detalle-venta/${id}`);
      fetchDetalles();
    } catch (error) {
      console.error('Error al eliminar detalle de venta:', error);
    }
  };

  const clearForm = () => {
    setForm({
      id_venta: '',
      id_producto: '',
      precio_unitario: '',
      cantidad: '',
      id_talla: ''
    });
    setEditing(false);
    setEditId(null);
  };

  const handleCancelar = () => {
    clearForm();
  };

  const usedColors = new Set();

  const generateLightColor = () => {
    let color;
    do {
      const randomChannel = () => Math.floor(Math.random() * 128 + 170); // Valores entre 128 y 255 para asegurar que sean claros
      const r = randomChannel();
      const g = randomChannel();
      const b = randomChannel();
      color = `rgb(${r}, ${g}, ${b})`;
    } while (usedColors.has(color));
    usedColors.add(color);
    return color;
  };
  
  const idVentaColorMap = {};
  
  const getColorForIdVenta = (idVenta) => {
    if (!idVentaColorMap[idVenta]) {
      idVentaColorMap[idVenta] = generateLightColor();
    }
    return idVentaColorMap[idVenta];
  };


  return (
    <div>
      <h2>Detalle de Venta</h2>
      <form onSubmit={handleSubmit} className="form-detalle-venta" hidden>
        <div className="inputs-detalle-venta">
          <input
            type="text"
            placeholder="ID Venta"
            name="id_venta"
            value={form.id_venta}
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
            step="0.01"
            placeholder="Precio Unitario"
            name="precio_unitario"
            value={form.precio_unitario}
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
          />
          <input
            type="number"
            placeholder="ID Talla"
            name="id_talla"
            value={form.id_talla}
            onChange={handleChange}
            required
          />
        </div>
        <div className="buttons" hidden>
          {editing ? (
            <>
              <button type="submit">Actualizar</button>
              <button type="button" onClick={handleCancelar}>Cancelar</button>
            </>
          ) : (
            <>
              <button className="agregar" type="submit" disabled={!form.id_venta || !form.id_producto || !form.precio_unitario || !form.cantidad || !form.id_talla}>Agregar</button>
              <button type="button" onClick={clearForm}>Limpiar</button>
            </>
          )}
        </div>
      </form>

      <table className="tabla-detalle-venta">
        <thead>
          <tr>
            <th>ID Detalle</th>
            <th>ID Venta</th>
            <th>ID Producto</th>
            <th>Nombre Producto</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Talla</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle) => (
            <tr key={detalle.id_detalle_venta} style={{ backgroundColor: getColorForIdVenta(detalle.id_venta) }}>
              <td>{detalle.id_detalle_venta}</td>
              <td>{detalle.id_venta}</td>
              <td>{detalle.id_producto}</td>
              <td>{detalle.nombre}</td>
              <td>{detalle.precio_unitario}</td>
              <td>{detalle.cantidad}</td>
              <td>{detalle.nombre_talla}</td>
              <td className="accion-buttons">
                <button className="editar" onClick={() => handleEdit(detalle)}>Editar</button>
                <button className="eliminar" disabled>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetalleVenta;
