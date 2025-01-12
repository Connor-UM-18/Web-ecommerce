"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, Fragment, useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import Box from "@component/Box";
import Radio from "@component/radio";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import { Button, IconButton } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import withReactContent from "sweetalert2-react-content";
import { useAppContext } from "@context/app-context";
import Cookies from "js-cookie";
import api from "@utils/__api__/ticket";
import styled from "styled-components";
import Icon from "@component/icon/Icon";
import * as userApi from "@utils/__api__/users";
import FlexBox from "@component/FlexBox";

const MySwal = withReactContent(Swal);

const StyledRoot = styled.div`
  // Estilos del componente
`;

const initialValues = {
  card_no: "",
  name: "",
  exp_date: "",
  cvc: "",
};

const checkoutSchema = yup.object().shape({
  card_no: yup
    .string()
    .required("Campo requerido")
    .length(16, "El número de tarjeta debe tener 16 dígitos"),
  name: yup.string().required("Campo requerido"),
  exp_date: yup.string().required("Campo requerido"),
  cvc: yup.string().required("Campo requerido"),
});

const generateVentaData = (state) => {
  const id_usuario = state.user.id_usuario;
  const total = state.cart.reduce((acc, item) => acc + item.precio * item.qty, 0);
  const productos = state.cart.map((item) => ({
    id_producto: item.id_producto,
    id_talla: getTallaId(item.talla),
    cantidad: item.qty,
  }));

  return {
    id_usuario,
    total,
    es_apartado: 2,
    productos,
  };
};

const getTallaId = (nombreTalla) => {
  const sizeOptions = [
    { id: 1, nombre: "XS" },
    { id: 2, nombre: "S" },
    { id: 3, nombre: "M" },
    { id: 4, nombre: "L" },
    { id: 5, nombre: "XL" },
  ];
  const foundSize = sizeOptions.find((option) => option.nombre === nombreTalla);
  return foundSize?.id;
};

export default function PaymentForm() {
  const router = useRouter();
  const width = useWindowSize();
  const { state, dispatch } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = width < 769;

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (!state.user || (!state.user.correo_electronico || !state.user.id_usuario)) {
      const correo_electronico = Cookies.get('correo_electronico');
      const id_usuario = Cookies.get('id_usuario');

      if (correo_electronico && id_usuario) {
        const response = { correo_electronico, id_usuario };
        dispatch({ type: 'SET_USER', payload: response });
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(true);
    }

    setIsLoading(false);
  }, [state, dispatch]);

  const handleFormSubmit = async (values) => {
    console.log("Form Values", values);
    
    const data = generateVentaData(state);
    const response = await api.createTicket(data);
    dispatch({ type: 'CLEAR_CART' });

    MySwal.fire({
      title: "Validando tarjeta...",
      text: "Por favor, espera.",
      icon: "info",
      showConfirmButton: false,
      timer: 2000,
      willOpen: () => MySwal.showLoading(),
    }).then(() => {
      return MySwal.fire({
        title: "Estableciendo conexión...",
        text: "Conectando con el banco.",
        icon: "info",
        showConfirmButton: false,
        timer: 2000,
        willOpen: () => MySwal.showLoading(),
      });
    }).then(() => {
      return MySwal.fire({
        title: "Procesando pago...",
        text: "Estamos procesando tu pago.",
        icon: "info",
        showConfirmButton: false,
        timer: 2000,
        willOpen: () => MySwal.showLoading(),
      });
    }).then(() => {
      return MySwal.fire({
        title: "¡Pago Exitoso!",
        text: "Tu pago ha sido procesado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }).then((result) => {
      if (result.isConfirmed) {
        return MySwal.fire({
          title: "¡Gracias por tu compra!",
          text: "Tu pedido ha sido registrado.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ver PDF",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `http://localhost:1234/ticket/${response.id_venta}`;
          } else {
            router.push("/payment");
          }
        });
      }
    });
  };

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  const handleExpirationDateChange = (e, handleChange) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    if (value.length >= 2) {
      const month = value.slice(0, 2);
      if (parseInt(month) < 1 || parseInt(month) > 12) {
        value = "01" + value.slice(2);
      }
    }
    e.target.value = value;
    handleChange(e);
  };

  const handleCardNumberChange = (e, handleChange, setFieldTouched, setFieldError) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    e.target.value = value;
    handleChange(e);
    if (e.type === "blur") {
      setFieldTouched("card_no", true);
      if (value.length < 16) {
        setFieldError("card_no", "El número de tarjeta debe tener 16 dígitos");
      } else {
        setFieldError("card_no", "");
      }
    }
  };

  const handleLoginSubmit = async (values) => {
    try {
      const response = await userApi.loginUser(values);

      if (response.token) {
        const id_usuario = response.id_usuario;
        const user = await userApi.getInformationUser(id_usuario);
        dispatch({ type: "SET_USER", payload: response });
        setIsLoggedIn(true);
        Cookies.set('token', response.token, { expires: 1 });
        Cookies.set('id_usuario', response.id_usuario , { expires: 1 });
        Cookies.set('correo_electronico', response.correo_electronico , { expires: 1 });

        MySwal.fire({
          title: "Login Exitoso",
          text: "Has iniciado sesión correctamente.",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          if (window.location.pathname !== "/payment") {
            router.push("/payment");
          }
        });
      } else {
        MySwal.fire({
          title: "Error",
          text: "Correo electrónico o contraseña incorrectos. Por favor, intenta nuevamente.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: "Hubo un error al intentar iniciar sesión. Por favor, intenta nuevamente.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  const loginInitialValues = { correo_electronico: "", pass: "" };

  const loginSchema = yup.object().shape({
    correo_electronico: yup.string().email("Email inválido").required("Campo requerido"),
    pass: yup.string().required("Campo requerido"),
  });

  return (
    <Fragment>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        isLoggedIn ? (
          <Card1 mb="2rem">
            <Radio
              mb="1.5rem"
              color="secondary"
              name="credit-card"
              onChange={handlePaymentMethodChange}
              checked={paymentMethod === "credit-card"}
              label={
                <Typography ml="6px" fontWeight="600" fontSize="18px" color={paymentMethod === "credit-card" ? "primary" : "textSecondary"}>
                  Pago con tarjeta de crédito o débito
                </Typography>
              }
            />
            <Divider mb="1.25rem" mx="-2rem" />
            {paymentMethod === "credit-card" && (
              <Formik
                initialValues={initialValues}
                validationSchema={checkoutSchema}
                onSubmit={handleFormSubmit} // Asegúrate de pasar handleFormSubmit a onSubmit de Formik
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldTouched, setFieldError }) => (
                  <form onSubmit={handleSubmit}>
                    <Box mb="1.5rem">
                      <Grid container horizontal_spacing={6} vertical_spacing={4}>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            name="card_no"
                            label="Número de tarjeta"
                            onBlur={(e) => handleCardNumberChange(e, handleChange, setFieldTouched, setFieldError)}
                            onChange={(e) => handleCardNumberChange(e, handleChange, setFieldTouched, setFieldError)}
                            value={values.card_no}
                            errorText={touched.card_no && errors.card_no}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            name="exp_date"
                            label="Fecha de expiración"
                            placeholder="MM/AA"
                            onBlur={handleBlur}
                            onChange={(e) => handleExpirationDateChange(e, handleChange)}
                            value={values.exp_date}
                            errorText={touched.exp_date && errors.exp_date}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            name="name"
                            label="Nombre en la tarjeta"
                            onBlur={handleBlur}
                            value={values.name}
                            onChange={handleChange}
                            errorText={touched.name && errors.name}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <TextField
                            fullwidth
                            name="cvc"
                            label="CVC"
                            onBlur={handleBlur}
                            value={values.cvc}
                            onChange={handleChange}
                            errorText={touched.cvc && errors.cvc}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Button variant="outlined" color="primary" mb="30px" type="submit">
                      Pagar
                    </Button>
                    <Divider mb="1.5rem" mx="-2rem" />
                  </form>
                )}
              </Formik>
            )}
            {/* <Radio
              name="cod"
              color="secondary"
              checked={paymentMethod === "cod"}
              onChange={handlePaymentMethodChange}
              label={
                <Typography ml="6px" fontWeight="600" fontSize="18px" color={paymentMethod === "cod" ? "primary" : "textSecondary"}>
                  Efectivo en tienda
                </Typography>
              }
            />
            {paymentMethod === "cod" && (
              <Box mb="1.5rem" mt="1.5rem">
                <Typography fontWeight="600" fontSize="16px" color="textSecondary">
                  Has seleccionado pagar en efectivo. Completarás el pago cuando recojas tu pedido en la tienda.
                </Typography>
              </Box>
            )} */}
          </Card1>
        ) : (
          <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
            <Formik
              initialValues={loginInitialValues}
              validationSchema={loginSchema}
              onSubmit={handleLoginSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                <form className="content" onSubmit={handleSubmit}>
                  <Typography textAlign="center" mb="0.5rem">
                    Para continuar, inicia sesión
                  </Typography>
                  <TextField
                    fullwidth
                    mb="0.75rem"
                    name="correo_electronico"
                    type="email"
                    onBlur={handleBlur}
                    value={values.correo_electronico}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    label="Email"
                    errorText={touched.correo_electronico && errors.correo_electronico}
                  />
                  <TextField
                    mb="1rem"
                    fullwidth
                    name="pass"
                    label="Password"
                    autoComplete="on"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="*********"
                    value={values.pass}
                    errorText={touched.pass && errors.pass}
                    type="password"
                  />
                  <Button mb="1.65rem" variant="contained" color="primary" type="submit" fullwidth>
                    Login
                  </Button>
                  <FlexBox justifyContent="center" mb="1.25rem">
                    <Typography>No tienes cuenta?</Typography>
                    <Link href="/signup">
                      <Typography ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                        Registrate
                      </Typography>
                    </Link>
                  </FlexBox>
                </form>
              )}
            </Formik>
          </StyledRoot>
        )
      )}
      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/cart">
            <Button variant="outlined" color="primary" type="button" fullwidth>
              Regresar al carrito
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
}
