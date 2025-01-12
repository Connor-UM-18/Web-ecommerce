import Box from "@component/Box";
import Divider from "@component/Divider";
import Container from "@component/Container";
import { H2, H3, H4, Span } from "@component/Typography";
import { theme } from "@utils/theme";
// STYLED COMPONENT
import { OfferBox, Wrapper } from "./styles";

export default function Section5() {
  return (
    <Container mt="4rem">
      <Wrapper>
        <Box style={{ width: "min-content", color: "#fff" }}>
          <H4 fontSize={20}>FIN DE TEMPORADA</H4>
          <Divider mb="5px" style={{ borderColor: theme.colors.gray[500] }} />
          <H2 fontSize={75} lineHeight={1}>
          REBAJAS
          </H2>
        </Box>

        <OfferBox className="offer">
          <H3 lineHeight={1} fontSize={17}>
          HASTA{" "}
            <Span fontSize={32} color="primary.main">
              50%
            </Span>{" "}
            DE DESCUENTO
          </H3>
        </OfferBox>
      </Wrapper>
    </Container>
  );
}
