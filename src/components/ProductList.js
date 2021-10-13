import ProductCard from "./ProductCard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function ProductList({ products }) {
    return (
        <div style={{ width: '100%', ali: "center" }}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    maxWidth: "100%",
                }}
            >
                {products.map(product => <Box key={product.id} sx={{ p: 1 }}><ProductCard product={product} /></Box>)}

            </Box>
        </div>
    )
}