import React, { useState } from 'react';
import axios from 'axios';

const Entregas = () => {
  const [ventaId, setVentaId] = useState('');
  const [venta, setVenta] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const calcularTotal = () => {
    return parseFloat(venta.monto);
  };

  const generarJSON = (total, productos) => {
    return {
      total,
      productos,
    };
  };

  const fetchVenta = async () => {
    try {
      const response = await axios.get(`http://localhost:1234/ventas/${ventaId}`);
      setVenta(response.data[0]); // Asumiendo que response.data es un array con un solo objeto
    } catch (error) {
      console.error('Error al recuperar la venta:', error);
      setMensaje('Error al recuperar la venta.');
    }
  };

  const actualizarEstadoVenta = async (fechaActual) => {
    try {
      const patchResponse = await axios.patch(`http://localhost:1234/entregas/${ventaId}`, {
        fecha: fechaActual,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(patchResponse.data.message)
      if (patchResponse.data.message === 'Estado de la venta actualizado a completado') {
        setMensaje('Estado de la venta actualizado a completado. ¡Gracias por su compra!');
      } else {
        setMensaje('La venta no está en estado válido para entrega.');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setMensaje('Venta no encontrada.');
        } else if (error.response.status === 400 && error.response.data.error === 'La venta no está en estado válido para entrega') {
          setMensaje('La venta no está en estado válido para entrega.');
        } else if (error.response.status === 400 && error.response.data.error === 'El formato de fecha no es válido') {
          setMensaje('El formato de fecha no es válido. Use el formato YYYY-MM-DD HH:mm:ss.');
        } else {
          setMensaje('Error al procesar la solicitud. Intente nuevamente.');
        }
      } else {
        setMensaje('Error al procesar la solicitud. Intente nuevamente.');
      }
      console.error('Error al verificar o actualizar el estado de la venta:', error);
    }
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

        // Actualizar el estado de la venta a completado
        const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
        actualizarEstadoVenta(fechaActual);

        alert("Venta pagada con éxito");
      } else {
        alert("Pago no autorizado");
      }
    } else {
      alert("No hay ventas por hacer");
    }
  };

  const verificarEntrega = async () => {
    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' ');
    await actualizarEstadoVenta(fechaActual);
  };

  const handleVerificarVenta = async () => {
    await fetchVenta();
  };

  return (
    <div className='entregas'>
      <h2>Verificar Estado</h2>
      <div className='entregas-id'>
        <input
          type='text'
          id='ventaId'
          className='input-entrega'
          placeholder='ID de la venta'
          value={ventaId}
          onChange={(e) => setVentaId(e.target.value)}
        />
        <button className='boton-entrega' onClick={handleVerificarVenta}>Verificar</button>
      </div>
      {venta && (
        <>
          {venta.id_estado === 1 && (
            <div className='pago-cash'>
              <div className='cash-datos'>
                <h3>PAGO EN EFECTIVO</h3>
                <h4>${calcularTotal()}</h4>
                <button className='button-buscador' onClick={generarVentaEfectivo}>Pagar</button>
              </div>
            </div>
          )}
          {venta.id_estado === 2 && (
            <div className='entregas'>
              <h2>Verificar y Completar Venta</h2>
              <div className='entregas-id'>
                <input
                  type='text'
                  id='completarVenta'
                  className='input-entrega'
                  placeholder='ID de la venta'
                  value={ventaId}
                  onChange={(e) => setVentaId(e.target.value)}
                />
                <button className='boton-entrega' onClick={verificarEntrega}>Completar Venta</button>
              </div>
              {mensaje && <p className='mensaje-entrega'>{mensaje}</p>}
            </div>
          )}
          {venta.id_estado === 4 && (
            <div>
              <p>Su venta ha sido cancelada.</p>
            </div>
          )}
          {venta.id_estado === 5 && (
            <div>
              <p>Su venta ha sido completada.</p>
            </div>
          )}
        </>
      )}
      {mensaje && <p className='mensaje-entrega'>{mensaje}</p>}
    </div>
  );
};

export default Entregas;

