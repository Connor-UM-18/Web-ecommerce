"use client";


import { Fragment , useEffect, useState} from "react";
import { format } from "date-fns";
// API FUNCTIONS
import api from "@utils/__api__/users";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import Card from "@component/Card";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Cookies from "js-cookie";
import Typography, { H3, H5, Small } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
// PAGE SECTION COMPONENTS
import { EditProfileButton } from "@sections/customer-dashboard/profile";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id_usuario = Cookies.get("id_usuario");
        if (id_usuario) {
          const userInfo = await api.getInformationUser(id_usuario);
          setUser(userInfo);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error loading user information</div>;
  }

  return (
    <Fragment>
      <DashboardPageHeader
        title="Mi Perfil"
        iconName="user_filled"
        button={<EditProfileButton />}
      />
      <TableRow p="0.75rem 1.5rem">
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Nombres
          </Small>

          <span>{user.nombre}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Apellido
          </Small>

          <span>{user.apellido}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Email
          </Small>

          <span>{user.correo_electronico}</span>
        </FlexBox>

        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Telefono
          </Small>

          <span>{user.telefono}</span>
        </FlexBox>

      </TableRow>
    </Fragment>
  );
}
