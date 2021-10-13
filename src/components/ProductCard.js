import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useContext } from 'react';
import { ProductClickContext } from '../App'
import Skeleton from '@mui/material/Skeleton';

// Sample product:
// {
//     "id": 1,
//     "name": "Camo Onesie",
//     "slogan": "Blend in to your crowd",
//     "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
//     "category": "Jackets",
//     "default_price": "140"
// }

export default function ProductCard({ product, image }) {

    const onProductClick = useContext(ProductClickContext)

    console.log("onProductClick", onProductClick)

    let imageComponent = image ? <CardMedia
        component="img"
        height="140"
        image={image}
        alt={product.name}
    /> : <Skeleton variant="rectangular" width={"100%"} height={140} />

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={(e) => { onProductClick(product.id, e) }}>
                {imageComponent}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        ${product.default_price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}