import React, { useState } from 'react';
import { Escanear } from './Escanear';
import { Producto } from './Producto'

const Verificador = () => {
  //Este será el producto escaneas
  const [productoEsca, setProductoEsca]=useState([])

  //Aqui se irán agregando los productos que se vayan seleccionando
  const [productos, setProductos]= useState([]);

  return (
    <div className='verificador'>
        <section className='section-escanear'>
            <Escanear setProductoEsca={setProductoEsca} />
        </section>
        <section className='section-producto-escaneado'>
                <Producto productoEsca={productoEsca} setProductos={setProductos} />
        </section>
      
    </div>
  );
};

export default Verificador;
