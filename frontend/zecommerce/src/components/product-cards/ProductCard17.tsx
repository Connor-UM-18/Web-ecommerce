"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import styled from "styled-components";

import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import NextImage from "@component/NextImage";
import { IconButton } from "@component/buttons";
import { H4, Paragraph, Small } from "@component/Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";
import { theme } from "@utils/theme";
const API_URL = process.env.NEXT_PUBLIC_API_BACK;

// styled components
const Wrapper = styled(Box)({
  "&:hover": {
    "& .product-actions": { right: 10 },
    "& img": { transform: "scale(1.1)" },
    "& .product-view-action": { opacity: 1 }
  }
});

const CardMedia = styled(Box)({
  maxHeight: 300,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.colors.gray[300],
  "& img": { transition: "0.3s" }
});

const AddToCartButton = styled(IconButton)({
  top: 10,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .1s",
  backgroundColor: "transparent"
});

const QuickViewButton = styled(Button)({
  left: 0,
  bottom: 0,
  opacity: 0,
  width: "100%",
  color: "white",
  borderRadius: 0,
  position: "absolute",
  transition: "all 0.3s",
  backgroundColor: theme.colors.secondary.main
});

// ==============================================================
interface ProductSize {
  nombre_talla: string;
  stock: number;
}


type ProductCard17Props = {
  id_producto: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  nombre_categoria: string;
  imagen_url?: string;
  fecha_agregada?: string;
  tallas?: ProductSize[];
};

// ==============================================================

// const generateSlug = (nombre: string) => {
//   return slug
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, '')
//     .trim()
//     .replace(/\s+/g, '-');
// };

export default function ProductCard17(props: ProductCard17Props) {
  console.log('ProductCard17Props',props);
  
  const { id_producto, nombre, descripcion, precio, nombre_categoria, fecha_agregada, imagen_url, tallas } = props;

  const { state, dispatch } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const cartItem = state.cart.find((item) => item.id_producto === id_producto);

  const handleFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = useCallback(() => setOpenDialog((open) => !open), []);

  // handle add to cart
  const handleAddToCart = () => {
    const payload = {
      id_producto,
      nombre,
      descripcion,
      nombre_categoria,
      precio,
      fecha_agregada,
      tallas,
      imagen_url,
      qty: (cartItem?.qty || 0) + 1
    };

    dispatch({ type: "CHANGE_CART_AMOUNT", payload });
  };

  return (
    <Wrapper>
      <CardMedia>
        <Link href={`/product/${id_producto}`}>
          <NextImage width={300} height={300} src={ `${API_URL}/${imagen_url}`} alt={nombre} className="product-img" />
        </Link>

        <AddToCartButton className="product-actions" onClick={handleAddToCart}>
          <Icon size="18px">shopping-cart</Icon>
        </AddToCartButton>

        <Link href={`/product/${id_producto}`}>
          <QuickViewButton
            size="large"
            variant="contained"
            className="product-view-action"
            //onClick={() => setOpenDialog(true)}
          >
            Ver Producto
          </QuickViewButton>
        </Link>
      </CardMedia>

      <ProductQuickView
        open={openDialog}
        onClose={toggleDialog}
        product={{ id_producto, imagen_url, precio, nombre }}
      />

      <Box p={1} textAlign="center">
        <Small color="gray.500">Categoría {nombre_categoria}</Small>
        <Paragraph fontWeight="bold">{nombre}</Paragraph>
        <H4 fontWeight={700} py={0.5}>
          {currency(precio)}
        </H4>
      </Box>
    </Wrapper>
  );
}
