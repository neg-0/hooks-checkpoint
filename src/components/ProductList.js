import ProductCard from "./ProductCard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function ProductList({ products }) {
    return (
        <Box sx={{ flexGrow: 1 }}  >
            <Grid container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="top">
                {products.map(product => <Grid item xs={2} width={"200px"}><ProductCard key={product.id} product={product} /></Grid>)}
            </Grid>
        </Box>
    )
}