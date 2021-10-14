import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { ActionAPIContext } from '../App';
import ProductCardDetailsList from './ProductCardDetailsList';
import ProductCardImage from './ProductCardImage';
import ProductCardRating from './ProductCardRating';
import { fetchProductThumbnail, fetchProductDetails } from "./FetchAPI"


// Sample product:
// {
//     "id": 1,
//     "name": "Camo Onesie",
//     "slogan": "Blend in to your crowd",
//     "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
//     "category": "Jackets",
//     "default_price": "140"
// }

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ProductCard({ product }) {

    const [expanded, setExpanded] = useState(false);
    const [image, setImage] = useState()
    const [details, setDetails] = useState()
    const actionAPI = useContext(ActionAPIContext)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        // Fetch the product image
        fetchProductThumbnail(product.id).then(setImage)

        // Fetch the product details
        fetchProductDetails(product.id).then(setDetails)
    }, [])

    return (
        <Card sx={{ maxWidth: 345 }} id={product.id}>
            <CardActionArea onClick={(e) => { actionAPI.displayModal(product.id, e) }}>
                <ProductCardImage name={product.name} image={image} />
            </CardActionArea>
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
            {/* <CardActionArea onClick={handleExpandClick}> */}
            <CardActions disableSpacing >
                <ProductCardRating productId={product.id} />
                <Typography variant="h6" component="div" display="inline-flex" marginLeft="auto" onClick={handleExpandClick}>
                    Details
                </Typography>
                <ExpandMore
                    onClick={handleExpandClick}
                    expand={expanded}
                    aria-expanded={expanded}
                    aria-label="show more"
                    sx={{ marginLeft: 0 }}
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            {/* </CardActionArea> */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <ProductCardDetailsList details={details} />
                </CardContent>
            </Collapse>
        </Card >
    );
}