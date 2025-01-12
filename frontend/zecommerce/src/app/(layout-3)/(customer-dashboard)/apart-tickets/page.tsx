"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { format } from "date-fns";
// API FUNCTIONS
import api from "@utils/__api__/orders";
// GLOBAL CUSTOM COMPONENTS
import { Chip } from "@component/Chip";
import Hidden from "@component/hidden";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import { IconButton } from "@component/buttons";
import Typography, { SemiSpan, Small } from "@component/Typography";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { H5 } from "@component/Typography";
import { OrderRow, OrdersPagination } from "@sections/customer-dashboard/orders";
import Cookies from "js-cookie";
// PAGE SECTION COMPONENTS
import { SupportPagination } from "@sections/customer-dashboard/support-ticket";

export default function TicketList() {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Estado para controlar la página actual
  const itemsPerPage = 5; // Tamaño de página

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const id_usuario = Cookies.get("id_usuario");
        if (id_usuario) {
          const response = await api.getOrdersApart(id_usuario);
          console.log('TicketList getOrdersApart', response);
          if (response.length > 0) {
            setOrderList(response);
          } else {
            // Aquí podrías manejar el caso donde ya no hay más datos
          }
        }
      } catch (error) {
        console.error("Error fetching user orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [currentPage]);

  const onPageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };



  if (loading) {
    return <div>Loading...</div>;
  }
  // Calcular los elementos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderList.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <Fragment>
      <DashboardPageHeader title="Tickets Apartados" iconName="bag_filled" />

      <Hidden down={769}>
        <TableRow boxShadow="none" padding="0px 18px" backgroundColor="transparent">
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Ticket #
          </H5>

          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Estatus
          </H5>

          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Fecha
          </H5>

          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Total
          </H5>

          <H5 flex="0 0 0 !important" color="text.muted" px="22px" my="0px" />
        </TableRow>
      </Hidden>

      {currentItems.map((item) => (
        <OrderRow order={item} key={item.id_venta} />
      ))}

      <OrdersPagination orderList={orderList} currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={onPageChange} />

    </Fragment>
  );
}




