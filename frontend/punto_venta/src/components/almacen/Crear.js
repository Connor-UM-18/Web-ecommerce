import React, { useState, useEffect } from 'react'
import { GuardarEnStorage } from '../../helpers/GuardarEnStorage';

export const Crear = ({ setListadoState }) => {

    const tituloComponente = "Añadir Prenda";

    // useEffect(() => {
    //     obtenerProductos();
    // }, []);

    // const obtenerProductos = () => {
    //     fetch('http://localhost:1234/productos')
    //         .then(response => response.json())
    //         .then(data => {
    //             setListadoState(data); // Actualiza el estado con los productos obtenidos
    //         })
    //         .catch(error => console.error('Error al obtener productos:', error));
    // };

    // fetch("http://localhost:1234/productos", {
    //     method: "POST",
    //     headers: {
    //         'content-Type': 'aplication/json'
    //     },
    //     body: {
    //         //Objeto que se va a mandar
    //     }
    // })

    //PATCH editar datos
    //Get obtener datos
    //Delete borrar
    //Por el momento no agregar imagen
    //Parte inventario solamente ID, TALLA Y STOCK
    //API Para reportes

    const [peliState, setPeliState] = useState({
        imagen: null,
        titulo: "",
        precio: 0,
        descripcion: ""
    });

    const { titulo, descripcion } = peliState;

    // const pruebaBBDDGet=(e)=>{
    //     fetch('https://tu-url-de-base-de-datos.com/endpoint', {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       })
    //         .then(response => {
    //           if (!response.ok) {
    //             throw new Error('Error en la red');
    //           }
    //           return response.json();
    //         })
    //         .then(data => {
    //           console.log('Datos obtenidos:', data);
    //         })
    //         .catch(error => {
    //           console.error('Error al obtener datos:', error);
    //         });
    // }

    // const pruebaBBDD = (e) => {
    //     e.preventDefault();

    //     //conseguir datos del forumario
    //     let target = e.target;
    //     let imagen = target.imagen.value;
    //     let titulo = target.titulo.value;
    //     let precio = target.precio.value;
    //     let descripcion = target.descripcion.value;

    //     fetch("http://localhost:1234/productos", {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'aplication/json'
    //         },
    //         body: JSON.stringify( {
    //             //Objeto que se va a mandar
    //             imagen: imagen,
    //             titulo: titulo,
    //             precio: precio,
    //             descripcion: descripcion
    //         })
    //     })        
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Success:', data);
    //         // Actualizar el estado del listado principal
    //         setListadoState(elementos => [...elementos, data]);

    //         // Limpiar el formulario
    //         setPeliState({
    //             imagen: null,
    //             titulo: "",
    //             precio: 0,
    //             descripcion: ""
    //         });
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
    // }

     const conseguirDatosForm = (e) => {
         e.preventDefault();

         //conseguir datos del forumario
         let target = e.target;
         let imagen = target.imagen.value;
         let titulo = target.titulo.value;
         let precio = target.precio.value;
         let descripcion = target.descripcion.value;

        //Crear objeto de la pelicula a guardar 
         let peli = {
             imagen: imagen,
             titulo: titulo,
             precio: precio,
             descripcion: descripcion
         };

         //Guardar estado
         setPeliState(peli);

         //Actualizar el estado del listado principal
         setListadoState(elementos => {
             return [...elementos, peli];
         })

         //Guardar en el almacenamiento local:
         GuardarEnStorage("pelis", peli);

        // Limpiar el formulario
         setPeliState({
             imagen: null,
             titulo: "",
             talla: "",
             prendas: 0,
             precio: 0,
             descripcion: ""
         });

     }

     const handleInputChange = (e) => {
         const { name, value } = e.target;
         // Convertir a número si el campo es `stock` o `precio`
         const newValue = (name === 'stock' && name === 'precio') ? Number(value) : value;

         setPeliState({
             ...peliState,
             [name]: newValue
         });
     };



    return (
        <div className="add">
            <h3 className="title">{tituloComponente}</h3>

            <strong>
                {(titulo && descripcion) && "Has agregado la prenda: " + peliState.titulo}
            </strong>


            <form onSubmit={conseguirDatosForm}>

                <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    accept="image/*"
                />

                <input type="text"
                    id='titulo'
                    name='titulo'
                    placeholder="Nombre de la Prenda"
                    value={titulo}
                    onChange={handleInputChange}
                />

                {/* <input type="text"
                    id='talla'
                    name='talla'
                    placeholder="Talla"
                    value={talla}
                    onChange={handleInputChange}
                /> */}

                {/* <input type="number"
                    id='stock'
                    name='stock'
                    min='1'
                    max='10'
                    placeholder="Numero de prendas"
                /> */}

                <input type="number"
                    id='precio'
                    name='precio'
                    min='1'
                    max='1000'
                    placeholder="Precio"
                    step ="0.01"
                />

                <textarea
                    id='descripcion'
                    name='descripcion'
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={handleInputChange}
                    ></textarea>


                <input type="submit"
                    value="Guardar"
                />

            </form>

        </div>
    )
}
