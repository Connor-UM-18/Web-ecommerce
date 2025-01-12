
export class BestSellersController{

    constructor({detalleVentaModelo}) {
        this.detalleVentaModelo = detalleVentaModelo
    }

    bestSellers = async (req, res) => {
        const {mes, anio} = req.params;
        try {
            const bestSellers = await this.detalleVentaModelo.bestSellers({mes, anio});
            res.json(bestSellers);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'No se pudo consultar la base de datos de Detalle Venta' });
            
        }
    }
}