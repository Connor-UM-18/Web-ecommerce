import React, { useState } from 'react';
import axios from 'axios';

export const Escanear = ({ setProductoEsca }) => {
  const [productId, setProductId] = useState('');

  const obtenerProducto = async () => {
    try {
      const response = await axios.get(`http://localhost:1234/productos/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Datos obtenidos:', response.data);
      setProductoEsca(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const handleInputChange = event => {
    setProductId(event.target.value);
  };

  return (
    <div className='escanear2'>
      <h2>Escanea o busca el producto</h2>
      <div className='escanear-id2'>
        <input
          type='text'
          className='inputBuscador'
          placeholder='ID del producto'
          value={productId}
          onChange={handleInputChange}
        />
      </div>
      <button className='buttonescaner2' onClick={obtenerProducto}>Buscar</button>
    </div>
  );
};
