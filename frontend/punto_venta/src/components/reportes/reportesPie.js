import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportePie = ({ mes, anio }) => {
  const [mensaje, setMensaje] = useState('');
  const [pieData, setPieData] = useState({});

  const handleGenerarReporte = async () => {
    if (!mes || !anio) {
      setMensaje('Por favor, seleccione mes y año.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:1234/ventas/date/${mes}/${anio}`);
      const ventasData = response.data;

      if (ventasData.length === 0) {
        setMensaje('No existen registros para la fecha introducida.');
        setPieData({});
      } else {
        const posId = "97376864-382c-11ef-89fb-a2aad19a47c0";
        let posVentasTotal = 0;
        let ecommerceVentasTotal = 0;

        ventasData.forEach(venta => {
          if (venta.id_usuario === posId) {
            posVentasTotal += parseFloat(venta.monto);
          } else {
            ecommerceVentasTotal += parseFloat(venta.monto);
          }
        });

        setMensaje('');
        setPieData({
          labels: ['E-commerce', 'Punto de Venta'],
          datasets: [
            {
              data: [ecommerceVentasTotal, posVentasTotal],
              backgroundColor: ['#FF6384', '#36A2EB'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      setMensaje('Error al generar el reporte. Intente nuevamente.');
    }
  };

  useEffect(() => {
    if (mes && anio) {
      handleGenerarReporte();
    }
  }, [mes, anio]);

  return (
    <div>
      <h2>Reporte de Ventas por Tipo</h2>

      {mensaje && <p>{mensaje}</p>}

      {pieData.labels && (
        <div className="chart-container">
          <div className="chart-title">Ventas totales por tipo</div>
          <Pie data={pieData} />
        </div>
      )}
    </div>
  );
};

export default ReportePie;
