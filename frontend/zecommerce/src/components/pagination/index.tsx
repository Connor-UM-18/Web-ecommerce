import React from "react";
import ReactPaginate from "react-paginate";
import { SpaceProps } from "styled-system";
import Icon from "@component/icon/Icon";
import { Button } from "@component/buttons";
import { StyledPagination } from "./styled";

interface PaginationProps extends SpaceProps {
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  currentPage: number;
  onPageChange?: (selectedPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  pageRangeDisplayed = 2,
  marginPagesDisplayed = 1,
  currentPage,
  onPageChange,
  ...props
}) => {
  const handlePageChange = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected + 1; // ReactPaginate devuelve el índice base 0, sumamos 1 para obtener la página correcta
    if (onPageChange) onPageChange(selectedPage);
  };

  const PREVIOUS_BUTTON = (
    <Button
      height="auto"
      padding="6px"
      color="primary"
      overflow="hidden"
      borderRadius="50%"
      className="control-button"
      onClick={() => onPageChange && onPageChange(currentPage - 1)}
      disabled={currentPage <= 1}
    >
      <Icon defaultcolor="currentColor" variant="small">
        chevron-left
      </Icon>
    </Button>
  );

  const NEXT_BUTTON = (
    <Button
      height="auto"
      padding="6px"
      color="primary"
      overflow="hidden"
      borderRadius="50%"
      className="control-button"
      onClick={() => onPageChange && onPageChange(currentPage + 1)}
      disabled={currentPage >= pageCount}
    >
      <Icon defaultcolor="currentColor" variant="small">
        chevron-right
      </Icon>
    </Button>
  );

  const BREAK_LABEL = (
    <Icon defaultcolor="currentColor" variant="small">
      triple-dot
    </Icon>
  );

  return (
    <StyledPagination {...props}>
      <ReactPaginate
        pageCount={pageCount}
        nextLabel={NEXT_BUTTON}
        breakLabel={BREAK_LABEL}
        activeClassName="active"
        disabledClassName="disabled"
        containerClassName="pagination"
        previousLabel={PREVIOUS_BUTTON}
        onPageChange={handlePageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
      />
    </StyledPagination>
  );
};

export default Pagination;
