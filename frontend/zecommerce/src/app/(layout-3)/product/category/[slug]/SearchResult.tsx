"use client";

import { useCallback, useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Box from "@component/Box";
import Card from "@component/Card";
import Select from "@component/Select";
import Hidden from "@component/hidden";
import Icon from "@component/icon/Icon";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import { H5, Paragraph } from "@component/Typography";

import ProductGridView from "@component/products/ProductCard1List";
import ProductListView from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";
import db from "@data/db";
import { useAppContext } from "@context/app-context"; 
import api from "@utils/__api__/fashion-3";

// ==============================================================
type Props = {
  sortOptions: { label: string; value: string }[];
};
// ==============================================================

export default function SearchResult({ sortOptions }: Props) {
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0); // Estado para el precio mínimo
  const [maxPrice, setMaxPrice] = useState(500); // Estado para el precio máximo
  const { state, dispatch } = useAppContext();
  const { products } = state;
  console.log('products---SearchResult',products);
  

  const width = useWindowSize();
  const [view, setView] = useState<"grid" | "list">("grid");

  const isTablet = width < 1025;
  const toggleView = useCallback((v: any) => () => setView(v), []);

  useEffect(() => {
    if (params && params.slug) { // Asegúrate de que params.slug está disponible
      setSearchTerm(params.slug.toString());
    }
  }, [params]); // Escuchar cambios en params

  useEffect(() => {
    // Si los productos en el contexto están vacíos, hacer una llamada a la API para obtenerlos
    const fetchProductsIfEmpty = async () => {
      if (!products || products.length === 0) {
        try {
          const fetchedProducts = await api.getProducts();
          // Actualizar el contexto con los productos obtenidos
          dispatch({ type: "SET_PRODUCTS", payload: fetchedProducts });
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProductsIfEmpty();
  }, [products, dispatch]);
  const filteredProducts = products
    .filter(product => product.nombre_categoria === searchTerm)
    .filter(product => {
      const price = parseFloat(product.precio); // Convertir precio a número
      return price >= minPrice && price <= maxPrice;
    });
  console.log('filteredProducts------',filteredProducts);


  return (
    <>
      <FlexBox
        as={Card}
        mb="55px"
        p="1.25rem"
        elevation={5}
        flexWrap="wrap"
        borderRadius={8}
        alignItems="center"
        justifyContent="space-between">
        <div>
          <Paragraph color="text.muted">{filteredProducts.length} resultados encontrados</Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap">
          {/* <Paragraph color="text.muted" mr="1rem">
            Ordenar por:
          </Paragraph>

          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select placeholder="Ordenar por" defaultValue={sortOptions[0]} options={sortOptions} />
          </Box> */}

          <Paragraph color="text.muted" mr="0.5rem">
            Vista:
          </Paragraph>

          <IconButton onClick={toggleView("grid")}>
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "grid" ? "primary" : "inherit"}>
              grid
            </Icon>
          </IconButton>

          <IconButton onClick={toggleView("list")}>
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "list" ? "primary" : "inherit"}>
              menu
            </Icon>
          </IconButton>

          {isTablet && (
            <Sidenav
              position="left"
              scroll={true}
              handle={
                <IconButton>
                  <Icon>options</Icon>
                </IconButton>
              }>
              <ProductFilterCard
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        {/* <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <ProductFilterCard />
        </Hidden> */}
        <Grid item lg={3} xs={12}>
        <ProductFilterCard
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </Grid>

        <Grid item lg={9} xs={12}>
          {view === "grid" ? (
            <ProductGridView products={filteredProducts} />
          ) : (
            <ProductListView products={filteredProducts} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
