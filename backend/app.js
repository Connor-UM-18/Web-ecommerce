import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import * as routes from './routes/index.js';
import * as models from './models/mysql/index.js';
//import 'dotenv/config';

//Librerias para Handler de imagenes desde el front
import { handleFileUpload , handleFileUploadAndUpdate } from './uploadHandler.js'; // Importa la función de manejo de subida de archivos
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//variables que ocupamos para el handler
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Este es el punto de entrada de la aplicación, aquí se configura el servidor y se definen las rutas usando express
// Direcciones para Productos Tallas Inventario

// Se crea una instancia de express para iniciar el servidor y se le pasan los middlewares que se van a usar
const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta para subir archivos
app.post('/upload', handleFileUpload);
// Nueva ruta PATCH para actualizar productos (incluyendo la imagen)
// app.patch('/productos/:id', handleFileUploadAndUpdate);

// Al crear la ruta de productos se le pasa como parámetro el modelo de productos que se va a usar
app.use('/imagen', express.static(path.join(__dirname, 'uploads/productos')));

app.use('/productos', routes.createProdutosRouter({ productosModelo: models.ProductosModelo }));
app.use('/ventas', routes.createVentaRouter({ ventaModelo: models.VentaModelo }));
app.use('/tallas', routes.createTallasRouter({ tallasModelo: models.TallasModelo }));
app.use('/inventario', routes.createInventarioRouter({ inventarioModelo: models.InventarioModelo }));
app.use('/trabajadores', routes.createTrabajadorRouter({ trabajadorModelo: models.TrabajadorModelo }));
app.use('/pedido-apartado', routes.createPedidoApartadoRouter({ pedidoApartadoModelo: models.PedidoApartadoModelo }));
app.use('/detalle-pedido-apartado', routes.createDetallePedidoApartadoRouter({ detallePedidoApartadoModelo: models.DetallePedidoApartadoModelo }));
app.use('/usuarios', routes.createUsuariosRouter({ usuariosModelo: models.UsuariosModelo }));
app.use('/usuarios-ecommerce', routes.createUsuariosRouter({ usuariosModelo: models.UsuariosEcommerceModelo }));
app.use('/detalle-venta', routes.createDetalleVentaRouter({ detalleVentaModelo: models.DetalleVentaModelo }));
app.use('/ticket', routes.createTicketRouter({ ticketModelo: models.TicketModelo }));
app.use('/productos-stock', routes.createProductosTallasInventarioRouter({ productosTallasInventarioModelo: models.ProductosTallasInventarioModelo }));
app.use('/categorias', routes.createCategoriasRouter({ categoriasModelo: models.CategoriasModelo }));
app.use('/login-usuario', routes.createLoginUsuarioRouter({ usuariosModelo: models.UsuariosModelo }));
app.use('/login-trabajador', routes.createLoginTrabajadorRouter({ trabajadorModelo: models.TrabajadorModelo }));
app.use('/simulador', routes.createSimuladorRouter({ simuladorModelo: models.SimuladorModelo }));
app.use('/entregas', routes.createEntregasRouter({ entregasModelo: models.EntregasModelo }));
app.use('/best-sellers',routes.createBestSellersRouter({detalleVentaModelo: models.DetalleVentaModelo}));
app.use('/recuperacion', routes.createRecuperacionRouter({ recuperacionModelo: models.RecuperacionModelo }));
app.use('/best-categorias', routes.createBestCategoriasRouter({detalleVentaModelo: models.DetalleVentaModelo}));
// Aquí se define el puerto en el que se va a correr el servidor, si no se define se usará el puerto 1234
const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
