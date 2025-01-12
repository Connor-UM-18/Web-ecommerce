import React, { useState } from 'react'

export const Buscador = ({listadoState,setListadoState, setAccion}) => {

    const [busqueda,setBusqueda]=useState("");
    const [noEncontrado,setNoEncontrado]=useState("");

    const buscarProducto=(e)=>{
        //Crear estado y actualizarlo
        setBusqueda(e.target.value)

        //Filtrar para buscar coincidencias
        let productos_encontrados = listadoState.filter(producto=>{
            return producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
        });

        if(busqueda.length <= 1 || productos_encontrados <= 0){
            productos_encontrados = listadoState;
            fetch('http://localhost:1234/productos/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la red');
                    }
                    return response.json();
                })
                .then(data => {
                    setAccion(1)
                    setListadoState(data)
                })
                .catch(error => {
                    console.log('Error:', error);
                });
            setNoEncontrado(true);
        }else{
            setNoEncontrado(false);
            //Actualizar estado del listado principal con lo que he logadro filtrar
            setListadoState(productos_encontrados)
        }
    }

    return (
        <div className="search">
            <h3 className="title">Buscador</h3>
            {(noEncontrado && busqueda.length > 2) && (
                <span className='no-encontrado'>No se ha encontrado ninguna coincidencia</span>
            )}

            <form>

                <input type="text" 
                       id="search_field"
                       name="busqueda"
                       autoComplete='off'
                       className='input-buscador'
                       value={busqueda}
                       onChange={buscarProducto}
                />

            </form>
        </div>
    )
}
