import React, { useState } from 'react'
import { Escanear } from './Escanear'
import { Producto } from './Producto'
import { ProductosEsca } from './ProductosEsca'

export const Venta = () => {

    //Este será el producto escaneas
    const [productoEsca, setProductoEsca]=useState([])

    //Aqui se irán agregando los productos que se vayan seleccionando
    const [productos, setProductos]= useState([]);

    console.log(productos)


    return (
        <div className='ventas'>
            <section className='section-escanear'>
                <Escanear setProductoEsca={setProductoEsca}/>
            </section>
            <section className='section-producto-escaneado'>
                <Producto productoEsca={productoEsca} setProductos={setProductos} />
            </section>
            <section className='section-productos-escaneados'>
                <ProductosEsca productos={productos} setProductos={setProductos}/>
            </section>
        </div>
    )
}
