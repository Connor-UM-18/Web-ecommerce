import React from 'react'

export const Editar = ({ producto, setEditar, setListadoState }) => {
    const titulo_componente = "Editar Stock"


    const guardarEdicion = (e, id) => {
        e.preventDefault();

        //Conseguir el target del evento
        let target = e.target;

        //Crear objeto con ese indice, titulo y descripcion del formulario
        let producto_actualizado = {
            stock: parseInt(target.Stock.value)
        }

        //PATCH
        fetch('http://localhost:1234/inventario/' + producto.id_producto+"/"+producto.id_talla+"/stock", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto_actualizado)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json();
            })
            .then(data => {
                console.log('Producto Modificado:', data);
                alert("Producto Editado Correctamente")
            })
            .catch(error => {
                console.log('Error al modificar producto:', error);
                alert("Error al editar producto")
            });

        setEditar(0);


    }

    return (
        <div className='edit_form'>
            <h3 className='title'>{titulo_componente}</h3>
            <form onSubmit={e => guardarEdicion(e, producto.id_producto)}>

                <input type="number"
                    name='Stock'
                    className='precio_editado'
                    min='1'
                    max='1000'
                    defaultValue={producto.stock}
                />


                <input type='submit' className='button-buscador' value="Actualizar" />
            </form>
        </div>
    )
}
