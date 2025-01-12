//frontend/src/commponents/layouts/HeaderNav.js
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNav = ({ userType }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Función para cerrar el dropdown cuando se hace clic fuera de él
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  // Efecto para agregar el manejador de eventos cuando se monta el componente
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Función para renderizar el menú según el tipo de usuario
  const renderMenu = () => {
    switch (userType) {
      case 'gerente':
        return (
          <ul>
            <li><NavLink to="/inicio" activeclassname="active">Inicio</NavLink></li>
            <li ref={dropdownRef} className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle" aria-haspopup="true" activeclassname="active" aria-expanded={showDropdown ? "true" : "false"}>
              Gerente <span className="caret"></span>
            </button>
            
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li><NavLink to="/trabajadores" activeclassname="active">Trabajadores</NavLink></li>
                  <li><NavLink to="/usuarios" activeclassname="active">Usuarios</NavLink></li>
                  <li><NavLink to="/detalle-venta" activeclassname="active">Detalles de Ventas</NavLink></li>
                  <li><NavLink to="/categorias" activeclassname="active">Categorias</NavLink></li>
                  <li><NavLink to="/tallas" activeclassname="active">Tallas</NavLink></li>
                  <li><NavLink to="/ventas" activeclassname="active">Ventas</NavLink></li>
                </ul>
              )}
            </li>
            <li><NavLink to="/productos" activeclassname="active">Productos</NavLink></li>
            <li><NavLink to="/inventario" activeclassname="active">Inventario</NavLink></li>
            <li><NavLink to="/venta" activeclassname="active">Venta</NavLink></li>
            <li><NavLink to="/verificador" activeclassname="active">Verificador de precios</NavLink></li>
            <li><NavLink to="/reportes" activeclassname="active">Reportes</NavLink></li>
          </ul>
        );
      case 'vendedor':
        return (
          <ul>
            <li><NavLink to="/venta" activeclassname="active">Venta</NavLink></li>
            <li><NavLink to="/verificador" activeclassname="active">Verificador de precios</NavLink></li>
          </ul>
        );
      case 'almacenista':
        return (
          <ul>
            <li><NavLink to="/productos" activeclassname="active">Productos</NavLink></li>
            <li><NavLink to="/inventario" activeclassname="active">Inventario</NavLink></li>
          </ul>
        );
      default:
        return (
          <ul>
            <li><NavLink to="/inicio" activeclassname="active">Inicio</NavLink></li>
          </ul>
        );
    }
  };

  return (
    <div className="header-principal">
      <header className="header">
        <h1>Estilo Exquisito</h1>
      </header>

      {/* Barra de navegación */}
      <nav className="nav">
        {renderMenu()}
      </nav>
    </div>
  );
};

export default HeaderNav;
/* //frontend/src/commponents/layouts/HeaderNav.js
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const HeaderNav = ({ userType }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Función para cerrar el dropdown cuando se hace clic fuera de él
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  // Efecto para agregar el manejador de eventos cuando se monta el componente
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Función para renderizar el menú según el tipo de usuario
  const renderMenu = () => {
    switch (userType) {
      case 'gerente':
        return (
          <ul>
            <li><NavLink to="/inicio" activeclassname="active">Inicio</NavLink></li>
            <li ref={dropdownRef} className="dropdown">
              <a href="#" onClick={toggleDropdown} className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded={showDropdown ? "true" : "false"}>
                Gerente <span className="caret"></span>
              </a>
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li><NavLink to="/trabajadores" activeclassname="active">Trabajadores</NavLink></li>
                  <li><NavLink to="/usuarios" activeclassname="active">Usuarios</NavLink></li>
                  <li><NavLink to="/detalle-venta" activeclassname="active">Detalles de Ventas</NavLink></li>
                  <li><NavLink to="/categorias" activeclassname="active">Categorias</NavLink></li>
                  <li><NavLink to="/tallas" activeclassname="active">Tallas</NavLink></li>
                  <li><NavLink to="/ventas" activeclassname="active">Ventas</NavLink></li>
                </ul>
              )}
            </li>
            <li><NavLink to="/productos" activeclassname="active">Productos</NavLink></li>
            <li><NavLink to="/inventario" activeclassname="active">Inventario</NavLink></li>
            <li><NavLink to="/venta" activeclassname="active">Venta</NavLink></li>
            <li><NavLink to="/verificador" activeclassname="active">Verificador de precios</NavLink></li>
            <li><NavLink to="/entregas" activeclassname="active">Entregas</NavLink></li>
            <li><NavLink to="/reportes" activeclassname="active">Reportes</NavLink></li>
          </ul>
        );
      case 'vendedor':
        return (
          <ul>
            <li><NavLink to="/venta" activeclassname="active">Venta</NavLink></li>
            <li><NavLink to="/verificador" activeclassname="active">Verificador de precios</NavLink></li>
            <li><NavLink to="/entregas" activeclassname="active">Entregas</NavLink></li>
          </ul>
        );
      case 'almacenista':
        return (
          <ul>
            <li><NavLink to="/productos" activeclassname="active">Productos</NavLink></li>
            <li><NavLink to="/inventario" activeclassname="active">Inventario</NavLink></li>
          </ul>
        );
      default:
        return (
          <ul>
            <li><NavLink to="/inicio" activeclassname="active">Inicio</NavLink></li>
          </ul>
        );
    }
  };

  return (
    <div className="header-principal">
      <header className="header">
        <h1>Estilo Exquisito</h1>
      </header>

      {/* Barra de navegación }
      <nav className="nav">
        {renderMenu()}
      </nav>
    </div>
  );
};

export default HeaderNav;*/