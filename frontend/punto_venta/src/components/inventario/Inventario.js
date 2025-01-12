import React, { useEffect, useState } from 'react'
import { Buscador } from "./Buscador";
import { Crear } from './Crear';
import { Listado } from './Listado';

export const Inventario = () => {

  const [listadoState, setListadoState] = useState([]);
  const [accion,setAccion] = useState(0);

  useEffect(()=>{
    if(accion===0){
      fetch('http://localhost:1234/inventario/', {
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
    }else{
    }
  }, [accion]);

  return (
    <div className="layout">
      <div className='title-almacen'>
        <h3>Almacen</h3>
      </div>

      {/*Contenido Principal*/}

      <section className="content">
        {/*Aqui va el listado de las peliculas*/}
        <Listado listadoState={listadoState} setListadoState={setListadoState}/>
      </section>

      {/*Barra Lateral*/}
      <aside className="lateral">
        <Buscador listadoState={listadoState} setListadoState={setListadoState} setAccion={setAccion}/>
        
        <Crear setListadoState={setListadoState}/>
      </aside>

    </div>
  )
}
