import Typography, { H3 } from "@component/Typography";



export default function ProductDescription({ description_product }: { description_product: string }) {
  return (
    <div>
      <H3 mb="1rem">Especificaciones:</H3>
      <Typography>
        {description_product}
      </Typography>
    </div>
  );
}
