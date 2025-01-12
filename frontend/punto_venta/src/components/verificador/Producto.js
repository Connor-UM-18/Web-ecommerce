import React, { useState } from 'react';

export const Producto = ({ productoEsca, setProductos }) => {
  const [talla, setTalla] = useState("XS"); // Estado para la talla seleccionada, inicializado a "XS"
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad, inicializado como 1

  let producto = productoEsca.length > 0 ? productoEsca[0] : null;

  let contadorId;

  const anadirProducto = () => {
    if (producto) {
      contadorId = Math.random();
      // Crear un objeto del producto a guardar
      let productoNuevo = {
        ...producto,
        idCont: contadorId,
        talla: talla, // Agregar la talla seleccionada al producto
        cantidad: parseFloat(cantidad) // Convertir la cantidad a un número antes de asignarlo al producto
      };

      setProductos(prevProductos => [...prevProductos, productoNuevo]);
    }
  };

  return (
    <div className='producto2'>
      {producto ? (
        <img src={`http://localhost:1234/${producto.imagen_url}`} alt={producto.nombre} />
      ) : (
        <p>No hay producto disponible</p>
      )}
      <div className='producto-datos2'>
        {producto ? (
          <>
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <label htmlFor="talla">TALLA:</label>
            <select id="talla" value={talla} onChange={(e) => setTalla(e.target.value)}>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </>
        ) : (
          <p>No hay producto disponible</p>
        )}
      </div>
    </div>
  );
};
