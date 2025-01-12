"use client";

import Box from "@component/Box";
import Avatar from "@component/avatar";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Typography, { H6 } from "@component/Typography";
import { currency } from "@utils/utils";
const API_URL = process.env.NEXT_PUBLIC_API_BACK;
export default function WriteReview({ item }: { item: any }) {
  return (
    <FlexBox px="1rem" py="0.5rem" flexWrap="wrap" alignItems="center" key={item.product_name}>
      <FlexBox flex="2 2 260px" m="6px" alignItems="center">
        <Avatar src={`${API_URL}/imagen/${item.imagen_url}.png`} size={64} />

        <Box ml="20px">
          <H6 my="0px">{item.nombre_producto}</H6>
          <Typography fontSize="14px" color="text.muted">
            {currency(item.precio_unitario)} x {item.cantidad}
          </Typography>
        </Box>
      </FlexBox>

      <FlexBox flex="1 1 260px" m="6px" alignItems="center">
        <Typography fontSize="14px" color="text.muted">
          Talla: {item.nombre_talla}
        </Typography>
      </FlexBox>

      <FlexBox flex="160px" m="6px" alignItems="center">
        <Button variant="text" color="primary">
          <Typography fontSize="14px">Total: ${item.total_producto}</Typography>
        </Button>
      </FlexBox>
    </FlexBox>
  );
}
