"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "@utils/__api__/users";
import Cookies from 'js-cookie';
import useVisibility from "./useVisibility";
import styled from "styled-components";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan, Small, Span } from "@component/Typography";
import { useAppContext } from "@context/app-context";
// STYLED COMPONENT
import { StyledRoot } from "./styles";

// Instancia de SweetAlert2 para React
const MySwal = withReactContent(Swal);

export default function Login({ returnUrl }: { returnUrl?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const actualReturnUrl = returnUrl || searchParams.get('returnUrl') || '/profile';
  console.log("actualReturnUrl", actualReturnUrl);
  

  const { passwordVisibility, togglePasswordVisibility } = useVisibility();
  const { dispatch } = useAppContext();
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario

  const initialValues = { correo_electronico: "", pass: "" };

  const formSchema = yup.object().shape({
    correo_electronico: yup.string().email("invalid email").required("${path} is required"),
    pass: yup.string().required("${path} is required")
  });

  const handleFormSubmit = async (values: any) => {
    try {
      const response = await api.loginUser(values);
      console.log("Response", response);

      if (response.token) {
        const id_usuario = response.id_usuario;
        const user = await api.getInformationUser(id_usuario);
        console.log("User", user);
        
        // Guardar los datos del usuario en el estado
        dispatch({ type: "SET_USER", payload: response });
        setUserData(response);
        Cookies.set('token', response.token, { expires: 1 });
        Cookies.set('user', response.id_usuario , { expires: 1 });
        Cookies.set('email', response.correo_electronico , { expires: 1 }); 

        // Mostrar mensaje de éxito
        MySwal.fire({
          title: "Login Exitoso",
          text: "Has iniciado sesión correctamente.",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          if (actualReturnUrl) {
            router.push(actualReturnUrl);
          }
        });
      } else {
        // Mostrar mensaje de error
        MySwal.fire({
          title: "Error",
          text: "Correo electrónico o contraseña incorrectos. Por favor, intenta nuevamente.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      // Mostrar mensaje de error en caso de fallo de la llamada a la API
      MySwal.fire({
        title: "Error",
        text: "Hubo un error al intentar iniciar sesión. Por favor, intenta nuevamente.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema
  });

  return (
        <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
          <form className="content" onSubmit={handleSubmit}>
            <H3 textAlign="center" mb="0.5rem">
              Bienvenido a Exquisito
            </H3>

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
              type={passwordVisibility ? "text" : "password"}
              endAdornment={
                <IconButton
                  p="0.25rem"
                  mr="0.25rem"
                  type="button"
                  onClick={togglePasswordVisibility}
                  color={passwordVisibility ? "gray.700" : "gray.600"}>
                  <Icon variant="small" defaultcolor="currentColor">
                    {passwordVisibility ? "eye-alt" : "eye"}
                  </Icon>
                </IconButton>
              }
            />

            <Button mb="1.65rem" variant="contained" color="primary" type="submit" fullwidth>
              Login
            </Button>

            <FlexBox justifyContent="center" mb="1.25rem">
              <SemiSpan>No tienes cuenta?</SemiSpan>
              <Link href="/signup">
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  Registrate
                </H6>
              </Link>
            </FlexBox>
          </form>

          {/* <FlexBox justifyContent="center" bg="gray.200" py="19px">
            <SemiSpan>Olvidaste tu contraseña?</SemiSpan>
            <Link href="/">
              <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                Recuperar Contraseña
              </H6>
            </Link>
          </FlexBox> */}
        </StyledRoot>
  );
}
