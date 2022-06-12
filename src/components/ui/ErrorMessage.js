import classes from './ErrorMessage.module.css'

function ErrorMessage(props) {
    return (
        <div className={classes.error}>{props.text}</div>
    )
}

export default ErrorMessage;