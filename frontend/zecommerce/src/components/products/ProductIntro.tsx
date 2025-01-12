"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H1, H2, H3, H6, SemiSpan } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";
const API_URL = process.env.NEXT_PUBLIC_API_BACK;
// ========================================
type ProductIntroProps = {
  precio: number;
  nombre: string;
  imagen_url: string;
  id_producto: string | number;
  tallas: ProductSize[];
};
// ========================================
interface ProductSize {
  nombre_talla: string;
  stock: number;
}
// ========================================

export default function ProductIntro({ imagen_url, nombre, precio, id_producto, tallas }: ProductIntroProps) {
  const param = useParams();
  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0); // Este estado ya no es necesario con una sola imagen
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null); // Estado para la talla seleccionada
  const [showSizeOptions, setShowSizeOptions] = useState(false);
  const routerId = param.slug as string;
  const cartItem = state.cart.find((item) => item.id_producto === id_producto || item.id_producto === routerId);

  const handleCartAmountChange = (amount: number) => () => {
    if (!selectedSize) {
      setShowSizeOptions(true); // Mostrar las opciones de tallas si no se ha seleccionado una talla
      return;
    }

    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        precio,
        qty: amount,
        nombre: nombre,
        imagen_url: imagen_url,
        id_producto: id_producto || routerId,
        talla: selectedSize.nombre_talla

      }
    });
  };

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <div>
            <FlexBox mb="50px" overflow="hidden" borderRadius={16} justifyContent="center">
              <Image
                width={300}
                height={300}
                src={`${API_URL}/${imagen_url}`}
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </FlexBox>
          </div>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{nombre}</H1>

          <Box mb="24px">
            <H2 color="primary.main" mb="4px" lineHeight="1">
              ${currency(precio)}
            </H2>

            <SemiSpan color="inherit">Disponible</SemiSpan>
          </Box>

          {!cartItem?.qty ? (
            <>
              {showSizeOptions && (
                <Box mb="24px">
                  <H6>Selecciona una talla:</H6>
                  <FlexBox flexDirection="column">
                    {tallas.map((talla) => (
                      <Button
                        key={talla.nombre_talla}
                        size="small"
                        variant="outlined"
                        color={selectedSize?.nombre_talla === talla.nombre_talla ? "primary" : "default"}
                        onClick={() => setSelectedSize(talla)}
                        mb="8px"
                      >
                        {talla.nombre_talla}
                      </Button>
                    ))}
                  </FlexBox>
                </Box>
              )}
              <Button
                mb="36px"
                size="small"
                color="primary"
                variant="contained"
                onClick={handleCartAmountChange(1)}
              >
                Agregar a Carrito
              </Button>
            </>
          ) : (
            <>

              <FlexBox alignItems="center" mb="36px">
                <Button
                  p="9px"
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={handleCartAmountChange(cartItem?.qty - 1)}
                >
                  <Icon variant="small">minus</Icon>
                </Button>

                <H3 fontWeight="600" mx="20px">
                  {cartItem?.qty.toString().padStart(2, "0")}
                </H3>

                <Button
                  p="9px"
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={handleCartAmountChange(cartItem?.qty + 1)}
                >
                  <Icon variant="small">plus</Icon>
                </Button>

              </FlexBox>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
