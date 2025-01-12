import React from 'react'

export const Editar = ({ peli, conseguirProductos, setEditar, setListadoState }) => {
    const titulo_componente = "Editar Pelicula"


    const guardarEdicion = (e, id) => {
        e.preventDefault();

        //Conseguir el target del evento
        let target = e.target;

        //Buscar el indice del objeto de la pelicula a actualizar
        const productos_almacenados = conseguirProductos();
        const indice = productos_almacenados.findIndex(peli => peli.id === id);

        //Crear objeto con ese indice, titulo y descripcion del formulario
        let peli_actualizada = {
            id: id,
            imagen: target.imagen.value,
            titulo: target.titulo.value,
            talla: target.talla.value,
            prendas:target.stock.value,
            precio:target.precio.value,
            descripcion: target.descripcion.value
        }

        //Actualizar el elemento con ese indice
        productos_almacenados[indice] = peli_actualizada;

        //Guardar el nuevo array de objetos en el localStorage
        localStorage.setItem("pelis", JSON.stringify(productos_almacenados));

        //Actualizar estados
        setListadoState(productos_almacenados);
        setEditar(0);


    }

    return (
        <div className='edit_form'>
            <h3 className='title'>{titulo_componente}</h3>
            <form onSubmit={e => guardarEdicion(e, peli.id)}>

                <input
                    type="file"
                    name="imagen"
                    accept="image/*"
                />

                <input type='text'
                    name='titulo'
                    className='titulo_editado'
                    defaultValue={peli.titulo}
                />

                {/* <input type='text'
                    name='talla'
                    className='talla_editado'
                    defaultValue={peli.talla}
                /> */}

                {/* <input type='number'
                    name='stock'
                    className='stock_editado'
                    min='1'
                    max='10'
                    placeholder='Stock Nuevo'
                /> */}

                <input type="number"
                    name='precio'
                    className='precio_editado'
                    min='1'
                    max='1000'
                    placeholder='Precio Nuevo'
                />

                <textarea
                    name='descripcion'
                    defaultValue={peli.descripcion}
                    className='descripcion_editada'
                />
                <input type='submit' className='editar' value="Actualizar" />
            </form>
        </div>
    )
}
