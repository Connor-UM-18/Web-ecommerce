import PDF from 'pdfkit-table';

export class TicketController {
    constructor({ ticketModelo }) {
        this.ticketModelo = ticketModelo;
    }

    generate = async (req, res) => {
        const doc = new PDF({ bufferPages: true, size: 'A6', margin: 10 });

        const { id } = req.params;

        const { infoVenta, infoProductos } = await this.ticketModelo.getInfo({ id });

        if (!infoVenta) {
            return res.status(404).json({ message: 'Venta no encontrada' });
        }

        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=ticket.pdf'
        });

        doc.on('data', (data) => { stream.write(data) });
        doc.on('end', () => { stream.end() });

        doc.text('Estilo Exquisito', { align: 'center' });
        doc.fontSize(8);
        doc.text('uuid: ' + infoVenta.id_venta, { align: 'center' });
        doc.text('Fecha: ' + infoVenta.fecha, { align: 'center' });

        const table = {
            headers: ['Producto', 'Talla', 'Cantidad', 'Precio Unitario', 'Precio Total'],
            rows: infoProductos.map(producto => [
                producto.nombre,
                producto.nombre_talla,
                producto.cantidad,
                producto.precio_unitario,
                (parseFloat(producto.precio_unitario) * parseFloat(producto.cantidad)).toFixed(2) // Formatear a 2 decimales
            ]),
        };

        doc.moveDown();
        doc.table(table, {
            columnsSize: [100, 25, 50, 50, 50],
        });

        doc.text('Monto total: ' + parseFloat(infoVenta.monto).toFixed(2), { align: 'right' }); // Formatear a 2 decimales
        doc.moveDown();
        //doc.text("Le atendió: "+req.user.nombre, {align: 'center'}); TODO: Implementar autenticación
        doc.moveDown();
        doc.text('Gracias por su compra', { align: 'center' });
        doc.text('Recuerde visitar www.estiloexquisito.com', { align: 'center' });
        doc.end();
    }
}
