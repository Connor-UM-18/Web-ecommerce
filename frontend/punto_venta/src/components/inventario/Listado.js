import React, { useState, useEffect } from 'react';
import { Editar } from './Editar';
import { v4 as uuidv4 } from 'uuid';
import '../../css/almacen.css';
export const Listado = ({ listadoState, setListadoState }) => {
    const [editar, setEditar] = useState(0);
    const [productos, setProductos] = useState([]);

    // Función para cargar los productos con su imagen desde la tabla Productos
    const cargarProductos = async () => {
        try {
            const response = await fetch('http://localhost:1234/productos');
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        cargarProductos(); // Cargar productos al montar el componente
    }, []);

    const borrarProducto = (id, idproducto, idtalla) => {
        // DELETE
        fetch(`http://localhost:1234/inventario/${idproducto}/${idtalla}`, {
            method: 'DELETE',
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
                console.log('Producto Eliminado:', data);
                alert("Producto eliminado correctamente")
            })
            .catch(error => {
                console.log('Error al eliminar producto:', error);
                alert("Error al eliminar producto")
            });

        fetch('http://localhost:1234/inventario', {
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
                setListadoState(data)
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }

    const obtenerTalla = (id) => {
        // Lógica para obtener la talla
        switch (id) {
            case 1:
                return "XS";
            case 2:
                return "S";
            case 3:
                return "M";
            case 4:
                return "L";
            case 5:
                return "XL";
            default:
                return "Desconocida";
        }
    }

    const getStockClass = (stock) => {
        if (stock === 0) {
            return 'no-stock';
        } 
        else if (stock < 5) {
            return 'low-stock';
        } else if (stock >= 5 && stock <= 10) {
            return 'medium-stock';
        } else {
            return 'high-stock';
        }
    }

    return (
        <>
            {listadoState !== null ? (
                listadoState.map(producto => {
                    const productoInfo = productos.find(p => p.id_producto === producto.id_producto);
                    if (!productoInfo) return null; // Si no se encuentra el producto, no mostrar

                    return (
                        <article key={uuidv4()} className={`peli-item shadow-md ${getStockClass(producto.stock)}`}>
                            <img src={`http://localhost:1234/${productoInfo.imagen_url}`} alt={productoInfo.nombre} />
                            <h3 className="title">ID del Producto: {producto.id_producto}</h3>
                            <h2 className='precio'>{obtenerTalla(producto.id_talla)}</h2>
                            <h2 className='precio'>Stock: {producto.stock}</h2>

                            <button className="button-buscador" onClick={() => setEditar(producto.id_producto)}>Editar</button>
                            <button className="button-borrador" onClick={() => borrarProducto(producto.id_producto, producto.id_talla)}>Borrar</button>

                            {/* Aparece formulario de editar */}
                            {editar === producto.id_producto && (
                                <Editar producto={producto}
                                    setEditar={setEditar}
                                    setListadoState={setListadoState}
                                />
                            )}
                        </article>
                    );
                })
            ) : (
                <h2>No hay prendas para mostrar</h2>
            )}
        </>
    )
}
