"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Formik } from "formik";
import api from "@utils/__api__/users";
import useVisibility from "./useVisibility";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import TextField from "@component/text-field";
import { Button, IconButton } from "@component/buttons";
import { H3, H5, H6, SemiSpan } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import Cookies from "js-cookie";
// STYLED COMPONENT
import { StyledRoot } from "./styles";
import { Cookie } from "next/font/google";

// Instancia de SweetAlert2 para React
const MySwal = withReactContent(Swal);

export default function Signup() {
  const { state, dispatch } = useAppContext();
  const { passwordVisibility, togglePasswordVisibility } = useVisibility();

  const initialValues = {
    nombre: "",
    apellido: "",
    correo_electronico: "",
    pass: "",
    re_password: "",
    telefono: "",
  };

  // Comentamos las validaciones para depuración
  // const formSchema = yup.object().shape({
  //   name: yup.string().required("${path} is required"),
  //   email: yup.string().email("invalid email").required("${path} is required"),
  //   phone: yup
  //     .string()
  //     .required("Teléfono es requerido")
  //     .matches(/^\d{10}$/, "El número de teléfono debe tener 10 dígitos"),
  //   password: yup.string().required("${path} is required"),
  //   re_password: yup
  //     .string()
  //     .oneOf([yup.ref("password"), null], "Passwords must match")
  //     .required("Please re-type password"),
  //   agreement: yup
  //     .bool()
  //     .test(
  //       "agreement",
  //       "You have to agree with our Terms and Conditions!",
  //       (value) => value === true
  //     )
  //     .required("You have to agree with our Terms and Conditions!")
  // });

  const handleFormSubmit = async (values: any) => {
    console.log("Form Values", values);
    try {
      // Llamar a la API para crear el usuario
      let response = await api.createUser(values);
      console.log("User Created", response);
      //guardar en cookies
      
      sessionStorage.setItem("user", JSON.stringify(response));

      // Guardar en cookies
      Cookies.set("user", JSON.stringify(response), { expires: 1 });

      dispatch({ type: "SET_USER", payload: response });
  
      // Validar que el usuario fue creado exitosamente
      if (response.id_usuario) {
        // Mostrar mensaje de éxito
        MySwal.fire({
          title: "Cuenta Creada",
          text: "¡Tu cuenta ha sido creada exitosamente!",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          // Redirigir al usuario a la página de inicio
          window.location.href = "/";
        });
      } else {
        // Mostrar mensaje de error
        throw new Error("No se pudo crear la cuenta");
      }
    } catch (error) {
      // Mostrar mensaje de error
      MySwal.fire({
        title: "Error",
        text: "Hubo un error al crear tu cuenta. Por favor, intenta nuevamente.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    // validationSchema: formSchema // Comentamos las validaciones para depuración
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limitar el campo de teléfono a 10 dígitos
    if (name === "telefono") {
      // Remover caracteres no numéricos y limitar a 10 dígitos
      const phoneValue = value.replace(/\D/g, "").slice(0, 10);
      formik.setFieldValue(name, phoneValue);
    } else {
      formik.handleChange(e);
    }
  };

  const handleButtonClick = (e) => {
    console.log("Button Clicked");

    // Llamar a formik.handleSubmit para manejar el envío del formulario
    formik.handleSubmit();
  };

  return (
    <StyledRoot mx="auto" my="2rem" boxShadow="large" borderRadius={8}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        // validationSchema={formSchema} // Comentamos las validaciones para depuración
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="content">
            <H3 textAlign="center" mb="0.5rem">
              Crear Cuenta
            </H3>

            <H5 fontWeight="600" fontSize="12px" color="gray.800" textAlign="center" mb="2.25rem">
              Por favor, ingrese sus datos
            </H5>

            <TextField
              fullwidth
              name="nombre"
              mb="0.75rem"
              label="Nombres"
              onBlur={handleBlur}
              value={values.nombre}
              onChange={handleChange}
              placeholder="Juan"
              // errorText={touched.nombre && errors.nombre} // Comentamos las validaciones para depuración
            />

            <TextField
              fullwidth
              name="apellido"
              mb="0.75rem"
              label="Apellido"
              onBlur={handleBlur}
              value={values.apellido}
              onChange={handleChange}
              placeholder="Perez"
              // errorText={touched.apellido && errors.apellido} // Comentamos las validaciones para depuración
            />

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
              // errorText={touched.correo_electronico && errors.correo_electronico} // Comentamos las validaciones para depuración
            />

            <TextField
              fullwidth
              mb="0.75rem"
              name="telefono"
              type="tel"
              onBlur={handleBlur}
              value={values.telefono}
              onChange={handleChange}
              placeholder="5555555555"
              label="Teléfono"
              // errorText={touched.telefono && errors.telefono} // Comentamos las validaciones para depuración
            />

            <TextField
              fullwidth
              mb="0.75rem"
              name="pass"
              label="Password"
              placeholder="*********"
              onBlur={handleBlur}
              value={values.pass}
              onChange={handleChange}
              // errorText={touched.pass && errors.pass} // Comentamos las validaciones para depuración
              type={passwordVisibility ? "text" : "password"}
              endAdornment={
                <IconButton
                  p="0.25rem"
                  mr="0.25rem"
                  type="button"
                  color={passwordVisibility ? "gray.700" : "gray.600"}
                  onClick={togglePasswordVisibility}>
                  <Icon variant="small" defaultcolor="currentColor">
                    {passwordVisibility ? "eye-alt" : "eye"}
                  </Icon>
                </IconButton>
              }
            />

            <TextField
              mb="1rem"
              fullwidth
              name="re_password"
              placeholder="*********"
              label="Confirm Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.re_password}
              // errorText={touched.re_password && errors.re_password} // Comentamos las validaciones para depuración
              type={passwordVisibility ? "text" : "password"}
              endAdornment={
                <IconButton
                  p="0.25rem"
                  size="small"
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
              Crear Cuenta
            </Button>
          </form>
        )}
      </Formik>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>¿Ya tienes cuenta?</SemiSpan>
        <Link href="/login">
          <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
            Log in
          </H6>
        </Link>
      </FlexBox>
    </StyledRoot>
  );
}
