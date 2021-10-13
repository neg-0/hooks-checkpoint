import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { FetchAPIContext, ActionAPIContext } from '../App';
import ProductCardDetailsList from './ProductCardDetailsList';
import ProductCardImage from './ProductCardImage';


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

export default function ProductCard({ product, styles }) {

    const [expanded, setExpanded] = useState(false);
    const [image, setImage] = useState()
    const [details, setDetails] = useState()
    const actionAPI = useContext(ActionAPIContext)
    const fetchAPI = useContext(FetchAPIContext)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        // Fetch the product image
        fetchAPI.fetchProductThumbnail(product.id).then(setImage)

        // Fetch the product details
        fetchAPI.fetchProductDetails(product.id).then(setDetails)
    }, [])

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={(e) => { actionAPI.displayModal(product.id, e) }}>
                <ProductCardImage name={product.name} image={image} />
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
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <ProductCardDetailsList details={details} />
                </CardContent>
            </Collapse>
        </Card>
    );
}