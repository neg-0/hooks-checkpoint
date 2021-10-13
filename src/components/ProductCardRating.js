import { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import { fetchProductRating } from "./FetchAPI"

export default function ProductCardRating({ productId }) {

    const [rating, setRating] = useState(0)

    useEffect(() => { fetchProductRating(productId).then(setRating) }, [])

    return <Rating name="read-only" value={rating} readOnly />
}