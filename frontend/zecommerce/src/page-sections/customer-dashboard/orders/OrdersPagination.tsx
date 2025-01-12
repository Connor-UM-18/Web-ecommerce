import React from "react";
import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import Order from "@models/order.model";

interface OrdersPaginationProps {
  orderList: Order[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (selectedPage: number) => void;
}

const OrdersPagination: React.FC<OrdersPaginationProps> = ({ orderList, currentPage, itemsPerPage, onPageChange }) => {
  if (!orderList || orderList.length === 0) return null; // Verifica si orderList está vacío o nulo

  const totalItems = orderList.length;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <FlexBox justifyContent="center" mt="2.5rem">
      <Pagination
        pageCount={pageCount}
        onPageChange={onPageChange}
        currentPage={currentPage}
      />
    </FlexBox>
  );
};

export default OrdersPagination;
