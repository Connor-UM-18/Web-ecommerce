//Frontend/punto_venta_src_components/almacen/ListadoCopy.j
import axios from 'axios';
import React, { useState } from 'react';
import { EditarCopy } from './EditarCopy';

export const ListadoCopy = ({ listadoState, setListadoState }) => {
    const [editar, setEditar] = useState(0);

    const borrarProducto = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:1234/productos/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Producto Eliminado:', response.data);

            const getResponse = await axios.get('http://localhost:1234/productos/', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setListadoState(getResponse.data);
        } catch (error) {
            console.log('Error al eliminar producto:', error);
        }
    }

    return (
        <>
            {(listadoState != null) ?
                listadoState.map(producto => {
                    return (
                        <article key={producto.id_producto} className="peli-item shadow-md">
                            <img src={`http://localhost:1234/${producto.imagen_url}`} alt={producto.nombre} />
                            <h3 className="title">{producto.nombre}</h3>
                            <h2 className='precio'>${producto.precio}</h2>
                            <button className="button-buscador" onClick={() => { setEditar(producto.id_producto) }}>Editar</button>
                            <button className="button-borrador" onClick={() => { borrarProducto(producto.id_producto) }}>Borrar</button>

                            {/*Aparece formulario de editar*/}
                            {editar === producto.id_producto && (
                                <EditarCopy 
                                    producto={producto}
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
    );
}
