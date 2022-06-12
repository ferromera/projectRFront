import classes from './MovieItem.module.css'
import Card from "../ui/Card";

function MovieItem(props) {
    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.container}>
                    <div className={classes.image}>
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className={classes.content}>
                        <h3>{props.title}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className={classes.actions}>
                        <button>Watched</button>
                    </div>
                </div>
            </Card>
        </li>
    )
}

export default MovieItem;