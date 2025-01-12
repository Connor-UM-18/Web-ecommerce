"use client";

import Link from "next/link";
import { useState , useEffect} from "react";
import Login from "@sections/auth/Login";
import Box from "@component/Box";
import Image from "@component/Image";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import NavLink from "@component/nav-link";
import MenuItem from "@component/MenuItem";
import Badge from "components/badge";
import MiniCart from "@component/mini-cart";
import Container from "@component/Container";
import { Tiny } from "@component/Typography";
import { IconButton, Button } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import Categories from "@component/categories/Categories";
import { SearchInputHeader } from "@component/search-box";
import { useAppContext } from "@context/app-context";
import StyledHeader from "./styles";
import UserLoginDialog from "./LoginDialog";
import styled from "styled-components";
import Cookies from "js-cookie";
import Navbar from "@component/navbar/Navbar";
import UserMenu from "@component/userMenu";
const DropdownMenu = styled(Box)`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

// ====================================================================
type HeaderProps = { isFixed?: boolean; className?: string };
// =====================================================================

export default function Header({ isFixed, className }: HeaderProps) {
  const { state } = useAppContext();
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const correo_electronico = Cookies.get("correo_electronico");
    const usuario = Cookies.get("id_usuario");

    if (correo_electronico && usuario ) {
      setIsLoggedIn(true);
    }
  }, []);

  const CART_HANDLE = (
    <Box ml="20px" position="relative">
      <IconButton bg="gray.200" p="12px" size="small">
        <Icon size="20px">bag</Icon>
      </IconButton>

      {!!state.cart.length && (
        <FlexBox
          top={-5}
          right={-5}
          height={20}
          minWidth={20}
          bg="primary.main"
          borderRadius="50%"
          alignItems="center"
          position="absolute"
          justifyContent="center">
          <Tiny color="white" fontWeight="600" lineHeight={1}>
            {state.cart.length}
          </Tiny>
        </FlexBox>
      )}
    </Box>
  );

  const LOGIN_HANDLE = isLoggedIn ? (
    <Box position="relative" onMouseEnter={toggleMenu} onMouseLeave={toggleMenu}>
      <IconButton ml="1rem" bg="gray.200" p="8px">
        <Icon size="28px">user</Icon>
      </IconButton>
      <UserMenu menuOpen={menuOpen} />
    </Box>
  ) : (
    <UserLoginDialog handle={<IconButton ml="1rem" bg="gray.200" p="8px"><Icon size="28px">user</Icon></IconButton>}>
      <div>
        <Login />
      </div>
    </UserLoginDialog>
  );

  return (
    <StyledHeader className={className}>
      <Container display="flex" alignItems="center" justifyContent="space-between" height="100%">
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <Image src="/assets/images/logos/logoEstilo.webp" alt="logo" width={50}
              height={50} />
          </Link>

          {isFixed && (
            <div className="category-holder">
              <Categories>
                <FlexBox color="text.hint" alignItems="center" ml="1rem">
                  <Icon>categories</Icon>
                  <Icon>arrow-down-filled</Icon>
                </FlexBox>
              </Categories>
            </div>
          )}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <SearchInputHeader/>
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {LOGIN_HANDLE}


          <Sidenav
            open={open}
            width={380}
            position="right"
            handle={CART_HANDLE}
            toggleSidenav={toggleSidenav}>
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav>
        </FlexBox>
      </Container>
    </StyledHeader>
  );
}
