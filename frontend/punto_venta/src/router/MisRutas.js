//frontend/src/router/MisRutas.js
import React from 'react';
import { Routes, Route, BrowserRouter, Navigate, useLocation } from 'react-router-dom';
import HeaderNav from '../components/layouts/HeaderNav';
import { Footer } from '../components/layouts/Footer';
import { Almacen } from '../components/almacen/Almacen';
import { Venta } from '../components/venta/Venta';
import { Inicio } from '../components/inicio/Inicio';
import { Inventario } from '../components/inventario/Inventario';
import Trabajadores from '../components/trabajadores/trabajadores';
import Usuarios from '../components/usuarios/usuarios';
import DetalleVenta from '../components/detalle_venta/detalle_venta';
import Categorias from '../components/categorias/categorias';
import Tallas from '../components/tallas/tallas';
import Ventas from '../components/ventas/VentasD';
import PedidoApartado from '../components/pedido_apartado/pedido_apartado';
import DetallePedidoApartado from '../components/detalle_pedido_apartado/detalle_pedido_apartado';
import Reportes from '../components/reportes/reportes';
import Verificador from '../components/verificador/verificador';
import Entregas from '../components/entregas/entregas';
import LoginForm from '../components/loginForm/loginForm';
import Recuperacion from '../components/loginForm/recuperacion';

const AppContent = () => {
  const location = useLocation();

  // Determina si la ruta actual es la página de login
  const isLoginPage = location.pathname === '/loginForm';

  // Determina si la ruta actual es la página de recuperación de contraseña
  const isRecuperacionPage = location.pathname === '/recuperacion';

  // Obtén el tipo de usuario almacenado en localStorage
  const rolUsuario = localStorage.getItem('userType') || 'invitado'; // Por defecto, invitado si no hay userType

  return (
    <>
      {/* Mostrar el HeaderNav excepto en la página de login y recuperación */}
      {!isLoginPage && !isRecuperacionPage && <HeaderNav userType={rolUsuario} />}

      <section className="content-principal">
        <Routes>
          <Route path="/" element={<Navigate to="/loginForm" />} />
          <Route path="/recuperacion" element={<Recuperacion />} />
          <Route path="/inicio" element={<Inicio />} />
          {rolUsuario === 'gerente' && (
            <>
              <Route path="/productos" element={<Almacen />} />
              <Route path="/inventario" element={<Inventario />} />
              <Route path="/reportes" element={<Reportes />} />
              <Route path="/trabajadores" element={<Trabajadores />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/detalle-venta" element={<DetalleVenta />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/tallas" element={<Tallas />} />
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/pedido-apartado" element={<PedidoApartado />} />
              <Route path="/detalle-pedido-apartado" element={<DetallePedidoApartado />} />
              <Route path="/venta" element={<Venta />} />
              <Route path="/verificador" element={<Verificador />} />
              <Route path="/entregas" element={<Entregas />} />
              <Route path="/productos" element={<Almacen />} />
              <Route path="/inventario" element={<Inventario />} />
            </>
          )}
          {rolUsuario === 'vendedor' && (
            <>
              <Route path="/venta" element={<Venta />} />
              <Route path="/verificador" element={<Verificador />} />
              <Route path="/entregas" element={<Entregas />} />
            </>
          )}
          {rolUsuario === 'almacenista' && (
            <>
              <Route path="/productos" element={<Almacen />} />
              <Route path="/inventario" element={<Inventario />} />
            </>
          )}
          <Route path="/loginForm" element={<LoginForm />} />
        </Routes>
      </section>

      {/* Mostrar el Footer excepto en la página de login y recuperación */}
      {!isLoginPage && !isRecuperacionPage && <Footer />}
    </>
  );
};

export const MisRutas = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};
