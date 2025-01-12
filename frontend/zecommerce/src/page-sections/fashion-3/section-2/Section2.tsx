"use client";

import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import { BannerCard1 } from "@component/banners";

export default function Section2() {
  return (
    <Container mt="1.2rem">
      <Grid container spacing={5}>
        <Grid item md={6} xs={12}>
          <BannerCard1
            url="/product/category/Hombre"
            title="Para Hombres"
            subTitle="Desde $99"
            img="/assets/images/banners/men.jpg"
            style={{ borderRadius: 0 }}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <BannerCard1
            url="/product/category/Mujer"
            subTitle="Descuentos de hasta 50%"
            title="Para Mujeres"
            contentPosition="right"
            img="/assets/images/banners/banner-12.jpg"
            style={{ borderRadius: 0 }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
