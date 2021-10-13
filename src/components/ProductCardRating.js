import { useContext, useEffect, useState } from "react";
import { FetchAPIContext } from "../App";
import Rating from '@mui/material/Rating';

export default function ProductCardRating({ productId }) {
    let fetchAPI = useContext(FetchAPIContext)

    const [rating, setRating] = useState(0)

    useEffect(() => { fetchAPI.fetchProductRating(productId).then(setRating) }, [])

    return <Rating name="read-only" value={rating} readOnly />
}