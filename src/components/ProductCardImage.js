import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';

export default function ProductCardImage({ name, image }) {
    let imageComponent = image ? <CardMedia
        component="img"
        image={image}
        alt={name}
    /> : <Skeleton variant="rectangular" width={"100%"} height={300} />
    return imageComponent
}