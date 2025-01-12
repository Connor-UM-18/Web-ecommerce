import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Typography, { H5, H6, Paragraph, Tiny , SemiSpan} from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";
import { StyledMiniCart } from "./styles";

const API_URL = process.env.NEXT_PUBLIC_API_BACK;
// ==============================================================
type MiniCartProps = { toggleSidenav?: () => void };
// ==============================================================

export default function MiniCart({ toggleSidenav = () => { } }: MiniCartProps) {
  const { state, dispatch } = useAppContext();

  const handleCartAmountChange = (amount: number, product: any) => () => {
    console.log("product--handleCartAmountChange", product);

    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...product, qty: amount }
    });
  };

  const handleRemoveFromCart = (product: any) => () => {
    console.log("product--handleRemoveFromCart", product);

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: product
    });
  };

  const getTotalPrice = () => {
    return state.cart.reduce((accumulator, item) => accumulator + item.precio * item.qty, 0) || 0;
  };

  return (
    <StyledMiniCart>
      <div className="cart-list">
        <FlexBox alignItems="center" m="0px 20px" height="74px">
          <Icon size="1.75rem">bag</Icon>
          <Typography fontWeight={600} fontSize="16px" ml="0.5rem">
            {state.cart.length} Productos
          </Typography>
        </FlexBox>

        <Divider />

        {!!!state.cart.length && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 80px)">
            <Image src="/assets/images/logos/shopping-bag.svg" width={90} height={90} alt="bonik" />
            <Paragraph mt="1rem" color="text.muted" textAlign="center" maxWidth="200px">
              Tu carrito está vacío
            </Paragraph>
          </FlexBox>
        )}

        {state.cart.map((item) => (
          <Fragment key={item.id_producto}>
            <div className="cart-item">
              {console.log("Item actual:", item)}
              <FlexBox alignItems="center" flexDirection="column">
                <Button
                  size="none"
                  padding="5px"
                  color="primary"
                  variant="outlined"
                  borderRadius="300px"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(item.qty + 1, item)}>
                  <Icon variant="small">plus</Icon>
                </Button>

                <Typography fontWeight={600} fontSize="15px" my="3px">
                  {item.qty}
                </Typography>

                <Button
                  size="none"
                  padding="5px"
                  color="primary"
                  variant="outlined"
                  borderRadius="300px"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(item.qty - 1, item)}
                  disabled={item.qty === 1}>
                  <Icon variant="small">minus</Icon>
                </Button>
              </FlexBox>

              <Link href={`/product/${item.slug}`}>
                <Avatar
                  size={76}
                  mx="1rem"
                  alt={item.nombre}
                  //src={item.imgUrl || "/assets/images/products/iphone-x.png"}
                  src={`${API_URL}/${item.imagen_url}`}
                />
              </Link>

              <div className="product-details">
                <Link href={`/product/${item.id_producto}`}>
                  <H5 className="title" fontSize="14px">
                    {item.nombre}
                  </H5>
                </Link>

                <Typography fontWeight={600} fontSize="14px" color="primary.main" mt="8px">
                   <SemiSpan>Talla: {item.talla}</SemiSpan>
                </Typography>

                <Tiny color="text.muted">
                  {currency(item.precio, 0)} x {item.qty}
                </Tiny>

                <Typography fontWeight={600} fontSize="14px" color="primary.main" mt="4px">
                  {currency(item.qty * item.precio)}
                </Typography>
              </div>

              <Button
                size="small"
                ml="1.25rem"
                className="clear-icon"
                onClick={() => {
                  console.log("Icon clicked for product:", item);
                  handleRemoveFromCart(item)();
                }}>
                <Icon variant="small">close</Icon>
              </Button>
            </div>
            <Divider />
          </Fragment>
        ))}
      </div>

      {!!state.cart.length && (
        <div className="actions">
          <Link href="/payment">
            <Button fullwidth color="primary" variant="contained" onClick={toggleSidenav}>
              <Typography fontWeight={600}>Pagar Ahora ({currency(getTotalPrice())})</Typography>
            </Button>
          </Link>

          <Link href="/cart">
            <Button fullwidth color="primary" variant="outlined" mt="1rem" onClick={toggleSidenav}>
              <Typography fontWeight={600}>Ver Carrito</Typography>
            </Button>
          </Link>
        </div>
      )}
    </StyledMiniCart>
  );
}
