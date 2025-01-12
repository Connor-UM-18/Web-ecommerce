// src/app/page.tsx
"use client"; // Marcar el componente como cliente

import { Fragment, useEffect } from "react";
import Head from 'next/head';
import api from "@utils/__api__/fashion-3";
import Box from "@component/Box";
import Navbar from "@component/navbar/Navbar";
import { Header } from "@component/header";
import Section1 from "@sections/fashion-3/section-1";
import Section2 from "@sections/fashion-3/section-2";
import Section3 from "@sections/fashion-3/section-3";
import Section4 from "@sections/fashion-3/section-4";
import Section5 from "@sections/fashion-3/section-5";
import Section6 from "@sections/fashion-3/section-6";
import Section7 from "@sections/fashion-3/section-7";
import Section8 from "@sections/fashion-3/section-8";
import { Footer1 } from "@component/footer";
import { useAppContext } from "@context/app-context";
import cookies from 'next-cookies';

interface Product {
  id: number;
  title: string;
  price: number;
}

export default function FashionThree() {
  const { state, dispatch } = useAppContext();
  
  // Obtener los datos en el cliente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await api.getProducts();
        console.log('products',products);
        
        const blogs = await api.getBlogs();
        const services = await api.getServices();
        //const featureProducts = await api.getFeatureProducts();
       
        const mainCarouselData = await api.getMainCarouselData();

        // Guardar los productos y otros datos en el contexto
        dispatch({ type: "SET_PRODUCTS", payload: products });
        // Puedes usar más dispatch si quieres guardar blogs, services, etc. en el contexto
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Acceder a los productos desde el contexto
  const { products,services, blogs } = state;
  const featureProducts = products.slice(0, 4);

  return (
    <Fragment>
      <Head>
        <title>Fashion Three</title>
      </Head>
      <Header/>
      <div style={{}}> {/* Ajusta el margen superior si es necesario */}
        <Section1 carouselData={[]} />
      </div>
      <Box bg="white" pb="4rem">
        {/* MEN AND WOMEN OFFERS AREA */}
        <Section2 />
        {/* BEST SELLING PRODUCTS AREA */}
        <Section3 products={products} />
        {/* TOP CATEGORIES AREA */}
        <Section4 />
        {/* SALE OFFER BANNERS AREA */}
        <Section5 />
        {/* FEATURED PRODUCTS AREA */}
        <Section6 products={featureProducts} />
        {/* SERVICE LIST AREA */}
        {/* <Section7 services={services} /> */}
        {/* BLOG LIST AREA */}
        {/* <Section8 blogs={blogs} /> */}
      </Box>
      <Footer1 />
    </Fragment>
  );
}
