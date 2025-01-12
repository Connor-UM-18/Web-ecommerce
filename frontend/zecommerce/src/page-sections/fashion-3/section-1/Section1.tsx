import Container from "@component/Container";
import { Carousel } from "@component/carousel";
import { CarouselCard2 } from "@component/carousel-cards";
import { MainCarouselItem } from "@models/market-2.model";
import fullPageImage from "path-to-your-image.png";
// STYLED COMPONENTS
import { Wrapper } from "./styles";

// ======================================================
type Props = { carouselData: MainCarouselItem[] };
// ======================================================

export default function Section1({ carouselData }: Props) {
  return (
    <Container
      pt="0"
      style={{
        padding: 0,
        margin: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      <Wrapper>
      <div className="full-page-image-container">
          <img src="/assets/images/banners/banner3.png" alt="Banner" />
        </div>
      </Wrapper>
    </Container>
  );
}