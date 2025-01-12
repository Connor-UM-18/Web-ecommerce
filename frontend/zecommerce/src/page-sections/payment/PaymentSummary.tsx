"use client";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { useAppContext } from "@context/app-context";

export default function CheckoutSummary() {
  const { state, dispatch } = useAppContext();
  console.log("state", state);
  
  const subtotal = state.cart.reduce((sum, item) => sum + item.precio * item.qty, 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;
  console.log("subtotal", subtotal);
  console.log("iva", iva);
  console.log("total", total);
  
  return (
    <Card1>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Subtotal:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            ${subtotal.toFixed(2)}
          </Typography>
        </FlexBox>
      </FlexBox>

      {/* <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Shipping:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            -
          </Typography>
        </FlexBox>
      </FlexBox> */}

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Iva:</Typography>

        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            ${iva.toFixed(2)}
          </Typography>
        </FlexBox>
      </FlexBox>

      {/* <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
        <Typography color="text.hint">Descuento:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            -
          </Typography>
        </FlexBox>
      </FlexBox> */}

      <Divider mb="1rem" />

      <Typography fontSize="25px" fontWeight="600" lineHeight="1" textAlign="right">
        ${total.toFixed(2)}
      </Typography>
    </Card1>
  );
}
