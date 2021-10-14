import { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import { fetchProductRatings as fetchProductReviews } from "./FetchAPI"
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


export default function ProductCardRating({ productId }) {
    const [reviews, setReviews] = useState()
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        if (Object.entries(reviews.characteristics).every((characteristic) => { return characteristic[1].value === null })) {
            return
        }

        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        fetchProductReviews(productId).then(setReviews)
    }, [])

    if (!reviews) {
        return <Skeleton variant="rectangular" width={80} height={20} />
    } else {
        return (<div><Stack direction="row"><Rating
            value={reviews.rating}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose} />
            <Typography display="inline-flex" paddingTop={0.1} paddingLeft={0.5}>({reviews.count})</Typography>
        </Stack>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                {/* {console.log("characteristics", Object.entries(reviews.characteristics))} */}
                {Object.entries(reviews.characteristics).map((characteristic, index) => {
                    if (characteristic && characteristic[1].value !== null) {
                        //console.log("value", parseFloat(characteristic[1].value), "type", typeof parseFloat(characteristic[1].value))
                        return (<div key={index}>
                            <Typography component="legend">{characteristic[0]}</Typography>
                            <Rating name="read-only" value={parseFloat(characteristic[1].value)} readOnly />
                        </div>)
                    }
                })}
            </Popover>
        </div >
        )
    }
}