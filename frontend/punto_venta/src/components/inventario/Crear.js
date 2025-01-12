import React, {useState} from 'react'

export const Crear = (setListadoState) => {

  const tituloComponente = "Añadir Prenda";

  //Parte inventario solamente ID, TALLA Y STOCK
  //API Para reportes

  const [prendaState, setprendaState] = useState({
    id_producto: "",
    id_talla: 1,
    stock: 1
  });

  const { id_producto, stock } = prendaState;

  const conseguirDatosForm = (e) => {
    e.preventDefault();

    //conseguir datos del forumario
    let target = e.target;
    // let imagen = target.imagen.value;
    let idProducto = parseInt(target.id_producto.value);
    let idTalla = parseInt(target.id_talla.value);
    let stock = parseInt(target.stock.value);

    //Crear objeto de la pelicula a guardar 
    let producto = {
        id_producto: idProducto,
        id_talla: idTalla,
        stock: stock
    };

    //Guardar en la BD
    //POST
    fetch('http://localhost:1234/inventario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        return response.json();
      })
      .then(data => {
        console.log('Producto Agregado:', data);
        alert("Producto Agregado a la base de datos")
      })
      .catch(error => {
        console.log('Error al agregar producto:', error);
        alert("Error al agregar producto")
      });

    // Limpiar el formulario
    setprendaState({
        id_producto: "",
        id_talla: 1,
        stock: 1
    });

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convertir a número si el campo es `stock` o `precio`
    const newValue = (name === 'stock' && name === 'precio') ? Number(value) : value;

    setprendaState({
      ...prendaState,
      [name]: newValue
    });
  };



  return (
    <div className="add">
      <h3 className="title">{tituloComponente}</h3>

      <strong>
        {(id_producto && stock) && "Agregarás la prenda: " + prendaState.nombre}
      </strong>


      <form onSubmit={conseguirDatosForm}>

        <input type="text"
          id='id_producto'
          name='id_producto'
          placeholder="ID Producto"
          value={id_producto}
          onChange={handleInputChange}
        />

        <input type="number"
          id='id_talla'
          name='id_talla'
          min='1'
          max='5'
          placeholder="ID Talla"
        />

        <input type="number"
          id='stock'
          name='stock'
          min='1'
          max='1000'
          placeholder="Stock"
        />

        <input type="submit"
          value="Guardar"
          className='button-buscador'
        />

      </form>

    </div>
  )
}
