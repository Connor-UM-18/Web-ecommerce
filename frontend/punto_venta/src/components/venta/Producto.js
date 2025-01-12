import React, { useState } from 'react';

export const Producto = ({ productoEsca, setProductos, idDeTall }) => {
  
  const [cantidad, setCantidad] = useState("XS"); // Estado para la talla seleccionada, inicializado a "XS"
  const [precio, setPrecio] = useState(1); // Estado para el precio, inicializado como vacío

  let producto = productoEsca.length > 0 ? productoEsca[0] : null;

  let contadorId

  const anadiraProductos = () => {
    if (producto) {
      contadorId=Math.random();
      // Crear un objeto del producto a guardar
      let productoNuevo = {
        ...producto,
        idCont: contadorId,
        talla: cantidad, // Agregar la talla seleccionada al producto
        cantidad: parseFloat(precio) // Convertir el precio a un número antes de asignarlo al producto
      };

      setProductos(prevProductos => [...prevProductos, productoNuevo]);
      alert("Producto Agregado a la Lista")
    }
  };

  return (
    <div className='producto'>
      {producto ? (
        <img src={`http://localhost:1234/${producto.imagen_url}`} alt={producto.nombre} />
      ) : (
        <p>No hay producto disponible</p>
      )}
      <div className='producto-datos'>
        {producto ? (
          <>
            <h3>{producto.nombre}</h3>
            <p>${producto.precio}</p>
            <label htmlFor="cantidad">TALLA:</label>
            <select id="cantidad" className="talla-venta" value={cantidad} onChange={(e) => setCantidad(e.target.value)}>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              className='cantidad-venta'
              type="number"
              id="cantidad"
              placeholder="Ingrese la cantidad"
              value={precio}
              onChange={(e) => {
                const value = e.target.value;
                if (value > 0 && value < 101) {
                  setPrecio(value);
                }
              }}
              min="1"
              max="100"
            />
            <button onClick={anadiraProductos}>Añadir</button>
          </>
        ) : (
          <p>No hay producto disponible</p>
        )}
      </div>
    </div>
  );
};
