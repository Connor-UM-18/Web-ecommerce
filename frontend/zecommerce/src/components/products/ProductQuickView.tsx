"use client";

import Box from "@component/Box";
import Card from "@component/Card";
import Modal from "@component/Modal";
import Icon from "@component/icon/Icon";
import ProductIntro from "./ProductIntro";

// ===================================================
type Props = {
  open: boolean;
  onClose: () => void;
  product: {
    nombre: string;
    precio: number;
    imagen_url: string;
    id_producto: string | number;
  };
};
// ===================================================

export default function ProductQuickView({ open, onClose, product }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Card p="1rem" width="100%" maxWidth="800px" borderRadius={8} position="relative">
        <ProductIntro
          id_producto={product.id_producto}
          nombre={product.nombre}
          precio={product.precio}
          imagen_url={product.imagen_url}
        />

        <Box position="absolute" top="0.75rem" right="0.75rem" cursor="pointer">
          <Icon className="close" color="primary" variant="small" onClick={onClose}>
            close
          </Icon>
        </Box>
      </Card>
    </Modal>
  );
}
