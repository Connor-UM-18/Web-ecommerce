import React, { useEffect, useState } from 'react'
import { Editar } from './Editar';
import imgejemplo from '../../img/2.jpg';

export const Listado = ({ listadoState, setListadoState }) => {

    const [editar, setEditar] = useState(0);

    useEffect(() => {
        console.log("Componente Cargado")
        conseguirProductos();

    }, []);

    const conseguirProductos = () => {

        // fetch('http://localhost:1234/productos')
        // .then(response => response.json())
        // .then(data => {
        //     setListadoState(data); // Actualiza el estado con los productos obtenidos
        //     return data;
        // })
        // .catch(error => console.error('Error al obtener productos:', error));

         let peliculas = JSON.parse(localStorage.getItem("pelis"));

         setListadoState(peliculas);

         return peliculas;
    }

    const borrarPeli = (id) => {
        //Conseguir peliculas almacenadas
        let pelis_guardadas = conseguirProductos();

        //Filtrar las pelis para eliminar la peli que quiero
        let nuevo_array_peliculas = pelis_guardadas.filter(peli => peli.id !== parseInt(id));

        console.log(pelis_guardadas, nuevo_array_peliculas);
        //Actualizar estado del listado
        setListadoState(nuevo_array_peliculas);

        //Actualizar los datos en el local storage
        localStorage.setItem('pelis', JSON.stringify(nuevo_array_peliculas));
    }

    const infoPrenda = (peli) => {
        alert(`Stock: ${peli.prendas}`);
    }

    const datoPrenda = (peli) => {
        let clase = "info";
        if (peli.prendas >= 7) {
            clase = "info";
        } else if (peli.prendas < 7 && peli.prendas >= 4) {
            clase = "infoMedio";
        } else {
            clase = "infoBajo";
        }
        return clase;
    }

    return (
        <>

            {(listadoState != null) ?
                listadoState.map(peli => {

                    let clases = datoPrenda(peli);

                    return (

                        <article key={peli.id} className="peli-item shadow-md">
                            <img src={imgejemplo} alt='Imagen' />
                            <h3 className="title">{peli.titulo}</h3>
                            <h2 className='precio'>${peli.precio}</h2>


                            <button className="edit" onClick={() => { setEditar(peli.id) }}>Editar</button>
                            <button className="delete" onClick={() => { borrarPeli(peli.id) }}>Borrar</button>
                            <button className={clases} onClick={() => { infoPrenda(peli) }}></button>

                            {/*Aparece formulario de editar*/}
                            {editar === peli.id && (
                                <Editar peli={peli}
                                    conseguirProductos={conseguirProductos}
                                    setEditar={setEditar}
                                    setListadoState={setListadoState}
                                />
                            )}

                        </article>
                    );

                })
                : <h2>No hay prendas para mostrar</h2>
            }
        </>
    )
}
