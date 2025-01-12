import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def enviar_correo(remitente, contraseña, destinatario, asunto, mensaje):
    """
    Envía un correo electrónico.

    Args:
        remitente: Dirección de correo del remitente.
        contraseña: Contraseña de aplicación del remitente.
        destinatario: Dirección de correo del destinatario.
        asunto: Asunto del correo.
        mensaje: Cuerpo del mensaje.
    """

    msg = MIMEMultipart()
    msg['From'] = remitente
    msg['To'] = destinatario
    msg['Subject'] = asunto
    msg.attach(MIMEText(mensaje, 'plain'))

    try:
        print("Estableciendo conexión con el servidor SMTP (SSL)...")
        server = smtplib.SMTP_SSL('smtp.mail.yahoo.com', 465)  # Conexión SSL
        server.set_debuglevel(1)  # Nivel de depuración para obtener más información
        server.ehlo()
        print("Iniciando sesión...")
        server.login(remitente, contraseña)  # Inicia sesión
        print("Enviando correo...")
        server.sendmail(remitente, destinatario, msg.as_string())  # Envía el correo
        server.quit()  # Cierra la conexión
        print("Correo electrónico enviado exitosamente!")
    except smtplib.SMTPAuthenticationError as e:
        print(f'Error de autenticación: {e.smtp_code} - {e.smtp_error}')
        print("Por favor, revisa la contraseña y la configuración de tu cuenta.")
    except smtplib.SMTPConnectError as e:
        print(f'Error de conexión: {e.smtp_code} - {e.smtp_error}')
    except smtplib.SMTPServerDisconnected as e:
        print(f'Conexión con el servidor cerrada inesperadamente: {str(e)}')
    except smtplib.SMTPException as e:
        print(f'Error en SMTP: {str(e)}')
    except Exception as e:
        print(f'Error al enviar el correo: {str(e)}')

# Ejemplo de uso
if __name__ == "__main__":
    remitente = "soyconnor@yahoo.com.mx"  # Cambia a tu correo de Yahoo.com.mx
    contraseña = "kkahwljdotmbfuip"  # Reemplaza con tu contraseña de aplicación
    destinatario = "connor.urbano.mendoza@gmail.com"
    asunto = "Prueba de correo electrónico"
    mensaje = "Este es un correo electrónico de prueba enviado desde Python."

    enviar_correo(remitente, contraseña, destinatario, asunto, mensaje)
