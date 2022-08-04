import { Box } from '@mui/material';
import classes from './Card.module.css'

function Card(props) {
    return <Box className={classes.card}>
        {props.children}
    </Box>;
}

export default Card;