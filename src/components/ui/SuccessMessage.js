import classes from './SuccessMessage.module.css'

function SuccessMessage(props) {
    return (
        <div className={classes.success}>{props.text}</div>
    )
}

export default SuccessMessage;