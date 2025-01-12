"use client";

import styled from "styled-components";

// STYLED COMPONENTS
export const Wrapper = styled("div")({
  position: "relative",
  overflow: "hidden",
  height: "100vh",
  width: "100vw",
  margin: 0,
  padding: 0,

  "& .full-page-image-container img": {
    height: "100%",
    width: "100%",
    objectFit: "cover", // Scale the image to cover the container
    position: "absolute",
    top: 0,
    left: 0,
  }
});