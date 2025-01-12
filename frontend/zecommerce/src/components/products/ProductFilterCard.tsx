"use client";

import Card from "@component/Card";
import Avatar from "@component/avatar";
import Rating from "@component/rating";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import CheckBox from "@component/CheckBox";
import TextField from "@component/text-field";
import { Accordion, AccordionHeader } from "@component/accordion";
import { H5, H6, Paragraph, SemiSpan } from "@component/Typography";

export default function ProductFilterCard({ minPrice, maxPrice, setMinPrice, setMaxPrice }) {
  const handleMinPriceChange = (e) => setMinPrice(Number(e.target.value));
  const handleMaxPriceChange = (e) => setMaxPrice(Number(e.target.value));
  const render = (items: string[] | string) =>
    (Array.isArray(items) ? items : [items]).map((name) => (
      <Paragraph
        py="6px"
        pl="22px"
        key={name}
        fontSize="14px"
        color="text.muted"
        className="cursor-pointer">
        {name}
      </Paragraph>
    ));

  return (
    <Card p="18px 27px" elevation={5} borderRadius={8}>
      <H6 mb="10px">Categorias</H6>

      {categoryList.map((item) =>
        // item.title ? (
        //   <Accordion key={item.title} expanded>
        //     <AccordionHeader px="0px" py="6px" color="text.muted">
        //       <SemiSpan className="cursor-pointer" mr="9px">
        //         {item.title}
        //       </SemiSpan>
        //     </AccordionHeader>

        //     {render(item.title)}
        //   </Accordion>
        // ) : (
          <Paragraph
            py="6px"
            fontSize="14px"
            key={item.title}
            color="text.muted"
            className="cursor-pointer">
            {item.title}
          </Paragraph>
        // )
      )}

      <Divider mt="18px" mb="24px" />

      {/* PRICE RANGE FILTER */}
      <H6 mb="16px">Rango de Precio</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
      <TextField
          placeholder="0"
          type="number"
          fullwidth
          value={minPrice}
          onChange={handleMinPriceChange}
        />

        <H5 color="text.muted" px="0.5rem">
          -
        </H5>

        <TextField
          placeholder="250"
          type="number"
          fullwidth
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </FlexBox>

      {/* <Divider my="24px" /> */}

      {/* BRANDS FILTER */}
      {/* <H6 mb="16px">Brands</H6> */}
      {/* {brandList.map((item) => (
        <CheckBox
          my="10px"
          key={item}
          name={item}
          value={item}
          color="secondary"
          label={<SemiSpan color="inherit">{item}</SemiSpan>}
          onChange={(e) => console.log(e.target.value, e.target.checked)}
        />
      ))} */}

      {/* <Divider my="24px" /> */}

      {/* STOCK AND SALES FILTERS */}
      {/* {otherOptions.map((item) => (
        <CheckBox
          my="10px"
          key={item}
          name={item}
          value={item}
          color="secondary"
          label={<SemiSpan color="inherit">{item}</SemiSpan>}
          onChange={(e) => console.log(e.target.value, e.target.checked)}
        />
      ))} */}

      {/* <Divider my="24px" /> */}

      {/* RATING FILTER */}
      {/* <H6 mb="16px">Ratings</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <CheckBox
          my="10px"
          key={item}
          value={item}
          color="secondary"
          label={<Rating value={item} outof={5} color="warn" />}
          onChange={(e) => console.log(e.target.value, e.target.checked)}
        />
      ))} */}

      <Divider my="24px" />

      {/* COLORS FILTER */}
      <H6 mb="16px">Tallas</H6>
      <select style={{ width: "100%", padding: "8px", borderRadius: "4px", borderColor: "#ccc" }}>
        {sizesList.map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ))}
      </select>
    </Card>
  );
}

const categoryList = [
  { title: "Hombre" },
  { title: "Mujer" },
  { title: "Niños" }
];

const otherOptions = ["On Sale", "In Stock", "Featured"];
const sizesList = [
  "XS",
  "S",
  "M",
  "L",
  "XL"
];