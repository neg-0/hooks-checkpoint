import { ListItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

export default function ProductCardDetailsList({ details }) {
    let detailsComponent = details ? details.features.map((detail, index) => {
        let detailFeature = detail.feature
        let detailValue = detail.value === "null" ? `` : ` - ${detail.value}`

        return (<ListItem key={index}>
            <ListItemText primary={`${detailFeature}${detailValue}`} />
        </ListItem>)
    }) : <>Loading Details...</>
    return detailsComponent
}