//Frontend/punto_venta_src_components/almacen/Almacen.j
import React, { useEffect, useState } from 'react';
import { Buscador } from "./Buscador";
import { CrearCopy } from './Crear-copy';
import { ListadoCopy } from './ListadoCopy';

export const Almacen = () => {

  const [listadoState, setListadoState] = useState([]);
  const [accion, setAccion] = useState(0);

  useEffect(() => {
    if (accion === 0) {
      fetch('http://localhost:1234/productos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la red');
          }
          return response.json();
        })
        .then(data => {
          console.log('Datos obtenidos:', data);
          setListadoState(data);
        })
        .catch(error => {
          console.log('Error al obtener datos:', error);
        });
    } else {
      // Puedes manejar otros casos si es necesario
    }
  }, [accion]);

  return (
    <div className="layout">
      <div className='title-almacen'>
        <h3>Almacen</h3>
      </div>

      <section className="content">
        <ListadoCopy listadoState={listadoState} setListadoState={setListadoState}/>
      </section>

      <aside className="lateral">
        <Buscador listadoState={listadoState} setListadoState={setListadoState} setAccion={setAccion}/>
        <CrearCopy setListadoState={setListadoState}/>
      </aside>

    </div>
  )
};
