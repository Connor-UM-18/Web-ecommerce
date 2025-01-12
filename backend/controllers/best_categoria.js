
export class BestCategoriasController{

    constructor({detalleVentaModelo}) {
        this.detalleVentaModelo = detalleVentaModelo
    }

    bestCategorias = async (req, res) => {

        const {mes, anio} = req.params;
        try {
            const bestCategoria = await this.detalleVentaModelo.bestCategorias({mes, anio});
            if (bestCategoria.length > 0) return res.json(bestCategoria);
            return res.status(404).json({ error: 'No se encontraron categorias' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Detalle Venta' });
            
        }
    }
}