import React, { useState, useEffect } from 'react';

const id_punto_venta = '97376864-382c-11ef-89fb-a2aad19a47c0';

export const ProductosEsca = ({ productos, setProductos }) => {
  const [productosUnicos, setProductosUnicos] = useState([]);

  useEffect(() => {
    const filtrarProductosUnicos = () => {
      const uniqueProducts = [];
      const idsVistos = new Set();
      productos.forEach(producto => {
        const uniqueId = `${producto.id_producto}-${producto.talla}`;
        if (!idsVistos.has(uniqueId)) {
          uniqueProducts.push(producto);
          idsVistos.add(uniqueId);
        }
      });
      return uniqueProducts;
    };

    setProductosUnicos(filtrarProductosUnicos());
  }, [productos]);

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter(producto => (
      !(producto.idCont === id)
    ));
    setProductos(nuevosProductos);
    alert("Producto Eliminado de la lista")
  };

  const calcularTotal = () => {
    return productos.reduce((total, producto) => total + producto.cantidad * producto.precio, 0);
  };

  const calcularCantidad = () => {
    return productos.reduce((total, producto) => total + producto.cantidad, 0);
  };

  const generarVentaEfectivo = () => {
    let total = calcularTotal();
    if (total !== 0) {
      let efectivo = prompt("Por favor, ingresa el efectivo:");

      if (efectivo !== null) {
        let efectivoInt = parseInt(efectivo);

        if (isNaN(efectivoInt) || efectivoInt < total) {
          alert("Efectivo insuficiente o entrada inválida. Por favor, inténtelo de nuevo.");
          return;
        }
        let cambio = efectivoInt - total;
        alert("Cambio: " + cambio);

        const json = generarJSON(total, productos);
        fetchVenta(json);
      }else {
        alert("Pago no autorizado");
      }
    } else {
      alert("No hay ventas por hacer");
    }
  };

  const generarVentaTarjeta = () => {
    let total = calcularTotal();
    if (total !== 0) {
      let tarjeta = prompt("Por favor, ingresa tu número de tarjeta (16 dígitos):");
      let nip = prompt("Por favor, ingresa tu NIP (4 dígitos):");

      function validarTarjeta(tarjeta) {
        // Verifica que el número de tarjeta tenga 16 dígitos
        let regex = /^\d{16}$/;
        return regex.test(tarjeta);
      }

      function validarNip(nip) {
        // Verifica que el NIP tenga 4 dígitos
        let regex = /^\d{4}$/;
        return regex.test(nip);
      }

      if (tarjeta !== null && nip !== null) {
        if (validarTarjeta(tarjeta) && validarNip(nip)) {
          alert("Pago autorizado desde la tarjeta: " + tarjeta + ". ¡Ya puede retirar su tarjeta!");

          const json = generarJSON(calcularTotal(), productos);
          fetchVenta(json);
        } else {
          alert("Número de tarjeta o NIP inválido. Por favor, inténtelo de nuevo.");
        }
      } else {
        alert("Pago no autorizado");
      }
    } else {
      alert("No hay ventas por hacer")
    }
  };

  function fetchVenta(json) {
    fetch('http://localhost:1234/ventas/venta_ecommerce', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    }).then(response => {
      if (response.ok) {
        return response.json(); // Convertir la respuesta a JSON
      } else {
        throw new Error('Error al realizar la venta');
      }
    }).then(data => {
      alert('Venta realizada con éxito');
      console.log('ID de la venta:', data.id_venta); // Mostrar el ID de la venta en la consola

      // Hacer la solicitud para descargar el PDF
      return fetch('http://localhost:1234/ticket/' + data.id_venta, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf'
        }
      });
    }).then(response => {
      if (response.ok) {
        return response.blob(); // Obtener el PDF como un Blob
      } else {
        throw new Error('Error al descargar el ticket');
      }
    }).then(blob => {
      // Crear una URL para el Blob y abrirla
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ticket.pdf';
      document.body.appendChild(a);
      a.click(); // Descargar el archivo
      window.URL.revokeObjectURL(url); // Limpiar la URL del Blob
      a.remove(); // Eliminar el elemento <a>
    }).catch(error => {
      console.error('Error en la petición:', error);
    });
  }



  function generarJSON(total, productos) {
    const json = {
      id_usuario: id_punto_venta,
      total: total,
      es_apartado: false,  // O 1 si es un apartado, esto también debería ser dinámico
      productos: productos.map(producto => {
        let tallas;
        if (producto.talla === "XL") {
          tallas = 5;
        } else if (producto.talla === "L") {
          tallas = 4;
        } else if (producto.talla === "M") {
          tallas = 3;
        } else if (producto.talla === "S") {
          tallas = 2;
        } else if (producto.talla === "XS") {
          tallas = 1;
        }

        return {
          id_producto: producto.id_producto,
          id_talla: tallas,
          cantidad: producto.cantidad
        };
      })
    };

    return json;
  }

  return (
    <>
      <div className='productos-prepago'>
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>Productos</th>
              <th>Talla</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productosUnicos && productosUnicos.length > 0 ? (
              productos.map((producto, index) => (
                <tr key={producto.idCont}>
                  <td>{producto.nombre}</td>
                  <td>{producto.talla}</td>
                  <td>{producto.cantidad}</td>
                  <td>${producto.precio}</td>
                  <td>${producto.precio * producto.cantidad}</td>
                  <td className="accion-buttons">
                    <button className="eliminar" onClick={() => eliminarProducto(producto.idCont)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay prendas para mostrar</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className='productos-total'>
          <h3>Total</h3>
          <h4>Total de prendas: {calcularCantidad()}</h4>
          <h4>Total a pagar: ${calcularTotal()}</h4>
        </div>
      </div>

      <section className='section-metodo-pago'>
        <div className='metodos-pago'>
          <div className='pago-card'>
            <div className='card-datos'>
              <h3>PAGO CON TARJETA</h3>
              <h4>${calcularTotal()}</h4>
              <h5>- Insertar número de tarjeta</h5>
              <h5>- Insertar código de seguridad</h5>
              <button onClick={generarVentaTarjeta}>Pagar</button>
            </div>
          </div>

          <div className='pago-cash'>
            <div className='cash-datos'>
              <h3>PAGO EN EFECTIVO</h3>
              <h4>${calcularTotal()}</h4>
              <button onClick={generarVentaEfectivo}>Pagar</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
