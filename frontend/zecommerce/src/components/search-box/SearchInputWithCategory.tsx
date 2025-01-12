"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

import Box from "@component/Box";
import Menu from "@component/Menu";
import Card from "@component/Card";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import MenuItem from "@component/MenuItem";
import { Span } from "@component/Typography";
import TextField from "@component/text-field";
import StyledSearchBox from "./styled";
import { useAppContext } from "@context/app-context"; // Importar el contexto

export default function SearchInputHeader() {
  const [resultList, setResultList] = useState<{ id: string | number, nombre: string }[]>([]);
  const [category, setCategory] = useState("Categorías");
  const [selectedIndex, setSelectedIndex] = useState(-1); // Estado para la opción seleccionada
  const [searchValue, setSearchValue] = useState(""); // Estado para el valor del campo de búsqueda

  const { state } = useAppContext(); // Accede a los productos desde el contexto
  const { products } = state;

  const handleCategoryChange = (cat: string) => () => setCategory(cat);

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase().trim();
    setSearchValue(value); // Actualiza el valor del campo de búsqueda

    if (!value) {
      setResultList([]);
      setSelectedIndex(-1); // Restablece la opción seleccionada
    } else {
      const filteredResults = products
        .filter(product => {
          const productName = product.nombre.toLowerCase().trim();
          const productDescription = product.descripcion.toLowerCase().trim();
          return productName.includes(value) || productDescription.includes(value);
        })
        .map(product => ({ id: product.id_producto, nombre: product.nombre }));

      setResultList(filteredResults);
      setSelectedIndex(-1); // Restablece la opción seleccionada
    }
  }, [products]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      // Mueve la selección hacia abajo
      setSelectedIndex(prevIndex => Math.min(prevIndex + 1, resultList.length - 1));
    } else if (event.key === 'ArrowUp') {
      // Mueve la selección hacia arriba
      setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (event.key === 'Enter') {
      // Navega a la opción seleccionada si se presiona Enter
      if (selectedIndex >= 0 && selectedIndex < resultList.length) {
        const selectedItem = resultList[selectedIndex];
        window.location.href = `/product/${selectedItem.id}`;
        setSearchValue(""); // Limpia el campo de búsqueda
        setResultList([]); // Limpia los resultados
      }
    }
  };

  const handleDocumentClick = () => {
    setResultList([]);
    setSelectedIndex(-1); // Restablece la opción seleccionada
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
        <Icon className="search-icon" size="18px">
          search
        </Icon>

        <TextField
          fullwidth
          value={searchValue}
          onChange={handleSearch}
          onKeyDown={handleKeyDown} // Manejo de teclas
          className="search-field"
          placeholder="Buscar producto..."
        />

        <Menu
          direction="right"
          className="category-dropdown"
          handler={
            <FlexBox className="dropdown-handler" alignItems="center">
              <span>{category}</span>
              <Icon variant="small">chevron-down</Icon>
            </FlexBox>
          }>
          {categories.map((item) => (
            <Link href={`/product/category/${encodeURIComponent(item)}`} passHref key={item}>
              <MenuItem onClick={handleCategoryChange(item)}>
                {item}
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </StyledSearchBox>

      {!!resultList.length && (
        <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
          {resultList.map((item, index) => (
            <Link href={`/product/${item.id}`} key={item.id}>
              <MenuItem
                style={{
                  backgroundColor: selectedIndex === index ? '#f0f0f0' : 'transparent',
                  cursor: 'pointer'
                }}
                onMouseOver={() => setSelectedIndex(index)}
                onClick={() => {
                  setSearchValue(""); // Limpia el campo de búsqueda
                  setResultList([]); // Limpia los resultados
                }}
              >
                <Span fontSize="14px">{item.nombre}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
}

const categories = [
  "Hombre",
  "Mujer",
  "Niños",
];
