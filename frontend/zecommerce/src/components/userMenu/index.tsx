"use client";

import Box from "../Box";
import Card from "../Card";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import styled from "styled-components";
import { getTheme } from "@utils/utils";
import Typography, { Span } from "../Typography";
import Cookies from 'js-cookie';
import { useAppContext } from "@context/app-context";

const StyledUserMenu = styled(Box)`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: ${getTheme("colors.body.paper")};
  box-shadow: ${getTheme("shadows.regular")};
  z-index: 1000;

  .nav-link {
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: ${getTheme("colors.primary.main")};
    }
  }
`;

type UserMenuProps = { menuOpen: boolean };

const userNavs = [
  { title: "Ver Perfil", url: "/profile" },
  { title: "Cerrar Sesión", url: "#" },
];

export default function UserMenu({ menuOpen }: UserMenuProps) {
  const { dispatch } = useAppContext();

  const handleLogout = () => {
    // Eliminar cookies
    Cookies.remove("token");
    Cookies.remove("correo_electronico");
    Cookies.remove("id_usuario");
    Cookies.remove("nombre");
    Cookies.remove("telefono");

    // Limpiar el estado global
    dispatch({ type: "LOGOUT_USER" });

    // Limpiar sessionStorage
    sessionStorage.clear();

    // Redirigir al usuario a la página de inicio
    window.location.href = "/";
  };

  const renderMenuItems = (list: { title: string; url: string }[]) => {
    return list.map((item) => (
      <NavLink href={item.url} key={item.title} onClick={item.title === "Cerrar Sesión" ? handleLogout : undefined}>
        <MenuItem>
          <Span className="nav-link">{item.title}</Span>
        </MenuItem>
      </NavLink>
    ));
  };

  return (
    menuOpen && (
      <StyledUserMenu>
        <Card borderRadius={8} py="0.5rem" boxShadow="large" minWidth="230px">
          <FlexBox flexDirection="column">{renderMenuItems(userNavs)}</FlexBox>
        </Card>
      </StyledUserMenu>
    )
  );
}