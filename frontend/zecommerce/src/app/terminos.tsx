"use client";

import { Fragment } from "react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Divider from "@component/Divider";
import Typography from "@component/Typography";
import { Header } from "@component/header";
import MobileNavigationBar from "@component/mobile-navigation";
import useWindowSize from "@hook/useWindowSize";

export default function TermsAndConditions() {
  const width = useWindowSize();
  const isMobile = width < 900;

  return (
    <Fragment>
      <Box padding="2rem">
        <Typography variant="h4" gutterBottom>
          Política de Privacidad
        </Typography>
        <Divider mb="1.5rem" />
        
        <Typography variant="h6" gutterBottom>
          1. Introducción
        </Typography>
        <Typography paragraph>
          Bienvenido a nuestro sistema de punto de venta y e-commerce. Valoramos tu privacidad y nos comprometemos a proteger tus datos personales. Esta Política de Privacidad describe cómo recopilamos, usamos, divulgamos y protegemos tu información personal.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          2. Información que Recopilamos
        </Typography>
        <Typography paragraph>
          Recopilamos la información necesaria para proporcionar y mejorar nuestros servicios. La información que recopilamos incluye:
        </Typography>
        <ul>
          <Typography component="li">Datos Personales: Nombre, dirección de correo electrónico, número de teléfono, dirección física y otra información de contacto.</Typography>
          <Typography component="li">Información de la Cuenta: Detalles del usuario como nombre de usuario, contraseñas y datos relacionados con el inicio de sesión.</Typography>
          <Typography component="li">Información de la Transacción: Detalles de las compras realizadas, métodos de pago y datos de facturación.</Typography>
          <Typography component="li">Datos del Dispositivo: Información sobre el dispositivo utilizado para acceder a nuestros servicios, incluyendo la dirección IP, tipo de dispositivo, sistema operativo y tipo de navegador.</Typography>
        </ul>
        
        <Typography variant="h6" gutterBottom>
          3. Uso de la Información
        </Typography>
        <Typography paragraph>
          Utilizamos la información recopilada para los siguientes propósitos:
        </Typography>
        <ul>
          <Typography component="li">Provisión de Servicios: Procesar transacciones y administrar tu cuenta.</Typography>
          <Typography component="li">Mejoras del Servicio: Mejorar la funcionalidad y la usabilidad de nuestro sistema.</Typography>
          <Typography component="li">Comunicaciones: Enviar notificaciones sobre tu cuenta, cambios en nuestros servicios y otras comunicaciones relacionadas.</Typography>
          <Typography component="li">Seguridad: Proteger contra actividades fraudulentas, mejorar la seguridad de nuestro sistema y cumplir con nuestras obligaciones legales.</Typography>
        </ul>
        
        <Typography variant="h6" gutterBottom>
          4. Divulgación de la Información
        </Typography>
        <Typography paragraph>
          No vendemos, alquilamos ni compartimos tu información personal con terceros no relacionados, excepto en las siguientes circunstancias:
        </Typography>
        <ul>
          <Typography component="li">Con Proveedores de Servicios: Compartimos información con proveedores de servicios que nos ayudan a operar nuestro negocio, como procesadores de pagos y proveedores de alojamiento web.</Typography>
          <Typography component="li">Por Obligación Legal: Divulgaremos información cuando sea necesario para cumplir con la ley, una orden judicial o un proceso legal.</Typography>
          <Typography component="li">Para Proteger nuestros Derechos: Divulgaremos información cuando sea necesario para proteger nuestros derechos, la seguridad de nuestros usuarios y la integridad de nuestro sistema.</Typography>
        </ul>
        
        <Typography variant="h6" gutterBottom>
          5. Seguridad de la Información
        </Typography>
        <Typography paragraph>
          Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra el acceso no autorizado, la pérdida y el uso indebido. Utilizamos cifrado, firewalls y otras tecnologías de seguridad para proteger tus datos.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          6. Retención de Datos
        </Typography>
        <Typography paragraph>
          Retenemos tu información personal mientras sea necesario para proporcionar nuestros servicios, cumplir con nuestras obligaciones legales y resolver disputas. Cuando ya no necesitemos tu información, la eliminaremos de manera segura.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          7. Tus Derechos
        </Typography>
        <Typography paragraph>
          Tienes derecho a acceder, corregir, actualizar o eliminar tu información personal. También puedes oponerte al procesamiento de tus datos personales, solicitar la limitación del tratamiento y la portabilidad de los datos. Para ejercer estos derechos, por favor contáctanos a través de la información de contacto proporcionada a continuación.
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          8. Cambios en la Política de Privacidad
        </Typography>
        <Typography paragraph>
          Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Notificaremos cualquier cambio a través de nuestro sitio web o por otros medios de comunicación. Te recomendamos revisar periódicamente esta política para estar informado sobre cómo protegemos tu información.
        </Typography>
      </Box>
      {isMobile && <MobileNavigationBar />}
    </Fragment>
  );
}
