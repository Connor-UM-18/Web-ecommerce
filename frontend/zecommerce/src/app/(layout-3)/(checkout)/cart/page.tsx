"use client";
import Link from "next/link";
import { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import Swal from "sweetalert2";
import Box from "@component/Box";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import { ProductCard7 } from "@component/product-cards";
// CUSTOM HOOK
import { useAppContext } from "@context/app-context";
// CUSTOM DATA
import countryList from "@data/countryList";
// UTILS
import { currency } from "@utils/utils";
import Cookies from "js-cookie";
import api from "@utils/__api__/ticket";
import withReactContent from "sweetalert2-react-content";


const MySwal = withReactContent(Swal);
type SizeOption = {
  id: number;
  nombre: string;
};

const sizeOptions: SizeOption[] = [
  { id: 1, nombre: "XS" },
  { id: 2, nombre: "S" },
  { id: 3, nombre: "M" },
  { id: 4, nombre: "L" },
  { id: 5, nombre: "XL" },
];
const getTallaId = (nombreTalla: string): number | undefined => {
  const foundSize = sizeOptions.find((option) => option.nombre === nombreTalla);
  return foundSize?.id;
};
const generateVentaData = (state: any) => {
  const cookieString = Cookies.get('user');
      if (cookieString) {
        const decodedString = decodeURIComponent(cookieString);
        const userObject = JSON.parse(decodedString);
        state.user = userObject;
      }
  const id_usuario = state.user.id_usuario || sessionStorage.getItem("id_usuario") || Cookies.get("user");

  const total = state.cart.reduce((accumulator: number, item: any) => {
    return accumulator + (item.precio * item.qty);
  }, 0);

  const productos = state.cart.map((item: any) => {

    const product = state.products.find((p: any) => p.id_producto === item.id_producto);
    const id_talla = getTallaId(item.talla);

    return {
      id_producto: item.id_producto,
      id_talla: id_talla,
      cantidad: item.qty
    };
  });

  const ventaData = {
    id_usuario: id_usuario,
    total: total,
    es_apartado: 1 ,
    productos: productos
  };

  return ventaData;
};

export default function Cart() {
  const { state, dispatch } = useAppContext();

  const getTotalPrice = () => {
    return state.cart.reduce((accumulator, item) => accumulator + item.precio * item.qty, 0) || 0;
  };

  const handleApartar = async () => {
    try {
      const data = generateVentaData(state);
      console.log("data", data);
      
      const response = await api.createTicket(data);
      console.log("handleApartar", data);
      
      dispatch({ type: "CLEAR_CART" });
      console.log("response", response);

      Swal.fire({
        title: "Venta Apartada",
        text: "Tu venta ha sido apartada con éxito.",
        icon: "success",
        confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `http://localhost:1234/ticket/${response.id_venta}`;
        } 
      });
    } catch (error) {
      console.error("Error al apartar la venta", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al apartar la venta. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          {state.cart.map((item) => (
            <ProductCard7
              mb="1.5rem"
              id_producto={item.id_producto}
              key={item.id_producto}
              qty={item.qty}
              nombre={item.nombre}
              precio={item.precio}
              imagen_url={item.imagen_url}
              talla={item.talla}
            />
          ))}
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Card1>
            <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
              <Typography color="gray.600">Total:</Typography>

              <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                ${currency(getTotalPrice())}
              </Typography>
            </FlexBox>
            <Divider mb="1rem" />
            <Link href="/payment">
              <Button variant="contained" color="primary" fullwidth>
                Pagar Ahora
              </Button>
            </Link>
          </Card1>
          <Card1>
          <Button variant="contained" color="primary" fullwidth onClick={handleApartar}>
          Apartar
            </Button>
          </Card1>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const stateList = [
  { value: "New York", label: "New York" },
  { value: "Chicago", label: "Chicago" }
];
